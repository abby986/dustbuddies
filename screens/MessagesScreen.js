import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { messages } from '../Mockdata/messages';

export default function MessagesScreen() {

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.messageRow}>
      <View style={[styles.avatar, { backgroundColor: item.color }]}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>

      <View style={styles.messageContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.preview}>{item.lastMessage}</Text>
      </View>

      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* left/right button space */}
      <View style={styles.buttonWrapper}>

        {/*Edit Button */}
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        {/*Create Message Button */}
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create Message</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  // individual box for each button
  buttonContainer: {
    backgroundColor: '#F2D16B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  preview: {
    color: '#888',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
});