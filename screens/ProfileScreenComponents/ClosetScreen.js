import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ClosetScreen({ navigation }) {
  const [text, setText] = useState('');

  return (
      <View style={styles.container}>
        <View style={styles.header}>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.back}>‹</Text>
            </TouchableOpacity>

            <View style={styles.actionRow}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                activeOpacity={0.7}
                >
                <Ionicons name="person-circle-outline" size={48} color="#A1B869" />
                </TouchableOpacity>

            </View>

        </View>

        <View>
            <Image
                source={require('../../assets/rabbit_final_copy_3.png')}
                style={styles.bunnyImage}
            />
        </View>

        <View style={styles.badgeContainer}>
            <Image source={require('../../assets/jersey.png')} style={styles.badgeImage} />
            <Image source={require('../../assets/blue_shirt.png')} style={styles.badgeImage} />
            <Image source={require('../../assets/green_shirt.png')} style={styles.badgeImage} />
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
      height: 180,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      backgroundColor: '#fff',
    },
  
    back: {
      fontSize: 42,
    },
  
    sideIcons: {
      position: 'absolute', 
      right: 16,
      top: 100, 
      justifyContent: 'space-between',
      height: 120, 
    },
  
    bunnyImage: {
      width: 350, 
      height: 350,
      marginVertical: 12,
      resizeMode: 'contain',
    },

    badgeContainer: {
        flex: 1, 
        width: '90%', 
        backgroundColor: '#7B98C7',
        borderRadius: 24,
        paddingVertical: 24, 
        paddingHorizontal: 24, 
        flexDirection: 'row',
        alignItems: 'top',
        justifyContent: 'center', 
        marginBottom: 16, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

    badgeImage: {
        backgroundColor:'#fff',
        borderRadius: 8,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginHorizontal: 8, 
    },


  });
  
  