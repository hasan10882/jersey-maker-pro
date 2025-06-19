'use client';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button, Image, Pressable, ScrollView } from 'react-native';

const avatars = [
  { id: 'slim-female', label: 'Slim Female', src: require('../../../jersey-maker-mobile/assets/avatars/slim-female.png') },
  { id: 'plus-female', label: 'Plus Female', src: require('../../../jersey-maker-mobile/assets/avatars/plus-female.png') },
  { id: 'slim', label: 'Slim Male', src: require('../../../jersey-maker-mobile/assets/avatars/slim.png') },
  { id: 'athletic', label: 'Athletic Male', src: require('../../../jersey-maker-mobile/assets/avatars/athletic.png') },
];

export default function OrderPage() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);

  const handleContinue = () => {
    router.push({
      pathname: '/TryOn',
      params: {
        avatar: selectedAvatar,
        design: 'react-logo', // must match filename (no extension)
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>Select Your Avatar</Text>
      {avatars.map((avatar) => (
        <Pressable
          key={avatar.id}
          style={{
            marginVertical: 10,
            borderWidth: selectedAvatar === avatar.id ? 2 : 0,
            borderColor: 'blue',
            padding: 5,
          }}
          onPress={() => setSelectedAvatar(avatar.id)}
        >
          <Image source={avatar.src} style={{ width: 120, height: 120 }} />
          <Text style={{ textAlign: 'center' }}>{avatar.label}</Text>
        </Pressable>
      ))}
      <Button title="Continue to TryOn" onPress={handleContinue} />
    </ScrollView>
  );
}
