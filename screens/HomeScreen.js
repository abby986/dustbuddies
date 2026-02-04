import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  {/*Hardcode Task list, will replace with data in backend*/ }
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <View style={styles.taskRow}>
      <Text style={styles.taskText}>{item.title}</Text>

      <Ionicons
        name="checkbox-outline"
        size={28}
        color="black"
        style={styles.listIcon}
      />



    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      {/* Link to send the user to Tasks Page*/}

      <Image
        source={require('../assets/images/homeart2.png')}
        style={styles.placeholderImage}
        resizeMode="contain"
      />

      <Pressable onPress={() => navigation.navigate('Tasks')}>
        <Text style={styles.linkText}>My Upcoming Tasks</Text>
      </Pressable>


      <FlatList
        data={tasks.slice(0, 2)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffff',
    backgroundColor: '#7c98c7',
    borderRadius: 20,
    padding: 10,
  },
  placeholderImage: {
    width: 400,
    marginBottom: 5,
  },
  linkText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
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

  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listIcon: {
    paddingLeft: 20,
  },
});