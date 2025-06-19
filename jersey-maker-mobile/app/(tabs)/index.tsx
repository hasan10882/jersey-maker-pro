import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const avatars = [
  { id: '2_boy_slim', label: '2yr Boy Slim', age: '2', gender: 'boy', bodyType: 'slim', thumb: require('../../assets/avatars/2_boy_slim.png') },
  { id: '2_girl_plus', label: '2yr Girl Plus', age: '2', gender: 'girl', bodyType: 'plus', thumb: require('../../assets/avatars/2_girl_plus.png') },
  { id: '10_boy_medium', label: '10yr Boy Medium', age: '10', gender: 'boy', bodyType: 'medium', thumb: require('../../assets/avatars/10_boy_medium.png') },
  { id: '10_girl_slim', label: '10yr Girl Slim', age: '10', gender: 'girl', bodyType: 'slim', thumb: require('../../assets/avatars/10_girl_slim.png') },
  { id: '20_boy_plus', label: '20yr Man Plus', age: '20', gender: 'boy', bodyType: 'plus', thumb: require('../../assets/avatars/20_boy_plus.png') },
  { id: '20_girl_medium', label: '20yr Woman Medium', age: '20', gender: 'girl', bodyType: 'medium', thumb: require('../../assets/avatars/20_girl_medium.png') },
  { id: '40_boy_slim', label: '40yr Man Slim', age: '40', gender: 'boy', bodyType: 'slim', thumb: require('../../assets/avatars/40_boy_slim.png') },
  { id: '40_girl_plus', label: '40yr Woman Plus', age: '40', gender: 'girl', bodyType: 'plus', thumb: require('../../assets/avatars/40_girl_plus.png') },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [imageUri, setImageUri] = useState('');
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      uploadToFirebase(uri);
    }
  };

  const uploadToFirebase = async (uri: string) => {
    try {
      setUploading(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = `designs/${uuidv4()}.png`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setDownloadUrl(url);
      setUploading(false);
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload failed', 'Please try again.');
      setUploading(false);
    }
  };

  const handlePreview = () => {
    if (!selectedAvatar || !downloadUrl) {
      Alert.alert('Missing info', 'Please select avatar and upload a design.');
      return;
    }

    router.push({
      pathname: '/TryOn',
      params: {
        age: selectedAvatar.age,
        gender: selectedAvatar.gender,
        bodyType: selectedAvatar.bodyType,
        design: downloadUrl,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload Your Design</Text>

      <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
        <Text style={styles.uploadText}>Pick Image</Text>
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="large" color="blue" />}
      {imageUri !== '' && <Image source={{ uri: imageUri }} style={styles.previewImg} />}

      <Text style={styles.title}>Choose Avatar</Text>
      <View style={styles.grid}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.card,
              selectedAvatar?.id === avatar.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedAvatar(avatar)}
          >
            <Image source={avatar.thumb} style={styles.avatarThumb} />
            <Text style={styles.label}>{avatar.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.previewBtn} onPress={handlePreview}>
        <Text style={styles.previewText}>Preview Try-On</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  uploadBtn: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 6,
  },
  uploadText: { color: '#fff', fontWeight: 'bold' },
  previewImg: {
    width: 150,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#eee',
    padding: 8,
    margin: 6,
    borderRadius: 8,
    alignItems: 'center',
    width: 110,
  },
  selectedCard: {
    borderColor: 'green',
    borderWidth: 2,
  },
  avatarThumb: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
  previewBtn: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  previewText: { color: 'white', fontWeight: 'bold' },
});
