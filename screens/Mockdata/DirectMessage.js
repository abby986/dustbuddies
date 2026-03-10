import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';

function formatTime(timestamp) {

  // if timestamp doesn't exist, reurn empty string
  if (!timestamp) {
    return "";
  }
  if (!timestamp.toDate) {
    return "";
  }
  // format time
  const date = timestamp.toDate();
  return date.toLocaleTimeString( [], {
    hour: "2-digit",
    minute: "2-digit"
  });
}
 

export default function DirectMessage() {
  const route = useRoute();
  
  let channelId = null;
  let name = null;
  if (route.params) {
    channelId = route.params.channelId
    name = route.params.name;
  }

  let uid = null;
  if (auth.currentUser) {
    uid = auth.currentUser.uid;
  }

  const [message, setMessage] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  // keyboard 
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvent, (e) => setKeyboardHeight(e.endCoordinates.height));
    const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // message listener
  useEffect(() => {
    if (!channelId || !uid) return;

    const messagesRef = collection(db, 'channels', channelId, 'messages');
    const q = query(
      messagesRef,
      orderBy('createdAt', 'asc'),
      limit(100)
    );
    
    // stores message object in list when doc is updated 
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          text: d.text ?? '',
          senderId: d.senderId,
          senderName: d.senderName,
          createdAt: d.createdAt,
          sender: d.senderId === uid ? 'me' : 'them',
        };
      });

      setMessages(list);
    }, (err) => {
      console.warn('DirectMessage snapshot error', err);
    });

    return () => unsub();
  }, [channelId, uid]);

  // stores message data 
  const sendMessage = async () => {
    const text = message.trim();
    
    // prevents send if error occurs
    if (text === "") {
      return;
    }
    if (!channelId) {
      return;
    }
    if (!uid) {
      return;
    }
    if (sending) {
      return;
    }
    // prevents duplicates 
    setSending(true);
    setMessage('');

    try {

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      let senderName = "Me";

      if (userSnap.exists()) {
        const userData = userSnap.data();

        if (userData.firstName) {
          senderName = userData.firstName;
        }
      }

      const messagesRef = collection(
        db,
        "channels",
        channelId,
        "messages"
      );

      // adds new message
      await addDoc(messagesRef, {
        text: text,
        senderId: uid,
        senderName: senderName,
        createdAt: serverTimestamp()
      });

      const channelRef = doc(db, "channels", channelId);

      // updates lastest message info
      await updateDoc(channelRef, {
        lastMessage: text,
        lastMessageAt: serverTimestamp()
      });

    } catch (err) {
      console.warn('Send message error', err);
      setMessage(text);
    } finally {
      setSending(false);
    }
  };
// renders messages
  const renderItem = ({ item }) => {
    // checks if message contain s image
    const isImage = item.text && item.text.includes('IMG_');

    return (
      <View
        style={[
          styles.messageBubble,
          item.sender === 'me' ? styles.myMessage : styles.theirMessage,
        ]}
      >
        {isImage ? (
          <View style={styles.imageRow}>
            <Ionicons name="image-sharp" size={18} color="#333" style={{ marginRight: 5 }} />
            <Text style={styles.messageText}>{item.text.replace(/^📄\s*/, '')}</Text>
          </View>
        ) : (
          <Text style={styles.messageText}>{item.text}</Text>
        )}
        <Text style={styles.time}>{formatTime(item.createdAt)}</Text>
      </View>
    );
  };

    // placeholder if channel is not selected
  if (!channelId) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.emptyText}>Select a conversation</Text>
      </View>
    );
  }

  // main screen; renders list of messages from firestore

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chat}
        inverted={false}
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.inputBar}>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>

        {/* text message input*/}
        <TextInput
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          editable={!sending}
        />

        {/* send button */}
        <TouchableOpacity onPress={sendMessage} disabled={sending || !message.trim()}>
          <Ionicons
            name="arrow-up-circle"
            size={28}
            color={message.trim() && !sending ? '#007AFF' : '#ccc'}
          />
        </TouchableOpacity>
      </View>

      <View style={{ height: keyboardHeight }} />
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
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  chat: {
    padding: 16,
    paddingBottom: 8,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 8,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
  },
  theirMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  time: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    fontSize: 16,
  },
});
