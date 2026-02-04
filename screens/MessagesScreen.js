import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesList from './MessageComponents/ChatList';
import DirectMessage from './MessageComponents/DirectMessage';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function MessagesScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessagesList"
        component={MessagesList}
        options={{
          title: '',
          headerRight: () => (
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#A6D8A8',
                marginRight: 15,
              }}
            />
          ),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="DirectMessage"
        component={DirectMessage}
        // FIXED: Added the arrow '=>' and parentheses around the object
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
        })}
      />
    </Stack.Navigator>
  );
}