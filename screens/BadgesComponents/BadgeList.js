import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

//Data for the grid
const featuredBadges = [
    { id: 1, image: require('../../assets/gold.png') },
    { id: 2, image: require('../../assets/silver_badge.png') },
    { id: 3, image: require('../../assets/bronze_badge.png') },
];

const allBadges = [
    { id: 4, image: require('../../assets/gold.png') },
    { id: 5, image: require('../../assets/gold.png') },
    { id: 6, image: require('../../assets/silver_badge.png') },
    { id: 7, image: require('../../assets/silver_badge.png') },
    { id: 8, image: require('../../assets/silver_badge.png') },
    { id: 9, image: require('../../assets/bronze_badge.png') },
    { id: 10, image: require('../../assets/bronze_badge.png') },
    { id: 11, image: require('../../assets/bronze_badge.png') },
];

export default function BadgesList({ navigation }) {
    const insets = useSafeAreaInsets();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.content, { paddingTop: insets.top + 16 }]}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.iconButton}
                    >
                        <Ionicons name="chevron-back" size={28} />
                    </TouchableOpacity>

                    <Image
                        source={require('../../assets/images/green-bunny-profile.png')}
                        style={styles.profile}
                    />
                </View>

                {/* Featured */}
                <Text style={styles.sectionTitle}>Featured</Text>

                <View style={styles.grid}>
                    {featuredBadges.map((badge) => (
                        <TouchableOpacity
                            key={badge.id}
                            style={styles.badgeWrapper}
                            onPress={() => navigation.navigate('BadgeInfo', { badge })}
                        >
                            <Image source={badge.image} style={styles.badgeImage} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ALL */}
                <Text style={styles.sectionTitle}>All</Text>

                <View style={styles.grid}>
                    {allBadges.map((badge) => (
                        <TouchableOpacity
                            key={badge.id}
                            style={styles.badgeWrapper}
                            onPress={() => navigation.navigate('BadgeInfo', { badge })}
                        >
                            <Image source={badge.image} style={styles.badgeImage} />
                        </TouchableOpacity>
                    ))}
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

    content: {
        flex: 1,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    iconButton: {
        padding: 8,
    },

    profile: {
        width: 36,
        height: 36,
        borderRadius: 18,
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

    badgeImage: {
        width: '110%',
        height: '110%',
        resizeMode: 'contain',
    },
});
