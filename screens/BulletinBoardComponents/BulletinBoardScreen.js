import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import greenIcon from '../../assets/images/green-bunny-profile.png';

export default function BulletinBoardScreen({ navigation }) {
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

     <View style={styles.actionRow}>
      <TouchableOpacity
      onPress={() => navigation.navigate('CreatePost')}
      activeOpacity={0.7}
      >
        <Ionicons name="create" size={32} color="#A1B869" />
      </TouchableOpacity>
    </View>

      <ScrollView contentContainerStyle={styles.feed}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatar} />
            <Text style={styles.username}>Anonymous:</Text>
          </View>

          <Text style={styles.postText}>
            Who thinks we should move the litter box?
          </Text>

          <Image
            source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/f/f7/Japanese_litter_box.jpg' }}
            style={styles.postImage}
          />

          <View style={styles.reactionIcons}>
            <Text>👍 2</Text>
            <Text>👎 1</Text>
            <Text>💬</Text>
          </View>

          <Text style={styles.timestamp}>Sent 10/22/25</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatar} />
            <Text style={styles.username}>Chase:</Text>
          </View>

          <Text style={styles.postText}>
            I just wanted to let you know that a few friends are coming over tomorrow afternoon.
          </Text>

          <View style={styles.reactionIcons}>
            <Text>💬</Text>
          </View>

          <Text style={styles.timestamp}>Sent 10/19/25</Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
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

   actionButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#E8C854',
  },

  actionRow: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 16,
    marginVertical: 12,
  },

  feed: {
    paddingBottom: 100,
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

  profileIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#556DC2',
    marginRight: 8,
  },

  username: {
    fontWeight: 'bold',
  },

  postText: {
    marginVertical: 8,
    fontSize: 15,
  },

  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginVertical: 8,
  },

  reactionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  
});
