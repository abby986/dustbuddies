import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/* Badge Data */

const featuredBadges = [
    { id: 1, image: require('../../assets/gold.png'), locked: false },
    { id: 2, image: require('../../assets/silver_badge.png'), locked: false },
    { id: 3, image: require('../../assets/bronze_badge.png'), locked: false },
];

const allBadges = [
    { id: 4, image: require('../../assets/gold.png'), locked: false },
    { id: 5, image: require('../../assets/gold.png'), locked: false },
    { id: 6, image: require('../../assets/silver_badge.png'), locked: false },
    { id: 7, image: require('../../assets/silver_badge.png'), locked: false },
    { id: 8, image: require('../../assets/silver_badge.png'), locked: false },
    { id: 9, image: require('../../assets/bronze_badge.png'), locked: false },
    { id: 10, image: require('../../assets/bronze_badge.png'), locked: false },
    { id: 11, image: require('../../assets/bronze_badge.png'), locked: false },

    { id: 12, image: require('../../assets/locked_badge.png'), locked: true },
    { id: 13, image: require('../../assets/locked_badge.png'), locked: true },
    { id: 14, image: require('../../assets/locked_badge.png'), locked: true },
    { id: 15, image: require('../../assets/locked_badge.png'), locked: true },
];


export default function BadgesScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    /* STATE */
    const [selectedBadge, setSelectedBadge] = useState(null);


    if (selectedBadge) {
        return (
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>

                    {/* Back */}
                    <TouchableOpacity
                        onPress={() => setSelectedBadge(null)}
                    >
                        <Ionicons name="chevron-back" size={28} />
                    </TouchableOpacity>

                    {/* Profile */}
                    <Image
                        source={require('../../assets/images/green-bunny-profile.png')}
                        style={styles.profileImage}
                    />

                </View>


                {/* Badge Image */}
                <View style={styles.infoImageBox}>
                    <Image
                        source={selectedBadge.image}
                        style={styles.infoImage}
                    />
                </View>


                {/* Info */}
                <Text style={styles.badgeTitle}>
                    Defeated 15 Chore Monsters
                </Text>


                <Text style={styles.completedDate}>
                    Completed: 11/12/2025
                </Text>


                {/* Buttons */}
                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        style={[styles.button, styles.featureButton]}
                    >
                        <Text style={styles.buttonText}>
                            Feature Badge
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.button, styles.removeButton]}
                    >
                        <Text style={styles.buttonText}>
                            Remove from Featured
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        );
    }


    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            {/* Header */}
            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={28} />
                </TouchableOpacity>

                <Image
                    source={require('../../assets/images/green-bunny-profile.png')}
                    style={styles.profileImage}
                />

            </View>


            {/* Featured */}
            <Text style={styles.sectionTitle}>Featured</Text>

            <View style={styles.grid}>
                {featuredBadges.map((badge) => (
                    <TouchableOpacity
                        key={badge.id}
                        style={styles.badgeWrapper}
                        onPress={() => setSelectedBadge(badge)}
                    >
                        <Image
                            source={badge.image}
                            style={styles.featuredImage}
                        />
                    </TouchableOpacity>
                ))}
            </View>


            {/* All */}
            <Text style={styles.sectionTitle}>All</Text>

            <View style={styles.grid}>
                {allBadges.map((badge) => (
                    <TouchableOpacity
                        key={badge.id}
                        style={styles.badgeWrapper}
                        disabled={badge.locked}
                        onPress={() => setSelectedBadge(badge)}
                    >
                        <Image
                            source={badge.image}
                            style={[
                                styles.badgeImage,
                                badge.locked && styles.lockedBadge,
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        resizeMode: 'cover',
    },


    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },


    /* Header */

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },

    profileCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#a1b869',
    },


    /* Titles */

    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        marginVertical: 15,
    },

    /* Grid */

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


    /* Images */

    featuredImage: {
        width: '120%',
        height: 120,
        resizeMode: 'contain',
    },

    badgeImage: {
        width: '120%',
        height: '120%',
        resizeMode: 'contain',
    },

    lockedBadge: {
        opacity: 0.35,
    },


    /* Info Screen */

    infoImageBox: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },

    infoImage: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },

    badgeTitle: {
        fontSize: 22,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 8,
    },

    completedDate: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },


    /* Buttons */

    buttonContainer: {
        alignItems: 'center',
        gap: 15,
    },

    button: {
        width: '70%',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
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
        fontWeight: '600',
    },

});