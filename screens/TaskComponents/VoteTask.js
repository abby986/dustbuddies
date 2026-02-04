import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//thumbs and profile icon import
import { Feather, Ionicons } from '@expo/vector-icons';

//display voting screen with placeholder image, thumbs up or down to vote, and display vote count
export default function VoteTask({ task, onVote, onBack }) {
    return (
        <View style={styles.container}>

            {/*insert task name*/}
            <Text style={styles.taskName}>{task?.key}</Text>

            {/*placeholder box for photo*/}
            <View style={styles.placeholderContainer}>

                {/*profile icon in bottom-right corner*/}
                <View style={styles.profileIcon}>
                    <Ionicons name="person-circle-outline" size={50} color="#e8c854" />
                </View>

                {/*placeholder indicator text*/}
                <Text style={styles.placeholderText}>Photo Placeholder</Text>
            </View>

            {/*voting buttons*/}
            <View style={styles.voteRow}>
                <TouchableOpacity onPress={() => onVote('up')}>
                    <Feather name="thumbs-up" size={50} color="#a1b869" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onVote('down')}>
                    <Feather name="thumbs-down" size={50} color="#db6262" />
                </TouchableOpacity>
            </View>

            {/* Back button
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>*/}

            {/*vote count text placeholder*/}
            <Text style={styles.voteCount}>2/3 Votes</Text>
        </View>
    );
}

//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    taskName: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
    },

    placeholderContainer: {
        width: '80%',
        height: 450,
        backgroundColor: '#f0f0f0',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 30,
    },

    placeholderText: {
        fontSize: 18,
        color: '#555',
    },

    profileIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },

    voteRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 90,
        marginBottom: 30,
    },

    backButton: {
        marginBottom: 10,
    },

    backText: {
        fontSize: 18,
        color: '#333',
    },
    voteCount: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
    },
});

