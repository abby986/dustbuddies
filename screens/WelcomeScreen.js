import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//new addition: join group modal popup import
import JoinGroupModal from './WelcomeScreenComponents/JoinGroupModal';


export default function WelcomeScreen({ navigation }) {
    {/*const navigation = useNavigation();*/ }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isSignUp, setIsSignUp] = useState(false);

    //new addition: modal visibility state
    const [showJoinModal, setShowJoinModal] = useState(false);


    //new addition: new handleSubmit so modal is prompted to open first
    const handleSubmit = () => {
        setShowJoinModal(true);
    };

    /*const handleSubmit = () => {
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Is Sign Up:', isSignUp)
        navigation.navigate('MainTabs');
    };*/
    const renderSignUpFields = () => {
        if (isSignUp) {
            return (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                </>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Image //CHRIS PLEASE PUT THE TITLE LOGO IN THE ASSETS AREA WHEN YOU GET IT
                source={require('../assets/title.png')}
                style={styles.title}
            ></Image>


            <View style={styles.formBox}>
                <Text style={styles.formTitle}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
                {renderSignUpFields()}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none">
                </TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}>
                </TextInput>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>{isSignUp ? 'Sign up' : 'Sign In'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                    <Text style={styles.toggleText}>
                        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                    </Text>
                </TouchableOpacity>
            </View>
            {/*new addition: user clicks yes on modal, bring them to homescreen, user clicks no, bring them back to sign up */}
            <JoinGroupModal
                visible={showJoinModal}
                onYes={() => { setShowJoinModal(false); navigation.navigate('Home'); }}
                onNo={() => setShowJoinModal(false)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title: {
        width: 350,
        height: 120,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    formBox: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    submitButton: {
        backgroundColor: '#4f61b3',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleText: {
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 10,
    },
})