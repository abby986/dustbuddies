import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { db, auth } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function SubmitTask({ task, onSubmit, onBack }) {
  
  async function openCamera() {

     console.log("CAMERA BUTTON PRESSED");

  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (permission.status !== "granted") {
    alert("Camera permission required");
    return;
}
  
  const result = await ImagePicker.launchCameraAsync({
    quality: 0.5,
    allowsEditing: false,
    base64: true
  });

  if (result.canceled) return;

  const base64Image = `data:image/jpg;base64,${result.assets[0].base64}`;

  try {

    const taskRef = doc(db, "tasks", task.id);

    await updateDoc(taskRef, {
      photoURL: base64Image,
      status: "pending",
      completedBy: auth.currentUser.uid
    });

    onSubmit();

  } catch (err) {

    console.log("Firestore upload error:", err);
    alert("Failed to upload photo");
    }
}

  return (
    <View style={styles.container}>

      {/* placeholder box */}
      <View style={styles.placeholderContainer}>

        {/* close button */}
        <TouchableOpacity style={styles.closeIcon} onPress={onBack}>
          <Octicons name="x-circle-fill" size={28} color="#e8c854" />
        </TouchableOpacity>

        <Text style={styles.placeholderText}>Photo Placeholder</Text>

      </View>

      {/* submit button now opens camera */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={openCamera}
      >
        <Text style={styles.submitText}>Take Photo</Text>
      </TouchableOpacity>

    </View>
  );
}


// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  placeholderContainer: {
    width: '80%',
    height: 450,
    backgroundColor: '#f0f0f0',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 30,
  },

  placeholderText: {
    fontSize: 18,
    color: '#555',
  },

  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  submitButton: {
    backgroundColor: '#556dc2',
    paddingVertical: 12,
    paddingHorizontal: 115,
    borderRadius: 28,
  },

  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
