import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Touchable } from 'react-native';

export default function SettingsScreen() {
    const [pushNotifications, setPushNotifications] = useState(false);
    const [cameraAccess, setCameraAccess] = useState(false);
    const [automaticUpdates, setAutomaticUpdates] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Quick Access Settings</Text>
            <View style={styles.settingRow}>
                <Text style={styles.settingText}>Push Notifications</Text>
                <Switch value={pushNotifications}
                    onValueChange={setPushNotifications}></Switch>
            </View>

            <View style={styles.settingRow}>
                <Text style={styles.settingText}>Camera Access</Text>
                <Switch
                    value={cameraAccess}
                    onValueChange={setCameraAccess}
                />
            </View>

            <View style={styles.settingRow}>
                <Text style={styles.settingText}>Automatic Updates</Text>
                <Switch
                    value={automaticUpdates}
                    onValueChange={setAutomaticUpdates}
                />
            </View>
            <View style={styles.spacer}></View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Account Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Accessibility</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textDecorationLine: 'underline',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    settingText: {
        fontSize: 16,
    },
    spacer: {
        height: 30,
    },
    button: {
        backgroundColor: '#4f61b3',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});