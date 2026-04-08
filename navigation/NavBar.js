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
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginRight: 15 }}
            activeOpacity={0.7}
          >
            <Image
              source={require('../assets/images/green-bunny-profile.png')}
              style={{ width: 36, height: 36, borderRadius: 18 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#a1b869',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#556DC2',
          height: 80,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          width: 40,
          height: 40,
          overflow: 'visible',
        },
      })}
    >

      <Tab.Screen name="Bulletin Board" component={BulletinBoardScreen} options={{
        tabBarIcon: ({ color, focused }) => (
          <FontAwesome
            name="sticky-note-o"
            size={focused ? 36 : 32}
            color={color}

          />
        ),
      }}
      />
      <Tab.Screen name="Tasks" component={TasksScreen} options={{
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons
            name="broom"
            size={focused ? 36 : 32}
            color={color}
          />
        ),
      }}
      />
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color, focused }) => (
          <Feather
            name="home"
            size={focused ? 36 : 32}
            color={color}
          />
        ),
      }}
      />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{
        tabBarIcon: ({ color, focused }) => (
          <Feather
            name="message-circle"
            size={focused ? 36 : 32}
            color={color}
          />
        ),
      }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ color, focused }) => (
          <Image
            source={profileIcon}
            style={{
              width: focused ? 36 : 32,
              height: focused ? 36 : 32,
              tintColor: color,
            }}
          />
        ),
      }}
      />
    </Tab.Navigator>
  );
}