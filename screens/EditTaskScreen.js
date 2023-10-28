import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EditTaskScreen({ route, navigation }) {
  const { taskId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const loadTask = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://localhost:4444/todos/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
        } else {
          console.error('Failed to load task');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadTask();
  }, [taskId]);

  const handleUpdateTask = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://localhost:4444/todos/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        console.log('Task updated successfully');
        // Вернуться на предыдущий экран (TodoScreen) после успешного обновления задачи
        navigation.goBack();
      } else {
        console.log('Failed to update task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>Изменить задачу</Text>
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
      <Button title="Обновить" onPress={handleUpdateTask} />
    </View>
  );
}

export default EditTaskScreen;
