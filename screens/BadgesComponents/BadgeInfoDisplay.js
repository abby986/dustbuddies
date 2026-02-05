import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function BadgeInfoDisplay({ navigation, route }) {
    const { badge } = route.params;
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <View style={styles.profileCircle} />
            </View>

            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={badge.image} style={styles.badgeImage} />
                </View>

                <Text style={styles.badgeTitle}>Defeated 15 Chore Monsters</Text>
                <Text style={styles.completedDate}>Completed: 11/12/2025</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.featureButton]}>
                        <Text style={styles.buttonText}>Feature Badge</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.removeButton]}>
                        <Text style={styles.buttonText}>Remove from Featured</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 20,
        paddingVertical: 12,

        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    imageContainer: {
        width: 220,
        height: 220,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    badgeImage: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    badgeTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000',
        textAlign: 'center',
        marginBottom: 8,
    },
    completedDate: {
        fontSize: 16,
        color: '#666',
        marginBottom: 50,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 15,
    },
    button: {
        width: '70%',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    featureButton: {
        backgroundColor: '#7B98C7',
    },
    removeButton: {
        backgroundColor: '#DB6262',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    backButton: {
        padding: 5,
    },

    profileCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#a1b869',
    },

});
