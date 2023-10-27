// RegistrationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Toast from 'react-native-toast-message';

export const showSuccessNotification = (message) => {
  Toast.show({
    type: 'success',
    position: 'top',
    text1: 'Успех',
    text2: message,
    visibilityTime: 3000,
  });
};

export const showErrorNotification = (message) => {
  Toast.show({
    type: 'error',
    position: 'top',
    text1: 'Ошибка',
    text2: message,
    visibilityTime: 3000,
  });
};

function RegistrationScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://localhost:4444/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        showSuccessNotification('Регистрация прошла успешно');
        console.log('User registered successfully');
      } else {
        showErrorNotification('Ошибка регистрации');
        console.log('Registration failed');
      }
    } catch (error) {
      showErrorNotification('Ошибка сети');
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>Регистрация</Text>
      <TextInput
        placeholder="Имя пользователя"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Зарегистрироваться" onPress={handleRegistration} />
    </View>
  );
}

export default RegistrationScreen;
