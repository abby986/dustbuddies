import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//toggle to indicate my tasks and all tasks
export default function TaskFilter({ showMyTasks, setShowMyTasks }) {
    return (
        <View style={styles.simpleTabs}>
            <TouchableOpacity onPress={() => setShowMyTasks(true)}>
                <Text style={styles.simpleTabText}>My Tasks</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowMyTasks(false)}>
                <Text style={styles.simpleTabText}>All Tasks</Text>
            </TouchableOpacity>
        </View>
    );
}

//simple style to put the task type side by side
const styles = StyleSheet.create({
    simpleTabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 20,
    },
    simpleTabText: {
        fontSize: 20,
        fontWeight: '600',
    },
});
