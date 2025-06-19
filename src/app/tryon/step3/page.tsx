'use client';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';

export default function Step3() {
  const router = useRouter();

  const [selectedAvatar, setSelectedAvatar] = useState('slim-female'); // example default
  const [selectedDesign, setSelectedDesign] = useState('https://your-site.com/path/to/design.png');

  const handleContinue = () => {
    router.push({
      pathname: '/TryOn',
      params: {
        avatar: selectedAvatar,
        design: selectedDesign,
      },
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Pick Avatar</Text>
      <TouchableOpacity onPress={() => setSelectedAvatar('slim-female')}>
        <Image source={require('../assets/avatars/slim-female.png')} style={{ height: 100, marginVertical: 10 }} />
      </TouchableOpacity>

      <Text style={{ fontSize: 24, marginTop: 20 }}>Pick Design</Text>
      <TouchableOpacity onPress={() => setSelectedDesign('https://your-site.com/path/to/design.png')}>
        <Image source={{ uri: 'https://your-site.com/path/to/design.png' }} style={{ height: 100, marginVertical: 10 }} />
      </TouchableOpacity>

      <Button title="Continue to Try On" onPress={handleContinue} />
    </View>
  );
}
