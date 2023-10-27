import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function AuthorizationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4444/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Сохраните токен и информацию о пользователе, полученные из ответа, в состоянии или хранилище
        // Пример: AsyncStorage или Context API

        // Перейдите на другую страницу после успешной авторизации
        // navigation.navigate('RegistrationScreen');
        console.log('Auth ok');
      } else {
        // Выведите сообщение об ошибке
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>Авторизация</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
}

export default AuthorizationScreen;
