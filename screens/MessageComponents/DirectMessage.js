import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockMessages = [
    { id: '1', text: 'I took out the trash', time: '17:47', sender: 'me' },
    { id: '2', text: 'Good bye!', time: '17:47', sender: 'me' },

    { id: 'date-1', type: 'date', label: 'Fri, Jul 26' },

    { id: '3', text: 'Good morning!', time: '10:10', sender: 'me' },
    { id: '4', text: 'Let\'s get another cat', time: '10:10', sender: 'me' },
    { id: '5', text: '📄 IMG_0475', time: '10:15', sender: 'me' },

    { id: '6', text: '📄 IMG_0481', time: '10:15', sender: 'me' },
    { id: '7', text: 'When can we pick it up', time: '11:40', sender: 'them' },
    { id: '8', text: 'We have to go now 😎', time: '11:43', sender: 'me' },
    { id: '9', text: 'What kind of litter box do we get?\nWith a lid', time: '11:45', sender: 'them' },

    { id: '10', text: 'With a lid', time: '11:45', sender: 'them' },
    { id: '11', text: 'I think top two are:', time: '11:50', sender: 'me' },
    { id: '12', text: '📄 IMG_0483', time: '11:51', sender: 'me' },
    { id: '13', text: '📄 IMG_0484', time: '11:51', sender: 'me' },
];

export default function DirectMessage() {
    const [message, setMessage] = useState('');

    const renderItem = ({ item }) => {
        // Date Separator
        if (item.type === 'date') {
            return (
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.label}</Text>
                </View>
            );
        }
        //Logic to add the Ionicon to chat
        const isImage = item.text.includes('IMG_');

        return (
            <View
                style={[
                    styles.messageBubble,
                    item.sender === 'me' ? styles.myMessage : styles.theirMessage,
                ]}
            >
                {isImage ? (
                    <View style={styles.imageRow}>
                        <Ionicons name="image-sharp" size={18} color="#white" style={{ marginRight: 5 }} />
                        <Text style={styles.messageText}>{item.text.replace('📄 ', '')}</Text>
                    </View>
                ) : (
                    <Text style={styles.messageText}>{item.text}</Text>
                )}
                <Text style={styles.time}>{item.time}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={mockMessages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chat}
            />

            <View style={styles.inputBar}>
                <TouchableOpacity>
                    <Ionicons name="add" size={24} color="#007AFF" />
                </TouchableOpacity>

                <TextInput
                    placeholder="Message"
                    value={message}
                    onChangeText={setMessage}
                    style={styles.input}
                />

                <TouchableOpacity>
                    <Ionicons name="arrow-up-circle" size={28} color="#007AFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chat: {
        padding: 16,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 15,
        marginBottom: 8,
        maxWidth: '80%',
    },
    myMessage: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 2,
    },
    theirMessage: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 2,
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
    time: {
        fontSize: 10,
        color: '#888',
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    dateContainer: {
        alignSelf: 'center',
        backgroundColor: '#eee',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginVertical: 16,
    },
    dateText: {
        fontSize: 12,
        color: '#666',
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 10,
        fontSize: 16,
    },
});