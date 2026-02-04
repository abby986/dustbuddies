import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Data for the grid
const featuredBadges = [
    { id: 1, image: require('../../assets/GoldBadge.png'), locked: false },
    { id: 2, image: require('../../assets/SilverBadge.png'), locked: false },
    { id: 3, image: require('../../assets/BronzeBadge.png'), locked: false },
];

const allBadges = [
    { id: 4, image: require('../../assets/GoldBadge.png'), locked: false },
    { id: 5, image: require('../../assets/GoldBadge.png'), locked: false },
    { id: 6, image: require('../../assets/SilverBadge.png'), locked: false },
    { id: 7, image: require('../../assets/SilverBadge.png'), locked: false },
    { id: 8, image: require('../../assets/SilverBadge.png'), locked: false },
    { id: 9, image: require('../../assets/BronzeBadge.png'), locked: false },
    { id: 10, image: require('../../assets/BronzeBadge.png'), locked: false },
    { id: 11, image: require('../../assets/BronzeBadge.png'), locked: false },
    { id: 12, image: require('../../assets/LockedBadge.png'), locked: true },
    { id: 13, image: require('../../assets/LockedBadge.png'), locked: true },
    { id: 14, image: require('../../assets/LockedBadge.png'), locked: true },
    { id: 15, image: require('../../assets/LockedBadge.png'), locked: true },
];

export default function BadgesList({ navigation }) {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <View style={styles.profileCircle} />
            </View>

            <Text style={styles.sectionTitle}>Featured:</Text>
            <View style={styles.grid}>
                {featuredBadges.map((badge) => (
                    <TouchableOpacity
                        key={badge.id}
                        style={styles.badgeWrapper}
                        onPress={() => navigation.navigate('BadgeInfo', { badge })}
                    >
                        <Image source={badge.image} style={styles.featuredImage} />
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>All:</Text>
            <View style={styles.grid}>
                {allBadges.map((badge) => (
                    <TouchableOpacity
                        key={badge.id}
                        style={styles.badgeWrapper}
                        disabled={badge.locked}
                        onPress={() => navigation.navigate('BadgeInfo', { badge })}
                    >
                        <Image
                            source={badge.image}
                            style={[styles.badgeImage, badge.locked && styles.lockedBadge]}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
    },

    backButton: {
        padding: 5,
    },

    profileCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#a1b869',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        marginVertical: 15,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    badgeWrapper: {
        width: '30%',
        aspectRatio: 1,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* Featured badges */
    featuredImage: {
        width: '120%',
        height: 120,
        resizeMode: 'contain',
    },

    /* All badges */
    badgeImage: {
        width: '120%',
        height: '120%',
        resizeMode: 'contain',
    },

    /* Locked style */
    lockedBadge: {
        opacity: 0.35,
    },
});