import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, } from 'react-native';



export default function TasksScreen() {
  const [showMyTasks, setShowMyTasks] = useState(true);


  //separating tasks so that they can be filtered between the my tasks and all tasks buttons

  //All tasks list
  const allTasks = [
    { key: 'Do the dishes', mine: true },
    { key: 'Take out the trash', mine: false },
    { key: 'Mop floors', mine: true },
    { key: 'Water plants', mine: false },
  ];

  //My tasks filter
  const myTasks = allTasks.filter(task => task.mine);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowMyTasks(true)}>
        <Text>My Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowMyTasks(false)}>
        <Text>All Tasks</Text>
      </TouchableOpacity>

      <FlatList
        data={showMyTasks ? myTasks : allTasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTaskPress(item)}>
            <View style={styles.taskRow}>
              {/* not a checkbox, just an indicator so that it can be replaced with the proper symbol later*/}
              <View style={styles.statusBox} />

              {/* pulls the correct task from the key*/}
              <Text>{item.key}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

//look into modal component to use for picture pop up

// styles edited to fit screen, statusbox style for placeholder box, taskrow for spacing between tasks
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  statusBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 10,
  },
});


//original export with just flatlist
/*
export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <FlatList
        data={[
          { key: 'Do the dishes' },
          { key: 'Take out the trash' },
          { key: 'Mop floors' },
          { key: 'Water plants' },
        ]}
        renderItem={({ item }) => (
          <Text>{item.key}</Text>
        )}
      />
    </View>
  );
}
*/


//flatlist test
/*
const FlatListBasics = () => {
  return (
    <FlatList
      data={[
        { key: 'Do the dishes' },
        { key: 'Take out the trash' },
        { key: 'Mop floors' },
        { key: 'Water plants' },
      ]}
      renderItem={({ item }) => { item.key }}
    />
  );
};
*/