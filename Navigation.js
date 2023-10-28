import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthorizationScreen from './screens/AuthorizationScreen'; // Импорт из папки screens
import TodoScreen from './screens/TodoScreen'; // Импорт из папки screens
import AddTaskScreen from './screens/AddTaskScreen'; // Импорт из папки screens

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Авторизация">
        <Stack.Screen name="Авторизация" component={AuthorizationScreen} />
        <Stack.Screen name="TodoScreen" component={TodoScreen} />
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
