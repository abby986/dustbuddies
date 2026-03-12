import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebase';
import { doc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
//import { Ionicons } from '@expo/vector-icons';

//tasks are currently hardcoded, will be replaced dynamically with backend development
//const hardcodedTasks = [
//{ id: '1', title: '1. Do the dishes' },
//{ id: '2', title: '2. Mop floors' },
//];

const itemSources = {
  vest: require('../assets/rabbit-blue-vest.png'),
  pink_skirt: require('../assets/rabbit-pink-skirt.png'),
  red_bow: require('../assets/rabbit-bow.png'),
  glasses: require('../assets/glasses.png'),
  wizard_hat: require('../assets/wizard-hat.png'),
  crown: require('../assets/crown.png'),
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [monsterHp, setMonsterHp] = useState(100);
  const [showDamage, setShowDamage] = useState(false);
  const [prevHp, setPrevHp] = useState(100);
  const [myTasks, setMyTasks] = useState([]);
  const [outfit, setOutfit] = useState(null);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const userUnsub = onSnapshot(doc(db, 'users', uid), (userSnap) => {
      const data = userSnap.data();
      setOutfit(data?.outfit ?? null);

      const groupId = data?.groupId;
      if (!groupId) return;
      const groupUnsub = onSnapshot(doc(db, 'groups', groupId), (groupSnap) => {
        const hp = groupSnap.data()?.monsterHp ?? 100;
        if (hp < prevHp) {
          setShowDamage(true);
          setTimeout(() => setShowDamage(false), 2000);
        }
        setPrevHp(hp);
        setMonsterHp(hp);
      });
      return () => groupUnsub();
    });
    return () => userUnsub();
  }, []);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', uid),
      where('status', '==', 'assigned'),
      orderBy('date', 'desc')
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(doc => ({
        id: doc.id,
        title: doc.data().task,
      }));
      setMyTasks(list);
    });

    return () => unsub();
  }, []);

  const hpPercent = Math.max(0, Math.min(100, monsterHp)) / 100;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/images/dustbuddies-logo.png')}
        style={styles.logoImage}
        resizeMode='contain'
      />

      <Text style={styles.title}>Welcome Home!</Text>
      {/* Link to send the user to Tasks Page*/}

      <View style={styles.batlleScene}>
        <Image
          source={require('../assets/images/monster-full-health.png')}
          style={styles.monsterImage}
        />
        <View style={styles.miniBunnyWrapper}>
          <Image
            source={require('../assets/rabbit_final_copy_3.png')}
            style={styles.miniBunnyImage}
          />
          {outfit?.shirt && (
            <Image source={itemSources[outfit.shirt]} style={styles.miniClothingOverlay} />
          )}
          {outfit?.hat && (
            <Image source={itemSources[outfit.hat]} style={styles.miniHatOverlay} />
          )}
          {outfit?.pants && (
            <Image source={itemSources[outfit.pants]} style={styles.miniPantsOverlay} />
          )}
        </View>
      </View>

      <Text style={styles.hpLabel}>HP: {monsterHp}/100</Text>
      <View style={styles.hpBarBackground}>
        <View style={[styles.hpBarFill, { width: `${hpPercent * 100}%` }]} />
      </View>
      {showDamage && (
        <Animated.Text style={styles.damageText}>-10 HP!</Animated.Text>
      )}

      <Pressable onPress={() => navigation.navigate('Tasks')}>
        <Text style={styles.linkText}>View My Upcoming Tasks</Text>
      </Pressable>
      {/* Hardcoded task list */}
      <View style={styles.list}>
        {myTasks.length === 0 ? (
          <Text style={styles.emptyText}>You've completed all your tasks!</Text>
        ) : (
          myTasks.map((item) => (
            <View key={item.id} style={styles.taskRow}>
              <Text style={styles.taskText}>{item.title}</Text>
              <Image
                source={require('../assets/images/green-bunny-profile.png')}
                style={styles.greenIcon}
                resizeMode='contain'
              />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hpLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    width: '80%',
    textAlign: 'right',
    marginTop: 2,
  },
  hpBarBackground: {
    width: '80%',
    height: 12,
    backgroundColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 10,
  },
  hpBarFill: {
    height: '100%',
    backgroundColor: '#a1b869',
    borderRadisu: 6,
  },
  damageText: {
    fontWeight: 'bold',
    color: '#ff3b30',
    fontSize: 28,
    marginTop: -10,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  logoImage: {
    width: 200,
    marginTop: -80,
    marginBottom: -30,

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffff',
    backgroundColor: '#7c98c7',
    borderRadius: 28,
    padding: 10,
  },

  linkText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Neue Montreal',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: '#7c98c7',
    borderRadius: 15,
    padding: 7,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#b5cc8a',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  list: {
    paddingHorizontal: 20,
    marginTop: 10,

  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: -5,

  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listIcon: {
    paddingLeft: 20,
  },
  greenIcon: {
    width: 28,
    height: 28,
    marginLeft: 20,
  },
  battleScene: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '80%',
    marginTop: 10,
  },
  miniBunnyWrapper: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  miniBunnyImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  miniClothingOverlay: {
    position: 'absolute',
    width: 84,
    height: 84,
    resizeMode: 'contain',
    top: 42,
    left: 19,
  },
  miniHatOverlay: {
    position: 'absolute',
    width: 60,
    height: 60,
    resizeMode: 'contain',
    top: 6,
    left: 30,
  },
  miniPantsOverlay: {
    position: 'absolute',
    width: 56,
    height: 56,
    resizeMode: 'contain',
    top: 63,
    left: 20,
  },
  monsterImage: {
    width: 220,
    height: 220,
    marginLeft: 150,
    marginBottom: -50,
  }

});