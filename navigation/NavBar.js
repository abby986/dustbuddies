import React from 'react';
//import image
import { Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BulletinBoardScreen from '../screens/BulletinBoardComponents/BulletinBoardScreen';
import TasksScreen from '../screens/TasksScreen';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreenComponents/ProfileScreen';

//asset image imports
import profileIcon from '../assets/images/bunny-head-nav-white.png';
//icon imports
// Vector icons
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#556DC2',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,

        },
      }}
    >

      <Tab.Screen name="Bulletin Board" component={BulletinBoardScreen} options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome
            name="sticky-note-o"
            size={30}
            color="#ffffff"

          />
        ),
      }}
      />
      <Tab.Screen name="Tasks" component={TasksScreen} options={{
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="broom"
            size={32}
            color="#ffffff"
          />
        ),
      }}
      />
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="home"
            size={32}
            color="#ffffff"
          />
        ),
      }}
      />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="message-circle"
            size={32}
            color="#ffffff"
          />
        ),
      }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={profileIcon}
            style={{
              width: 34,
              height: 34,
              tintColor: '#ffffff',
            }}
          />
        ),
      }}
      />
    </Tab.Navigator>
  );
}