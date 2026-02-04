import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//profile icon import
import { Ionicons } from '@expo/vector-icons';


//displays task title and makes it touchable so it can be clicked and bring user to either submit their task or vote on someone else's
export default function TaskItems({ task, number, onPress }) {
    const iconColor = task.mine ? '#a1b869' : '#e8c854';
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.taskRow}>

                {/*statusbox will be on left along with numbering*/}
                <View style={styles.leftSide}>
                    <View style={styles.statusBox} />
                    <Text style={styles.text}>{number}. {task.key}</Text>
                </View>

                {/*profile icon from ionicons will be on right, color will match user*/}
                <Ionicons
                    name="person-circle-outline"
                    size={40}
                    color={iconColor}
                />
            </View>
        </TouchableOpacity>
    );
}

//temp styles for visibility during testing
const styles = StyleSheet.create({
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',   // this should push icon to the right
        width: '90%',                      // this should center the row
        alignSelf: 'center',               // this should center the whole row
        paddingVertical: 12,
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBox: {
        width: 20, //this is the status box, which will be replaced with icons that update through backend status
        height: 20,
        borderWidth: 1,
        marginRight: 10,
    },
    text: {
        fontSize: 18, //font size and line height for visibility
        lineHeight: 24,
    },
});