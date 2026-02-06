import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

/* Chat List Information */
const messages = [
    {
        id: '1',
        name: 'Lauren Ipsum',
        lastMessage: 'I think your car is parked behind mine!',
        date: '11/16/19',
        color: require('../../assets/images/green-bunny-profile.png'),
    },
    {
        id: '2',
        name: 'Blah Blah',
        lastMessage: 'Placeholder text',
        date: '11/15/19',
        color: require('../../assets/images/yelow-bunny-profile.png'),
    },
    {
        id: '3',
        name: 'Blah Blah 2',
        lastMessage: 'Placeholder text',
        date: '10/30/19',
        color: require('../../assets/images/red-bunny-profile.png'),
    },
    {
        id: '4',
        name: 'Group Chat',
        lastMessage: 'Photo',
        date: '10/28/19',
        color: require('../../assets/images/group-chat-profile.png'),
    },
];

export default function MessagesList() {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.messageRow}
            onPress={() =>
                navigation.navigate('DirectMessage', {
                    name: item.name,
                })
            }
        >
            <Image
                source={item.color}
                style={styles.avatar}
            />

            <View style={styles.messageContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.preview}>{item.lastMessage}</Text>
            </View>

            <Text style={styles.date}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Buttons */}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer}>

                    <Ionicons name="create-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
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
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    buttonContainer: {
        backgroundColor: '#F2D16B',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
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
    profileCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#A6D8A8',
    }

});
