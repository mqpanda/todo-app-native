import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch('http://localhost:4444/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        console.log('Task added successfully');
        setTitle('');
        setDescription('');
        // Вернуться на предыдущий экран (TodoScreen) после успешного добавления задачи
        navigation.goBack();
      } else {
        console.log('Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>Добавить задачу</Text>
      <TextInput
        placeholder="Название задачи"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Описание задачи"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Добавить" onPress={handleAddTask} />
    </View>
  );
}

export default AddTaskScreen;
