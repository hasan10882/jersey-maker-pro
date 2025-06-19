import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const { width, height } = Dimensions.get('window');

const localVideos = {
  '2_boy_slim': require('../assets/videos/2_boy_slim.mp4'),
  '2_boy_medium': require('../assets/videos/2_boy_medium.mp4'),
  '2_boy_plus': require('../assets/videos/2_boy_plus.mp4'),
  '2_girl_slim': require('../assets/videos/2_girl_slim.mp4'),
  '2_girl_medium': require('../assets/videos/2_girl_medium.mp4'),
  '2_girl_plus': require('../assets/videos/2_girl_plus.mp4'),
  '10_boy_slim': require('../assets/videos/10_boy_slim.mp4'),
  '10_boy_medium': require('../assets/videos/10_boy_medium.mp4'),
  '10_boy_plus': require('../assets/videos/10_boy_plus.mp4'),
  '10_girl_slim': require('../assets/videos/10_girl_slim.mp4'),
  '10_girl_medium': require('../assets/videos/10_girl_medium.mp4'),
  '10_girl_plus': require('../assets/videos/10_girl_plus.mp4'),
  '20_boy_slim': require('../assets/videos/20_boy_slim.mp4'),
  '20_boy_medium': require('../assets/videos/20_boy_medium.mp4'),
  '20_boy_plus': require('../assets/videos/20_boy_plus.mp4'),
  '20_girl_slim': require('../assets/videos/20_girl_slim.mp4'),
  '20_girl_medium': require('../assets/videos/20_girl_medium.mp4'),
  '20_girl_plus': require('../assets/videos/20_girl_plus.mp4'),
  '40_boy_slim': require('../assets/videos/40_boy_slim.mp4'),
  '40_boy_medium': require('../assets/videos/40_boy_medium.mp4'),
  '40_boy_plus': require('../assets/videos/40_boy_plus.mp4'),
  '40_girl_slim': require('../assets/videos/40_girl_slim.mp4'),
  '40_girl_medium': require('../assets/videos/40_girl_medium.mp4'),
  '40_girl_plus': require('../assets/videos/40_girl_plus.mp4'),
};

export default function TryOn() {
  const { age, gender, bodyType, design } = useLocalSearchParams();
  const videoKey = `${age}_${gender}_${bodyType}`;
  const videoSrc = localVideos[videoKey];
  const designUrl = typeof design === 'string' ? design : '';

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [hasPaid, setHasPaid] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleFakePayment = () => {
    Alert.alert('Payment Successful', 'Download is now unlocked.');
    setHasPaid(true);
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access gallery was denied');
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}${videoKey}.mp4`;
      const localAsset = Image.resolveAssetSource(videoSrc);
      await FileSystem.copyAsync({
        from: localAsset.uri,
        to: fileUri,
      });

      await MediaLibrary.saveToLibraryAsync(fileUri);
      Alert.alert('Download Complete', 'Video saved to your gallery!');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download video.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={videoSrc}
        rate={1.0}
        volume={1.0}
        isMuted
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />

      {designUrl && (
        <Animated.Image
          source={{ uri: designUrl }}
          style={[styles.overlay, { opacity: fadeAnim }]}
        />
      )}

      {/* Watermark */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.watermark}
      />

      {/* Buttons */}
      {!hasPaid ? (
        <TouchableOpacity style={styles.payButton} onPress={handleFakePayment}>
          <Text style={styles.buttonText}>💳 Pay to Download</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownload}
          disabled={isDownloading}
        >
          <Text style={styles.buttonText}>
            {isDownloading ? 'Downloading...' : '⬇️ Download Video'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  video: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    width: width * 0.5,
    height: width * 0.5,
    position: 'absolute',
    top: height / 2 - (width * 0.25),
    left: width / 2 - (width * 0.25),
  },
  watermark: {
    position: 'absolute',
    top: 30,
    right: 20,
    width: 80,
    height: 30,
    opacity: 0.7,
    resizeMode: 'contain',
  },
  payButton: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 10,
  },
  downloadButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
