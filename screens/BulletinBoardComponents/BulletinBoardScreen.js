import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
//new imports for firebase
import { db, auth } from '../../firebase';
import { collection, onSnapshot, orderBy, query, doc, updateDoc, increment, arrayUnion, where, deleteDoc } from 'firebase/firestore';


export default function BulletinBoardScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(null); // postId when picking emoji
  const [commentingOn, setCommentingOn] = useState(null);
  const [commentText, setCommentText] = useState('');

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("expiresAt", ">", new Date()),
      orderBy("expiresAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(list);
    });

    return unsubscribe;
  }, []);

  const handleReaction = async (postId, emoji) => {
    const postRef = doc(db, "posts", postId);

    await updateDoc(postRef, {
      [`reactions.${emoji}`]: increment(1)
    });
  };

  const handleAddComment = async (postId) => {
    if (!commentText.trim()) return;

    const postRef = doc(db, "posts", postId);

    await updateDoc(postRef, {
      comments: arrayUnion({
        text: commentText,
        createdAt: new Date(),
        user: "Anonymous",
      }),
    });

    setCommentText('');
    setCommentingOn(null);
  };

  //user can delete post only if it belongs to them
  const handleDeletePost = async (postId, postUserId) => {
    if (postUserId !== userId) return; // safety check
    await deleteDoc(doc(db, "posts", postId));
  };


  return (
    <View style={styles.container}>
      {/*create post button*/}
      <View style={styles.actionRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatePost')}
          activeOpacity={0.7}
        >
          <Ionicons name="create" size={32} color="#A1B869" />
        </TouchableOpacity>
      </View>

      {/* bulletin feed */}
      <ScrollView contentContainerStyle={styles.feed}>
        {posts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Be the first to create a post!</Text>
          </View>
          ) : (
          posts.map(post => (
          <View key={post.id} style={styles.card}>

            {/* delete button */}
            {post.userId === userId && (
              <TouchableOpacity
                onPress={() => handleDeletePost(post.id, post.userId)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-outline" size={22} color="#db6262" />
              </TouchableOpacity>
            )}

            <View style={styles.cardHeader}>
              <View style={styles.avatar} />
              <Text style={styles.username}>{post.user || "Anonymous"}:</Text>
            </View>

            <Text style={styles.postText}>{post.text}</Text>

            {post.imageUrl && (
              <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            )}

            {/* Reactions */}
            <View style={styles.reactionRow}>
              {/* reactions on left */}
              <View style={styles.reactionLeft}>
                {Object.entries(post.reactions || {}).map(([emoji, count]) => (
                  <TouchableOpacity
                    key={emoji}
                    onPress={() => handleReaction(post.id, emoji)}
                  >
                    <Text style={styles.reactionText}>{emoji} {count}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* action column, comments on right */}
              <View style={styles.actionColumn}>
                {/* emoji picker toggle */}
                <TouchableOpacity
                  onPress={() =>
                    setPickerOpen(prev => (prev === post.id ? null : post.id))
                  }
                >
                  <Text style={styles.addReaction}>➕</Text>
                </TouchableOpacity>

                {/* comment toggle */}
                <TouchableOpacity
                  onPress={() =>
                    setCommentingOn(prev => (prev === post.id ? null : post.id))
                  }
                >
                  <Ionicons name="chatbubbles-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View> 

            {/* hidden emoji input */}
            {pickerOpen === post.id && (
              <View style={styles.emojiPicker}>
                {['👍', '❤️', '😂', '‼️', '😢'].map(emoji => (
                  <TouchableOpacity
                    key={emoji}
                    onPress={() => {
                      handleReaction(post.id, emoji);
                      setPickerOpen(null); // closes after selection
                    }}
                  >
                    <Text style={styles.emojiOption}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* comment input */}
            {commentingOn === post.id && (
              <View style={{ marginTop: 10 }}>
                <TextInput
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  style={{
                    backgroundColor: '#eee',
                    padding: 8,
                    borderRadius: 8,
                    marginBottom: 6,
                  }}
                />

                <TouchableOpacity
                  onPress={() => handleAddComment(post.id)}
                  style={{
                    backgroundColor: '#A1B869',
                    padding: 8,
                    borderRadius: 8,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Post</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* comment list */}
            {post.comments && post.comments.length > 0 && (
              <View style={styles.commentList}>
                {post.comments.map((c, index) => (
                  <View key={index} style={styles.commentItem}>
                    <Text style={styles.commentUser}>{c.user}:</Text>
                    <Text>{c.text}</Text>
                  </View>
                ))}
              </View>
            )}


            <Text style={styles.timestamp}>
              {post.createdAt?.toDate().toLocaleString() || "Just now"}
            </Text>
          </View>
        )))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#efefef',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    position: 'relative',
  },

  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
  },


  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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

  reactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    marginTop: 8,
  },


  reactionLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
  },


  reactionText: {
    marginRight: 12,
    fontSize: 16
  },

  actionColumn: {
    alignItems: 'flex-end',
    gap: 6,
  },

  addReaction: {
    fontSize: 22,
  },

  commentBubble: {
    fontSize: 22,
    marginTop: 8,
  },

  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 15,
    alignSelf: 'flex-end'
  },

  commentList: {
    marginTop: 16,
  },

  emptyState: {
  alignItems: 'center',
  marginTop: 80,
  gap: 12,
},

emptyText: {
  fontSize: 16,
  color: '#aaa',
  fontStyle: 'italic',
},

emojiPicker: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#fff',
  borderRadius: 12,
  paddingVertical: 8,
  paddingHorizontal: 4,
  marginTop: 8,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
},
emojiOption: {
  fontSize: 26,
},

});

