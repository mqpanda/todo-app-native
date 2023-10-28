import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

function EditTaskScreen() {
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    // Получите данные о задаче, которую пользователь хочет отредактировать
    const { taskId, title, description } = route.params;
    setEditedTitle(title);
    setEditedDescription(description);
  }, [route.params]);

  const handleUpdateTask = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        `http://localhost:4444/todos/${route.params.taskId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editedTitle,
            description: editedDescription,
          }),
        }
      );

      if (response.ok) {
        console.log('Task updated successfully');
        // После успешного обновления задачи вернитесь на экран с задачами (TodoList)
        navigation.goBack();
      } else {
        console.log('Failed to update task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Редактировать задачу</Text>
      <TextInput
        style={styles.input}
        placeholder="Название задачи"
        value={editedTitle}
        onChangeText={setEditedTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Описание задачи"
        value={editedDescription}
        onChangeText={setEditedDescription}
      />
      <Button title="Сохранить" onPress={handleUpdateTask} />
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
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EditTaskScreen;
