import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>New Post</Text>

        <TouchableOpacity>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="What's up..."
        value={text}
        onChangeText={setText}
        multiline
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  back: {
    fontSize: 32,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  postButton: {
    color: '#5B6FD6',
    fontWeight: 'bold',
    fontSize: "16"
  },

  input: {
    paddingHorizontal: 18,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
