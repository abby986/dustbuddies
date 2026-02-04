import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
//import components from their respective files
import TaskFilter from './TaskComponents/TaskFilter';
import TaskItems from './TaskComponents/TaskItems';
import TaskModal from './TaskComponents/TaskModal';
import SubmitTask from './TaskComponents/SubmitTask';
import VoteTask from './TaskComponents/VoteTask';

export default function TasksScreen() {
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

  //if statements for  submit and vote
  if (activeView === 'SUBMIT') {
    return (
      <SubmitTask
        task={selectedTask}
        onSubmit={() => setActiveView('LIST')}
        onBack={() => setActiveView('LIST')}
      />
    );
  }

  if (activeView === 'VOTE') {
    return (
      <VoteTask
        task={selectedTask}
        onVote={() => setActiveView('LIST')}
        onBack={() => setActiveView('LIST')}
      />
    );
  }

  return (
    <View>
      <TaskFilter showMyTasks={showMyTasks} setShowMyTasks={setShowMyTasks} />

      <FlatList
        data={showMyTasks ? myTasks : allTasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <TaskItems task={item} number={index + 1} onPress={() => handleTaskPress(item)} />
        )}
      />

      <TaskModal
        visible={activeView === 'MODAL'}
        task={selectedTask}
        onClose={() => setActiveView('LIST')}
        onContinue={() => setActiveView('SUBMIT')}
      />
    </View>
  );
}
