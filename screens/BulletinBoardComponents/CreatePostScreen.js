console.log("CREATE POST SCREEN LOADED");
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
//new imports for firebase
// import * as ImagePicker from 'expo-image-picker'; I cant get this to work
//going to pivot and use document picker instead for now
import * as DocumentPicker from 'expo-document-picker';
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


//allow users to post image, set reaction, leave comment
export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  /*useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access photos is required!');
      }
    })();
  }, []);*/

  /*const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Image],
      allowsEditing: true,
      quality: 0.8,

    });
    console.log("PICKER RESULT:", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };*/

  const pickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: true,
    });



    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    try {
      console.log("handle post working");

      // no empty posts
      if (!text.trim()) {
        console.log("no empty post");
        return;
      }

      console.log("post is saving to database");

      // save the post
      const docRef = await addDoc(collection(db, "posts"), {
        text: text,
        imageUrl: null,           // remove image for now
        createdAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        user: "Anonymous",
        reactions: {},
        comments: []
      });

      console.log("POST SAVED — ID:", docRef.id);

      // reset input fields
      setText('');
      setImage(null);

      // navigate back to bulletinboard
      console.log("back to bulletin success");
      navigation.goBack();

    } catch (err) {
      console.log("POST ERROR:", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>New Post</Text>

        <TouchableOpacity onPress={handlePost}>
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

      <TouchableOpacity
        onPress={() => {
          console.log("button successful");
          pickImage();
        }}
        style={styles.addImageButton}
      >
        <Text style={styles.addImageText}>Add Image</Text>
      </TouchableOpacity>


      {image && (
        <Image source={{ uri: image }} style={styles.previewImage} />
      )}

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
    fontSize: 16
  },

  input: {
    paddingHorizontal: 18,
    fontSize: 16,
    textAlignVertical: 'top',
  },

  addImageButton: {
    backgroundColor: '#E8C854',
    padding: 12,
    borderRadius: 12,
    margin: 20,
    alignItems: 'center',
  },
  addImageText: { fontWeight: 'bold' },
  previewImage: {
    width: '90%',
    height: 200,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 10,
  },

});
