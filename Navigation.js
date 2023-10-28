import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TodoScreen from './screens/TodoScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import AuthorizationScreen from './screens/AuthorizationScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign in">
        <Stack.Screen name="Sign up" component={RegistrationScreen} />
        <Stack.Screen name="Sign in" component={AuthorizationScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
        <Stack.Screen name="Add todo" component={AddTaskScreen} />
        <Stack.Screen name="Edit todo" component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
