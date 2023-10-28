import React from 'react';
import { View, Text, Button } from 'react-native';
import TodoList from './TodoList';

function TodoScreen({ navigation }) {
  return (
    <View>
      <TodoList />
      <Button
        title="Добавить задачу"
        onPress={() => {
          // Навигация на страницу добавления задачи (AddTaskScreen)
          navigation.navigate('AddTaskScreen');
        }}
      />
    </View>
  );
}

export default TodoScreen;
