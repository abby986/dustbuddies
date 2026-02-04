import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//x icon import
import { Octicons } from '@expo/vector-icons';


//this will display the image, the submit button, and the x/cancel button
export default function SubmitTask({ onSubmit, onBack }) {
    return (
        <View style={styles.container}>

            {/*placeholder box for photo*/}
            <View style={styles.placeholderContainer}>

                {/*x icon in the corner*/}
                <TouchableOpacity style={styles.closeIcon}>
                    <Octicons name="x-circle-fill" size={28} color="#e8c854" />
                </TouchableOpacity>

                {/*placeholder indicator text*/}
                <Text style={styles.placeholderText}>Photo Placeholder</Text>
            </View>

            {/*photo submit button*/}
            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

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

    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },

    submitButton: {
        backgroundColor: '#556dc2',
        paddingVertical: 12,
        paddingHorizontal: 115,
        borderRadius: 28,
    },

    submitText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});
