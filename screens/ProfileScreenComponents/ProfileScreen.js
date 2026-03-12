//Ecnountered an error when pushing changes to Github. Clause Code pushed changes when troubleshooting without allowing to manually create a branch.
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';

import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import Ionicons from '@expo/vector-icons/Ionicons';
import greenIcon from '../../assets/images/green-bunny-profile.png';

const itemSources = {
  vest: require('../../assets/rabbit-blue-vest.png'),
  pink_skirt: require('../../assets/rabbit-pink-skirt.png'),
  red_bow: require('../../assets/rabbit-bow.png'),
  glasses: require('../../assets/glasses.png'),
  wizard_hat: require('../../assets/wizard-hat.png'),
  crown: require('../../assets/crown.png'),
};

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
        >
          <Image source={greenIcon} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

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
        <Image
          source={require('../../assets/gold_badge.png')}
          style={styles.badge}
        />
        <Image
          source={require('../../assets/gold_badge.png')}
          style={styles.badge}
        />
        <Image
          source={require('../../assets/gold_badge.png')}
          style={styles.badge}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="View More"
          onPress={() => navigation.navigate('Badges')}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  back: {
    fontSize: 40,
    fontWeight: '300',
  },

  profileIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },

  sideIcons: {
    position: 'absolute',
    right: 16,
    top: 200,
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

  badge: {
    justifyContent: 'center',
    flexDirection: 'row',
    resizeMode: 'contain',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#363636',
    marginTop: -20,
    paddingBottom: 20,
    paddingTop: -20,
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    top: 5,
    left: 58,
  },
  pantsOverlay: {
    position: 'absolute',
    width: 180,
    height: 180,
    resizeMode: 'contain',
    top: 200,
    left: 65,
  },
});

