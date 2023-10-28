import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthorizationScreen from './screens/AuthorizationScreen'; // Импорт из папки screens
import TodoScreen from './screens/TodoScreen'; // Импорт из папки screens
import AddTaskScreen from './screens/AddTaskScreen'; // Импорт из папки screens
import RegistrationScreen from './screens/RegistrationScreen';
import EditTaskScreen from './screens/EditTaskScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authorization">
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Authorization" component={AuthorizationScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
