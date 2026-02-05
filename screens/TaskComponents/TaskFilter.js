import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//toggle to indicate my tasks and all tasks
export default function TaskFilter({ showMyTasks, setShowMyTasks }) {
    return (
        <View style={styles.simpleTabs}>
            <TouchableOpacity
                style={showMyTasks ? styles.simpleTabLeftActive : styles.simpleTabLeftInactive}
                onPress={() => setShowMyTasks(true)}
            >
                <Text style={showMyTasks ? styles.activeText : styles.inactiveText}>
                    My Tasks
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={!showMyTasks ? styles.simpleTabRightActive : styles.simpleTabRightInactive}
                onPress={() => setShowMyTasks(false)}
            >
                <Text style={!showMyTasks ? styles.activeText : styles.inactiveText}>
                    All Tasks
                </Text>
            </TouchableOpacity>
        </View>



    );
}

//crazy button styling
const styles = StyleSheet.create({
    simpleTabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginBottom: 20,
        marginTop: 30,
    },

    //active selected button
    simpleTabLeftActive: {
        backgroundColor: '#556dc2',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 100, //crazy border radius for funky shape
    },
    simpleTabRightActive: {
        backgroundColor: '#556dc2',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },

    //inactive unselected button
    simpleTabLeftInactive: {
        backgroundColor: '#cccccc',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 100,
    },
    simpleTabRightInactive: {
        backgroundColor: '#cccccc',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },

    //text color inside button
    activeText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    inactiveText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '600',
    },
});