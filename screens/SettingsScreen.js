import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Touchable, Image, Alert } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

export default function SettingsScreen({ navigation }) {
    const [pushNotifications, setPushNotifications] = useState(false);
    const [cameraAccess, setCameraAccess] = useState(false);
    const [automaticUpdates, setAutomaticUpdates] = useState(false);

    //Logout Button
    const handleLogout = () => {
        navigation.navigate('Welcome');
    };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.back}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })} activeOpacity={0.7}>
                    <Image
                        source={require('../assets/images/green-bunny-profile.png')}
                        style={styles.profileIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
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

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}>
                <Text style={styles.buttonText}>Account Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Accessibility</Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: 60,
        backgroundColor: '#fff',
    },
    back: {
        fontSize: 42,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    profileIcon: {
        width: 40,
        height: 40,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 20,
        textDecorationLine: 'underline',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
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
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#DB6262',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: 20,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});