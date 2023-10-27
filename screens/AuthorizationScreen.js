import React from 'react';
import { View, Text, Button } from 'react-native';

function AuthorizationScreen({ navigation }) {
  return (
    <View>
      <Text>Экран Авторизации</Text>
      <Button
        title="Перейти к Регистрации"
        onPress={() => navigation.navigate('Регистрация')}
      />
    </View>
  );
}

export default AuthorizationScreen;
