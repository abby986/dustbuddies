import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.back}>‹</Text>
              </TouchableOpacity>
        </View>

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

        <Image
          source={require('../../assets/rabbit_final_copy_3.png')}
          style={styles.bunnyImage}
        />

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
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#fff',
  },

  back: {
    fontSize: 38,
  },

  sideIcons: {
    position: 'absolute', 
    right: 16,
    top: 100, 
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
});

