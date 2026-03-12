import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../firebase';
import { collection, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';

/* Badge Data
const featuredBadges = [
    { id: 1, image: require('../../assets/gold.png'), locked: false },
    { id: 2, image: require('../../assets/silver_badge.png'), locked: false },
    { id: 3, image: require('../../assets/bronze_badge.png'), locked: false },
];
*/
/* Image map */
const badgeImages = {
    "gold.png": require('../../assets/gold.png'),
    "silver_badge.png": require('../../assets/silver_badge.png'),
    "bronze_badge.png": require('../../assets/bronze_badge.png'),
    "locked_badge.png": require('../../assets/locked_badge.png'),
};

const FEATURED_LIMIT = 3;
export default function BadgesScreen({ navigation }) {
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "badges")), (snapshot) => {
            const badgeList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBadges(badgeList);
        });

        return unsubscribe;
    }, []);
    const [toast, setToast] = useState('');

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(''), 3000); // makes notification disappears after 3 seconds
    };

    {/* Notification Message */ }
    {
        toast !== '' && (
            <View style={styles.toast}>
                <Text style={styles.toastText}>{toast}</Text>
            </View>
        )
    }

    const featuredBadges = badges.filter((b) => b.featured === true).slice(0, FEATURED_LIMIT);

    /* Feature a badge button */
    const handleFeature = async (badge) => {
        if (featuredBadges.length >= FEATURED_LIMIT && !badge.featured) {
            Alert.alert(
                'Featured Full',
                'You already have 3 featured badges. Remove one first to add a new one.'
            );
            return;
        }
        try {
            await updateDoc(doc(db, "badges", badge.id), { featured: true });
            setSelectedBadge({ ...badge, featured: true });
            showToast('✅ Badge added to Featured!');
        } catch (e) {
            Alert.alert('Error', 'Could not feature badge. Please try again.');
        }
    };

    /* Remove a badge button */
    const handleRemove = async (badge) => {
        try {
            await updateDoc(doc(db, "badges", badge.id), { featured: false });
            setSelectedBadge({ ...badge, featured: false });
            showToast('🗑️ Badge removed from Featured!');
        } catch (e) {
            Alert.alert('Error', 'Could not remove badge. Please try again.');
        }
    };

    /* Badge Info View */
    if (selectedBadge) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.container}>

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setSelectedBadge(null)}>
                            <Ionicons name="chevron-back" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })} activeOpacity={0.7}>
                            <Image
                                source={require('../../assets/images/green-bunny-profile.png')}
                                style={styles.profileIcon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Badge Image */}
                    <View style={styles.infoImageBox}>
                        <Image
                            source={badgeImages[selectedBadge.image] || badgeImages['bronze_badge.png']}
                            style={styles.infoImage}
                        />
                    </View>

                    <Text style={styles.badgeTitle}>{selectedBadge.name || 'Badge'}</Text>
                    <Text style={styles.completedDate}>Completed: 11/12/2025</Text>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={[styles.button, styles.featureButton]}
                            onPress={() => handleFeature(selectedBadge)}
                        >
                            <Text style={styles.buttonText}>Feature Badge</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.removeButton]}
                            onPress={() => handleRemove(selectedBadge)}
                        >
                            <Text style={styles.buttonText}>Remove from Featured</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                {toast !== '' && (
                    <View style={styles.toast}>
                        <Text style={styles.toastText}>{toast}</Text>
                    </View>
                )}
            </SafeAreaView>
        );
    }

    /* Main Badges List View */
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={28} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })} activeOpacity={0.7}>
                        <Image
                            source={require('../../assets/images/green-bunny-profile.png')}
                            style={styles.profileIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                {/* Featured Section */}
                <Text style={styles.sectionTitle}>Featured</Text>

                {featuredBadges.length === 0 ? (
                    <Text style={styles.emptyText}>No featured badges yet. Tap a badge to feature it!</Text>
                ) : (
                    <View style={styles.grid}>
                        {featuredBadges.map((badge) => (
                            <TouchableOpacity
                                key={badge.id}
                                style={styles.badgeWrapper}
                                onPress={() => setSelectedBadge(badge)}
                            >
                                <Image
                                    source={badgeImages[badge.image] || badgeImages['bronze_badge.png']}
                                    style={styles.badgeImage}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* All Section */}
                <Text style={styles.sectionTitle}>All</Text>

                <View style={styles.grid}>
                    {badges.map((badge) => (
                        <TouchableOpacity
                            key={badge.id}
                            style={styles.badgeWrapper}
                            disabled={badge.locked}
                            onPress={() => setSelectedBadge(badge)}
                        >
                            <Image
                                source={badgeImages[badge.image] || badgeImages['bronze_badge.png']}
                                style={[styles.badgeImage, badge.locked && styles.lockedBadge]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },

    container: {
        flex: 1,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    profileIcon: {
        width: 40,
        height: 40,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        marginVertical: 15,
    },

    emptyText: {
        fontSize: 14,
        color: '#999',
        marginBottom: 20,
        fontStyle: 'italic',
    },

    /* 3-column grid */
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
        width: '100%',
        height: '100%',
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

    toast: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: '#333',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        zIndex: 999,
    },
    toastText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});
