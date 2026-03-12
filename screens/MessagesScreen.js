import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesList from './Mockdata/messages';
import DirectMessage from './Mockdata/DirectMessage';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const ProfileHeaderButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.getParent()?.navigate('Profile')}
    style={{ marginRight: 15 }}
    activeOpacity={0.7}
  >
    <Image
      source={require('../assets/images/green-bunny-profile.png')}
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
      }}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default function MessagesScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessagesList"
        component={MessagesList}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => <ProfileHeaderButton navigation={navigation} />,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="DirectMessage"
        component={DirectMessage}
        options={({ navigation, route }) => ({
          title: route.params?.name || 'Chat',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => <ProfileHeaderButton navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}