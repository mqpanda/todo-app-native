import React from 'react';
import { View, Text, Button } from 'react-native';
import TodoList from './TodoList';

function TodoScreen({ navigation }) {
  return (
    <View>
      <TodoList />
      <Button
        title="Add todo"
        onPress={() => {
          // Навигация на страницу добавления задачи (AddTaskScreen)
          navigation.navigate('Add todo');
        }}
      />
    </View>
  );
}

export default TodoScreen;
