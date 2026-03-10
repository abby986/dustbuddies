import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { getGroupChannelId, getDmChannelId } from '../../services/messaging';

const groupChatImage = require('../../assets/images/group-chat-profile.png');
const defaultAvatar = require('../../assets/images/green-bunny-profile.png');

export default function MessagesList({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    // finds user's group ID
    const unsubUser = onSnapshot(doc(db, 'users', uid), async (userSnap) => {
      const groupId = userSnap.data()?.groupId;

      if (!groupId) {
        setLoading(false);
        return;
      }

      // gets group details 
      const groupRef = doc(db, 'groups', groupId);
      const groupSnap = await getDoc(groupRef);
      const { memberIds = [], name: groupName } = groupSnap.data();

      // finds all possible channel IDs (group & DMs)
      const otherMemberIds = memberIds.filter(id => id !== uid);
      const channelIds = [
        getGroupChannelId(groupId), 
        ...otherMemberIds.map(mId => getDmChannelId(uid, mId))
      ];

      const namesMap = await fetchMemberNames(otherMemberIds);

      // listens to every channel for new messages
      const unsubs = channelIds.map((id) => {
        return onSnapshot(doc(db, 'channels', id), (snap) => {
          if (!snap.exists()) return;
          
          const data = snap.data();
          const isGroup = id.startsWith('group_');
          
          // gets display name for row
          let displayName = groupName;
          if (!isGroup) {
            const otherId = data.participantIds?.find(p => p !== uid);
            displayName = namesMap[otherId] || 'House Member';
          }

          // updates list state
          updateConversationList(id, data, displayName, isGroup);
        });
      });

      setLoading(false);
      return () => unsubs.forEach(fn => fn());
    });

    return () => unsubUser();
  }, [uid]);


  async function fetchMemberNames(ids) {
    const names = {};
    for (const id of ids) {
      const snap = await getDoc(doc(db, 'users', id));
      names[id] = snap.data()?.firstName || 'House Member';
    }
    return names;
  }

  function updateConversationList(channelId, data, name, isGroup) {
    setConversations((prev) => {
      // ceates the new/updated item
      const newItem = {
        id: channelId,
        name: name,
        type: isGroup ? 'group' : 'dm',
        lastMessage: data.lastMessage || 'No messages yet',
        lastMessageAt: data.lastMessageAt,
      };

      // filters out the old version of the chat and adds the new one
      const filtered = prev.filter(c => c.id !== channelId);
      const newList = [...filtered, newItem];

      // sort by time (most recent first)
      return newList.sort((a, b) => {
        const timeA = a.lastMessageAt?.toMillis() || 0;
        const timeB = b.lastMessageAt?.toMillis() || 0;
        return timeB - timeA;
      });
    });
  }

  // renders chat
  if (loading) return <ActivityIndicator style={styles.centered} size="large" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.messageRow} 
            onPress={() => navigation.navigate('DirectMessage', { channelId: item.id, name: item.name })}
          >
            <Image source={item.type === 'group' ? groupChatImage : defaultAvatar} style={styles.avatar} />
            <View style={styles.messageContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.preview} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
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
    marginRight: 12,
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
