// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthorizationScreen from './screens/AuthorizationScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Авторизация">
        <Stack.Screen name="Авторизация" component={AuthorizationScreen} />
        <Stack.Screen name="Регистрация" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
