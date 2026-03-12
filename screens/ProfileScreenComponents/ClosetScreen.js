//Ecnountered an error when pushing changes to Github. Clause Code pushed changes when troubleshooting without allowing to manually create a branch.
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import greenIcon from '../../assets/images/green-bunny-profile.png';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const itemSources = {
  vest: require('../../assets/rabbit-blue-vest.png'),
  pink_skirt: require('../../assets/rabbit-pink-skirt.png'),
  red_bow: require('../../assets/rabbit-bow.png'),
};

export default function ClosetScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Shirts');
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [selectedHat, setSelectedHat] = useState(null);
  const [selectedPants, setSelectedPants] = useState(null);

  useEffect(() => {
    const loadOutfit = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setSelectedShirt(data.outfit?.shirt || null);
        setSelectedHat(data.outfit?.hat || null);
        setSelectedPants(data.outfit?.pants || null);
      }
    };
    loadOutfit();
  }, []);

  const saveOutfit = async (shirt, hat, pants) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    await updateDoc(doc(db, 'users', uid), {
      outfit: { shirt, hat, pants }
    });
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}
          activeOpacity={0.7}
        >
          <Image source={greenIcon} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bunnyWrapper}>
        <Image source={require('../../assets/rabbit_final_copy_3.png')} style={styles.bunnyImage} />
        {selectedShirt && (
          <Image source={itemSources[selectedShirt]} style={styles.clothingOverlay} />
        )}
        {selectedHat && (
          <Image source={itemSources[selectedHat]} style={styles.hatOverlay} />
        )}
        {selectedPants && (
          <Image source={itemSources[selectedPants]} style={styles.pantsOverlay} />
        )}
      </View>


      <View style={styles.tabBar}>
        {['Shirts', 'Hats', 'Pants'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.tabButtonActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}

      </View>
      <View style={styles.badgeContainer}>
        {selectedTab === 'Shirts' && (
          <>
            <TouchableOpacity onPress={() => { setSelectedShirt('vest'); saveOutfit('vest', selectedHat, selectedPants); }}>
              <Image source={itemSources.vest} style={styles.badgeImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectedShirt('pink_skirt'); saveOutfit('pink_skirt', selectedHat, selectedPants); }}>
              <Image source={itemSources.pink_skirt} style={styles.badgeImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectedShirt('red_bow'); saveOutfit('red_bow', selectedHat, selectedPants); }}>
              <Image source={itemSources.red_bow} style={styles.badgeImage} />
            </TouchableOpacity>
          </>
        )}
        {selectedTab === 'Hats' && (
          <>
            {/* add hat TouchableOpacity items here */}
          </>
        )}
        {selectedTab === 'Pants' && (
          <>
            {/* add pants TouchableOpacity items here */}
          </>
        )}
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
    marginTop: 50,
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
    top: 100,
    justifyContent: 'space-between',
    height: 120,
  },

  bunnyWrapper: {
    width: 350,
    height: 350,
    position: 'relative',
  },
  bunnyImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  clothingOverlay: {
    position: 'absolute',
    width: 250,
    height: 250,
    resizeMode: 'contain',
    top: 122,
    left: 52,
  },
  hatOverlay: {
    position: 'absolute',
    width: 180,
    height: 180,
    resizeMode: 'contain',
    top: 10,
    left: 85,
  },

  pantsOverlay: {
    position: 'absolute',
    width: 200,
    height: 200,
    resizeMode: 'contain',
    top: 200,
    left: 75,
  },

  badgeContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: '#7B98C7',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  badgeImage: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginHorizontal: 8,
  },

  tabBar: {
    flexDirection: 'row',
    width: '90%',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    backgroundColor: '#7B98C7',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#ffff',
    fontWeight: 'bold',
  },


});

