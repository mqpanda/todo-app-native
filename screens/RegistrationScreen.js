// RegistrationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function RegistrationScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    // Отправьте запрос на сервер для регистрации пользователя
    try {
      const response = await fetch('http://localhost:4444/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Регистрация прошла успешно
        console.log('User registered successfully');
      } else {
        // Ошибка регистрации
        console.log('Registration failed');
      }
    } catch (error) {
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
