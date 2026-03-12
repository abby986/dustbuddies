import React, { useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { db, auth } from "../../firebase";
import { doc, updateDoc, getDoc, increment, collection, getDocs } from "firebase/firestore";

export default function PhotoVerification({ task, onBack }) {
  const uid = auth.currentUser?.uid;
  async function unlockRandomBadge(userId) {

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const userData = userSnap.data();
    const unlockedBadges = userData.unlockedBadges || [];

    // get all badges
    const badgeSnap = await getDocs(collection(db, "badges"));

    const allBadges = badgeSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // remove already unlocked badges
    const availableBadges = allBadges.filter(
      badge => !unlockedBadges.some(b => b.name === badge.name)
    );

    if (availableBadges.length === 0) return;

    // pick random badge
    const randomBadge =
      availableBadges[Math.floor(Math.random() * availableBadges.length)];

    const newBadge = {
      name: randomBadge.name,
      image: randomBadge.image,
      unlockedAt: new Date().toISOString()
    };

    await updateDoc(userRef, {
      unlockedBadges: [...unlockedBadges, newBadge],
      newBadgeNotification: newBadge
    });
  }

  /*
    useLayoutEffect(() => {

    navigation.setOptions({

      headerLeft: () => (

        <TouchableOpacity
          onPress={() => {

            if (activeView !== "LIST") {
              setActiveView("LIST");
            } else {
              navigation.goBack();
            }

          }}
          style={{ marginLeft: 10 }}
        >
          <Text style={{ fontSize: 28 }}>‹</Text>
        </TouchableOpacity>

      )

    });

  }, [navigation, activeView]);
  */


  async function handleVote(voteValue) {

    if (!uid) return;

    //prevent user from voting on their own task
    if (task.raw.completedBy === uid) {
      alert("You cannot vote on your own task.");
      return;
    }

    const taskRef = doc(db, "tasks", task.id);

    // stores the user's vote
    await updateDoc(taskRef, {
      [`votes.${uid}`]: voteValue
    });

    // reloads task data to evaluate votes
    const snap = await getDoc(taskRef);
    const updatedTask = snap.data();

    checkApproval(taskRef, updatedTask);
    alert('Vote submitted!');
    onBack();
  }

  async function checkApproval(taskRef, taskData) {

    const votesObject = taskData.votes || {};

    let approvalCount = 0;

    for (const userId in votesObject) {
      if (votesObject[userId] === true) {
        approvalCount++;
      }
    }

    // loads group to get member count
    const groupRef = doc(db, "groups", taskData.groupId);
    const groupSnap = await getDoc(groupRef);

    const members = groupSnap.data()?.memberIds || [];
    const memberCount = members.length;

    //UNCOMMENT THIS SECTION THIS IS THE MAJORITY VOTE RULE. COMMENTING OUT FOR TESTING PURPOSES FOR NOW
    //const majority = Math.floor(memberCount / 2) + 1;

    const majority = 1; //TEMPORARY MAJORITY RULE FOR TESTING

    if (approvalCount >= majority && taskData.status !== "approved") {
      await updateDoc(taskRef, {
        status: "approved"
      });
      await updateDoc(doc(db, "groups", taskData.groupId), { monsterHp: increment(10) });

      //unlock random badge for individual user
      if (taskData.completedBy) {
        await unlockRandomBadge(taskData.completedBy);
      }
    }
  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>{task.name}</Text>

      <Image
        source={{ uri: task.raw.photoURL }}
        style={styles.image}
      />

      <Text style={styles.question}>
        Was this task completed correctly?
      </Text>

      <TouchableOpacity
        style={styles.approveButton}
        onPress={() => handleVote(true)}
      >
        <Text style={styles.buttonText}>Approve</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rejectButton}
        onPress={() => handleVote(false)}
      >
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>

      {/*<TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>*/}

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20
  },

  image: {
    width: 280,
    height: 280,
    borderRadius: 10,
    marginBottom: 20
  },

  question: {
    fontSize: 16,
    marginBottom: 20
  },

  approveButton: {
    backgroundColor: "#7ED957",
    padding: 12,
    borderRadius: 8,
    width: 150,
    alignItems: "center",
    marginBottom: 10
  },

  rejectButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 8,
    width: 150,
    alignItems: "center",
    marginBottom: 20
  },

  buttonText: {
    color: "white",
    fontWeight: "600"
  },

  back: {
    color: "#666"
  }

});
