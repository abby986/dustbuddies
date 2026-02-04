import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesList from './Mockdata/messages';
import DirectMessage from './Mocckdata/DirectMessage';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function MessagesScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MessagesList"
                component={MessagesList}
                options={{
                    title: '', // Removes the extra "Messages" text title
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
                options={({ navigation, route }) => ({
                    title: route.params?.name || 'Chat',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                            <Ionicons name="chevron-back" size={28} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    // individual box for each button
    buttonContainer: {
        backgroundColor: '#F2D16B',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },

    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontSize: 18,
    },
    messageContent: {
        flex: 1,
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
    },
    preview: {
        color: '#888',
        marginTop: 2,
    },
    date: {
        fontSize: 12,
        color: '#aaa',
    },
});