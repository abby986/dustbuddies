//Ecnountered an error when pushing changes to Github. Clause Code pushed changes when troubleshooting without allowing to manually create a branch.
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  ScrollView
} from 'react-native';

import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

import Ionicons from '@expo/vector-icons/Ionicons';

const badgeImages = {
  "badge01": require('../../assets/gold.png'),
  "badge02": require('../../assets/silver_badge.png'),
  "badge03": require('../../assets/bronze_badge.png'),
  "badge04": require('../../assets/gold.png'),
  "badge05": require('../../assets/gold.png'),
  "badge06": require('../../assets/silver_badge.png'),
  "badge07": require('../../assets/silver_badge.png'),
  "badge08": require('../../assets/silver_badge.png'),
  "badge09": require('../../assets/bronze_badge.png'),
  "badge10": require('../../assets/bronze_badge.png'),
  "badge11": require('../../assets/bronze_badge.png'),
};

const itemSources = {
  vest: require('../../assets/rabbit-blue-vest.png'),
  pink_skirt: require('../../assets/rabbit-pink-skirt.png'),
  red_bow: require('../../assets/rabbit-bow.png'),
};

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [newBadge, setNewBadge] = useState(null);

  const initialLoad = useRef(true);
  const lastBadgeCount = useRef(0);


  const featuredBadges = userData?.featuredBadges || [];

  //FeatureBadge Test
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;


    const userRef = doc(db, 'users', uid);


    const unsubscribe = onSnapshot(userRef, async (docSnap) => {
      if (!docSnap.exists()) return;


      const data = docSnap.data();
      setUserData(data);

      // check for new badge notification
      if (data.newBadgeNotification) {

        setNewBadge(data.newBadgeNotification);

        // clear notification so it doesn't trigger again
        await updateDoc(userRef, {
          newBadgeNotification: null
        });

        setTimeout(() => {
          setNewBadge(null);
        }, 9000);
      }

    });

    return () => unsubscribe();

  }, []);

  /*
    useEffect(() => {
      const fetchUser = async () => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      };

      fetchUser();
      const unsubscribe = navigation.addListener('focus', fetchUser);
      return unsubscribe;
    }, [navigation]);
    */

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {userData && (
          <Text style={styles.userName}>
            {userData.firstName}'s DustBuddy
          </Text>
        )}

        <View style={styles.sideIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.7}
          >
            <Ionicons name="settings" size={38} color="#363636" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Closet')}
            activeOpacity={0.7}
          >
            <Ionicons name="shirt-outline" size={38} color="#363636" />
          </TouchableOpacity>
        </View>

        <View style={styles.bunnyWrapper}>
          <Image
            source={require('../../assets/rabbit_final_copy_3.png')}
            style={styles.bunnyImage}
          />
          {userData?.outfit?.shirt && (
            <Image source={itemSources[userData.outfit.shirt]} style={styles.clothingOverlay} />
          )}
          {userData?.outfit?.hat && (
            <Image source={itemSources[userData.outfit.hat]} style={styles.hatOverlay} />
          )}
          {userData?.outfit?.pants && (
            <Image source={itemSources[userData.outfit.pants]} style={styles.pantsOverlay} />
          )}
        </View>

        <View contentContainerStyle={styles.feed}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.subheading}>Featured Badges</Text>
            </View>
          </View>

        </View>

        <View style={styles.badge}>
          {featuredBadges.slice(0, 3).map((badge, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Badges')}
              activeOpacity={0.7}
            >
              <Image
                key={index}
                source={badgeImages[badge]}
                style={styles.badgeImage}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="View More"
            onPress={() => navigation.navigate('Badges')}
          />
        </View>


      </ScrollView>
      {newBadge && (
        <View style={styles.popupOverlay}>
          <View style={styles.badgePopup}>
            <Text style={styles.badgePopupTitle}>New Badge!</Text>

            <Text style={styles.badgePopupName}>
              {newBadge.name}
            </Text>

            <Image
              source={badgeImages[newBadge.badge]}
              style={styles.popupBadgeImage}
            />


          </View>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollContent: {
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },

  sideIcons: {
    position: 'absolute',
    right: 16,
    top: 216,
    justifyContent: 'space-between',
    height: 120,
  },

  bunnyImage: {
    width: 320,
    height: 320,
    borderRadius: 12,
    resizeMode: 'contain',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  subheading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#363636',
  },
  badgeImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginHorizontal: 8
  },

  badge: {
    justifyContent: 'center',
    flexDirection: 'row',
    resizeMode: 'center',
    marginTop: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#363636',
    marginTop: 0,
    marginBottom: 12,
  },

  viewMoreWrap: {
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bunnyWrapper: {
    width: 320,
    height: 320,
    position: 'relative',
  },
  clothingOverlay: {
    position: 'absolute',
    width: 250,
    height: 250,
    resizeMode: 'contain',
    top: 106,
    left: 36,
  },
  hatOverlay: {
    position: 'absolute',
    width: 160,
    height: 160,
    resizeMode: 'contain',
    top: 10,
    left: 75,
  },
  pantsOverlay: {
    position: 'absolute',
    width: 180,
    height: 180,
    resizeMode: 'contain',
    top: 200,
    left: 65,
  },
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* BADGE POPUP CARD */
  badgePopup: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,

    elevation: 10
  },

  badgePopupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#363636",
    textAlign: "center",
    width: "100%",
    margicBottom: 8
  },

  popupBadgeImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginVertical: 10
  },

  badgePopupName: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    width: "100%",
  }

});

