import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export default function AccountScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) setUserData(userDoc.data());
            setLoading(false);
        };
        fetchUser();
    }, []);

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword || !currentPassword) {
            Alert.alert('Missing fields', 'Please fill in all password fields.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('New passwords do not match!', 'Please make sure both passwords are the same!');
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert('Weak password', 'Password should be at least 6 characters.');
            return;
        }
        setChangingPassword(true);
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            Alert.alert('Success!', 'Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                Alert.alert('Error', 'Current password is incorrect.')
            } else {
                Alert.alert('Error', 'Failed to update password. Please try again.');
            }
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#4f61b3" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.back}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Account Info</Text>
                <View style={{ width: 20 }} />
            </View>
            <Text style={styles.sectionTitle}> Personal Information</Text>
            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>First Name</Text>
                    <Text style={styles.value}>{userData?.firstName || '—'}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Last Name</Text>
                    <Text style={styles.value}>{userData?.lastName || '—'}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{userData?.email || '—'}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.value}>{userData?.phoneNumber || '—'}</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Change Password</Text>
            <View style={styles.infoCard}>
                <TextInput
                    style={styles.input}
                    placeholder="Current Password"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholderTextColor="#aaa"
                />
                <View style={styles.divider} />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholderTextColor="#aaa"
                />
                <View style={styles.divider} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm New Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="#aaa"
                />
            </View>

            <TouchableOpacity
                style={[styles.button, changingPassword && { opacity: 0.6 }]}
                onPress={handleChangePassword}
                disabled={changingPassword}
            >
                {changingPassword
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.buttonText}>Update Password</Text>
                }
            </TouchableOpacity>
        </ScrollView>




    );
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

    },
    back: {
        fontSize: 42,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginTop: 24,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    infoCard: {
        marginHorizontal: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    label: {
        fontSize: 15,
        color: '#555'
    },
    value: {
        fontSize: 15,
        fontWeight: '500',
        color: '#222'
    },
    divider: {
        height: 0,
        backgroundColor: '#ddd'
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 15,
        color: '#222',
    },
    button: {
        backgroundColor: '#4f61b3',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
});