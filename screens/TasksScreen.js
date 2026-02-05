import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text, } from 'react-native';
//import components from their respective files
import TaskFilter from './TaskComponents/TaskFilter';
import TaskItems from './TaskComponents/TaskItems';
import TaskModal from './TaskComponents/TaskModal';
import SubmitTask from './TaskComponents/SubmitTask';
import VoteTask from './TaskComponents/VoteTask';
//import icons
import greenIcon from '../assets/images/green-bunny-profile.png';
import { Ionicons } from '@expo/vector-icons';

export default function TasksScreen({ navigation }) {
  const [showMyTasks, setShowMyTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeView, setActiveView] = useState('LIST'); // LIST | MODAL | SUBMIT | VOTE

  //task array
  const allTasks = [
    { key: 'Do the dishes', mine: true },
    { key: 'Take out the trash', mine: false },
    { key: 'Mop floors', mine: true },
    { key: 'Water plants', mine: false },
  ];

  const myTasks = allTasks.filter(task => task.mine);

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    task.mine ? setActiveView('MODAL') : setActiveView('VOTE');
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

      {/*refactor content*/}
      {activeView === 'SUBMIT' && (
        <SubmitTask
          task={selectedTask}
          onSubmit={() => setActiveView('LIST')}
          onBack={() => setActiveView('LIST')}
        />
      )}

      {activeView === 'VOTE' && (
        <VoteTask
          task={selectedTask}
          onVote={() => setActiveView('LIST')}
          onBack={() => setActiveView('LIST')}
        />
      )}

      {activeView === 'LIST' && (
        <>
          <TaskFilter showMyTasks={showMyTasks} setShowMyTasks={setShowMyTasks} />

          <FlatList
            data={showMyTasks ? myTasks : allTasks}
            keyExtractor={(item) => item.key}
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

      <TaskModal
        visible={activeView === 'MODAL'}
        task={selectedTask}
        onClose={() => setActiveView('LIST')}
        onContinue={() => setActiveView('SUBMIT')}
      />
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
});