import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [message, setMessage] = useState('Chacoalhe o celular!');
  const [shakeDetected, setShakeDetected] = useState(false);

  const messages = [
    'Você é incrível!',
    'Hoje é seu dia de brilhar!',
    'Nunca desista dos seus sonhos!',
    'Você pode conquistar tudo!',
    'Sorria, o mundo precisa do seu brilho!'
  ];

  useEffect(() => {
    let subscription;
    Accelerometer.setUpdateInterval(100);

    subscription = Accelerometer.addListener(data => {
      const { x, y, z } = data;
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > 1.5) {
        setShakeDetected(true);
      }
    });

    return () => subscription && subscription.remove();
  }, []);

  useEffect(() => {
    if (shakeDetected) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMessage);
      setShakeDetected(false);
    }
  }, [shakeDetected]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Motivação na Hora!</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    color: '#555',
  },
});
