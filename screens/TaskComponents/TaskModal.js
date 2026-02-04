import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
//arrow icon import
import { Feather } from '@expo/vector-icons';

//this pop up will appear when the user clicks on their own task, prompting them to take a photo. not doing the photo just yet so it will take them to the submit photo section
export default function TaskModal({ visible, task, onClose, onContinue }) {
    return (
        <Modal visible={visible} transparent>
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <Text style={styles.modalText}>Take a photo of the completed task!</Text>

                    <TouchableOpacity onPress={onContinue} style={styles.iconButton}>
                        <Feather name="arrow-right-circle" size={40} color="#a1b869" />
                    </TouchableOpacity>


                    {/*<TouchableOpacity onPress={onClose}>
                        <Text>Cancel</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    );
}

//basic style so the pop up is visible and uses icon
const styles = {
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    box: {
        width: '75%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',      //helps center horizontally
        justifyContent: 'center',  //helps center vertically
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    iconButton: {
        marginTop: 10,
    },
};

