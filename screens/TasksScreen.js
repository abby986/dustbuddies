import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
//import components from their respective files
import TaskFilter from './TaskComponents/TaskFilter';
import TaskItems from './TaskComponents/TaskItems';
import TaskModal from './TaskComponents/TaskModal';
import SubmitTask from './TaskComponents/SubmitTask';
import VoteTask from './TaskComponents/VoteTask';
//import icons
import greenIcon from '../assets/images/green-bunny-profile.png';
import { Ionicons } from '@expo/vector-icons';
//firebase imports
import { db, auth } from "../firebase";
import { collection, onSnapshot, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp, doc, getDoc } from "firebase/firestore";
import PhotoVerification from "./TaskComponents/PhotoVerification";


export default function TasksScreen({ navigation }) {
  const [showMyTasks, setShowMyTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeView, setActiveView] = useState('LIST'); // LIST | MODAL | SUBMIT | VOTE

  /*removing hard coded task array, replacing with firestore data
  const allTasks = [
    { key: 'Do the dishes', mine: true },
    { key: 'Take out the trash', mine: false },
    { key: 'Mop floors', mine: true },
    { key: 'Water plants', mine: false },
  ];

  const myTasks = allTasks.filter(task => task.mine); */

  const [allTasks, setAllTasks] = useState([]);
  const [presetTasks, setPresetTasks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const userId = auth.currentUser?.uid;

  //load the preset tasks for the dropdown menu
  useEffect(() => {
    async function loadPreset() {
      const snap = await getDocs(collection(db, 'presetTasks'));
      setPresetTasks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    loadPreset();
  }, []);

  //load the tasks from firestore
  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, 'tasks'), orderBy('date', 'desc'));

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.task,
          mine: data.userId === userId,
          raw: data,
        };
      });
      setAllTasks(list);
    });
    return () => unsub();
  }, [userId]);

  const myTasks = allTasks.filter(t => t.mine);

  // sets up task rotation
  function getNextTask(presetTasks, lastTaskName) {
    if (!lastTaskName) {
      return presetTasks[0].name;
    }

    const index = presetTasks.findIndex(t => t.name === lastTaskName);
    const nextIndex = (index + 1) % presetTasks.length;

    return presetTasks[nextIndex].name;
  }

  // assigings tasks in rotation
  async function assignNextTask(selectedTaskName) {
    console.log("assignNextTask CALLED", selectedTaskName);
    if (!userId) {
      console.log("NO USER ID");
      return;
    }

    // get group id
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    console.log("userSnap exists:", userSnap.exists());
    const groupId = userSnap.data()?.groupId;

    if (!groupId) {
      console.log("User has no groupId");
      return;
    }

    // get group memebers
    const groupRef = doc(db, "groups", groupId);
    const groupSnap = await getDoc(groupRef);
    console.log("groupSnap exists:", groupSnap.exists());
    const memberIds = groupSnap.data()?.memberIds || [];
    console.log("memberIds:", memberIds);


    if (memberIds.length === 0) {
      console.log("Group has no members");
      return;
    }

    // get last task for rotation
    const q = query(

      collection(db, "tasks"),
      where("groupId", "==", groupId),
      orderBy("date", "desc"),
      limit(1)
    );

    const snap = await getDocs(q);

    console.log("snap size:", snap.size);
    console.log("snap empty:", snap.empty);


    let nextUserId;

    if (snap.empty) {
      // start with the first memeber to get tasks
      nextUserId = memberIds[0];
    } else {
      const lastUserId = snap.docs[0].data().userId;
      const lastIndex = memberIds.indexOf(lastUserId);
      const nextIndex = (lastIndex + 1) % memberIds.length;
      nextUserId = memberIds[nextIndex];
    }

    // get the next task from the preset task list
    const lastTask = snap.empty ? null : snap.docs[0].data().task;
    const nextTask = selectedTaskName;

    // save to firestore
    await addDoc(collection(db, "tasks"), {
      userId: nextUserId,
      groupId: groupId,
      task: nextTask,
      date: serverTimestamp(),

      status: "assigned",
      photoURL: null,
      completedBy: null,
      votes: {}
    });

    setShowDropdown(false);
  }


  //selected tasks will be saved to firestore
  /*async function handleSelectTask(taskName) {
    if (!userId) return;

    await addDoc(collection(db, 'tasks'), {
      userId,
      task: taskName,
      date: serverTimestamp(),
    });
    setShowDropdown(false);
  }*/

  //change to rotation

  // async function handleSelectTask() {
  //  assignNextTask();



  //clicking task row
  const handleTaskPress = (task) => {
    setSelectedTask(task);
    
    if (task.raw.status === "pending") {
      setActiveView("VERIFY");
    }
    else if (task.mine) {
      setActiveView("MODAL");
    }
    else {
      setActiveView("VOTE");
    }
  };

  //addition for profile and back button

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>

      {/*new header*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
        >
          <Image source={greenIcon} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* submit task screen*/}
      {activeView === 'SUBMIT' && (
        <SubmitTask
          task={selectedTask}
          onSubmit={() => setActiveView('LIST')}
          onBack={() => setActiveView('LIST')}
        />
      )}

      {/* vote task screen*/}
      {activeView === 'VOTE' && (
        <VoteTask
          task={selectedTask}
          onVote={() => setActiveView('LIST')}
          onBack={() => setActiveView('LIST')}
        />
      )}

      {activeView === 'VERIFY' && (
        <PhotoVerification
          task={selectedTask}
          onBack={() => setActiveView('LIST')}
        />
      )}


      {/* task list*/}
      {activeView === 'LIST' && (
        <>
          <TaskFilter showMyTasks={showMyTasks} setShowMyTasks={setShowMyTasks} />

          <FlatList
            data={showMyTasks ? myTasks : allTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TaskItems
                task={item}
                number={index + 1}
                onPress={() => handleTaskPress(item)}
              />
            )}
          />
        </>
      )}

      {/* my task modal window*/}
      <TaskModal
        visible={activeView === 'MODAL'}
        task={selectedTask}
        onClose={() => setActiveView('LIST')}
        onContinue={() => setActiveView('SUBMIT')}
      />

      {/* dropdown menu*/}
      {showDropdown && (
        <View style={styles.dropdown}>
          <ScrollView style={{ maxHeight: 200 }}>
            {presetTasks.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={styles.dropdownItem}
                onPress={() => assignNextTask(t.name)}
              >
                <Text style={styles.dropdownText}>{t.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* add task button*/}
      {activeView === 'LIST' && (
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.addTaskText}>Add Task</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}


//styles
const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  back: {
    fontSize: 40,
    fontWeight: '300',
  },

  profileIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },

  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  dropdownText: {
    fontSize: 18,
  },

  addTaskButton: {
    backgroundColor: '#556DC2',
    paddingVertical: 15,
    borderRadius: 28,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },

  addTaskText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },

});