import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { Ionicons } from '@expo/vector-icons';

//tasks are currently hardcoded, will be replaced dynamically with backend development
const hardcodedTasks = [
  { id: '1', title: '1. Do the dishes' },
  { id: '2', title: '2. Mop floors' },
];


export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/dustbuddies-logo.png')}
        style={styles.logoImage}
        resizeMode='contain'
      />

      <Text style={styles.title}>Welcome Home!</Text>
      {/* Link to send the user to Tasks Page*/}

      <Image
        source={require('../assets/images/homeart2.png')}
        style={styles.placeholderImage}
        resizeMode='contain'
      />

      <Pressable onPress={() => navigation.navigate('Tasks')}>
        <Text style={styles.linkText}>View My Upcoming Tasks</Text>
      </Pressable>
      {/* Hardcoded task list */}
      <View style={styles.list}>
        {hardcodedTasks.map((item) => (
          <View key={item.id} style={styles.taskRow}>
            <Text style={styles.taskText}>{item.title}</Text>

            <Image
              source={require('../assets/images/green-bunny-profile.png')}
              style={styles.greenIcon}
              resizeMode='contain'
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  placeholderImage: {
    width: 400,
    marginBottom: 5,
  },
  linkText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Neue Montreal',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
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
});