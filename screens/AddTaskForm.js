import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      // Чтение токена из AsyncStorage
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
        // Если задача успешно добавлена, вы можете обновить список задач
        // Например, путем повторного запроса к серверу и обновления состояния компонента, отображающего список задач
        console.log('Task added successfully');
        setTitle('');
        setDescription('');
      } else {
        // Выведите сообщение об ошибке
        console.log('Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить задачу</Text>
      <TextInput
        style={styles.input}
        placeholder="Название задачи"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Описание задачи"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Добавить" onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10, // Закругленные края
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddTaskForm;
