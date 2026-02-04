import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function JoinGroupModal({ visible, onYes, onNo }) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                {/*text above pop up box */}
                <Text style={styles.topText}>Connect with{'\n'}your dustbuddies!</Text>

                <View style={styles.box}>
                    <Text style={styles.title}>
                        You've been invited to join:{'\n'}
                        <Text style={styles.groupName}>Roomies 2025</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Would you like to join?
                    </Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.yesButton} onPress={onYes}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.noButton} onPress={onNo}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

//styles
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 255, 255)',
    },
    topText: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 60, //space between text and box
        textAlign: 'center',
    },
    box: {
        width: '75%',
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000', //dropshadow
        shadowOffset: { width: 0, height: 4 }, //dropshadow
        shadowOpacity: 0.25, //dropshadow
        shadowRadius: 8, //dropshadow

    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
    },
    groupName: {
        color: '#556dc2',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 25,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 20,
    },
    yesButton: {
        backgroundColor: '#a1b869',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 15,
    },
    noButton: {
        backgroundColor: '#db6262',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

