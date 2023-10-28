import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [token, setToken] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const navigation = useNavigation();

  // Функция для сохранения выполненных задач в AsyncStorage
  const saveCompletedTasksToStorage = async (completedTasks) => {
    try {
      await AsyncStorage.setItem(
        'completedTasks',
        JSON.stringify(completedTasks)
      );
    } catch (error) {
      console.error(
        'Ошибка при сохранении выполненных задач в AsyncStorage:',
        error
      );
    }
  };

  // Функция для загрузки выполненных задач из AsyncStorage
  const loadCompletedTasksFromStorage = async () => {
    try {
      const completedTasksData = await AsyncStorage.getItem('completedTasks');
      if (completedTasksData) {
        const completedTasks = JSON.parse(completedTasksData);
        setCompletedTasks(completedTasks);
      }
    } catch (error) {
      console.error(
        'Ошибка при загрузке выполненных задач из AsyncStorage:',
        error
      );
    }
  };

  const loadTodos = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      try {
        const response = await fetch('http://localhost:4444/todos', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          console.error('Ошибка при получении данных о ToDo');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:4444/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        loadTodos();
      } else {
        console.error('Ошибка при удалении ToDo');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const toggleCompletion = async (taskId) => {
    const isTaskCompleted = completedTasks.includes(taskId);
    let updatedTasks = [...completedTasks];

    if (isTaskCompleted) {
      updatedTasks = updatedTasks.filter((id) => id !== taskId);
    } else {
      updatedTasks.push(taskId);
    }

    setCompletedTasks(updatedTasks);

    const updatedTodos = todos.map((todo) => {
      if (todo._id === taskId) {
        return {
          ...todo,
          completed: !isTaskCompleted,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);

    try {
      await AsyncStorage.setItem(
        'completedTasks',
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      console.error('Ошибка при сохранении выполненных задач:', error);
    }
  };

  const editTodo = (todo) => {
    setEditingTodo(todo);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  const updateTodo = async () => {
    try {
      const response = await fetch(
        `http://localhost:4444/todos/${editingTodo._id}`,
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
        loadTodos();
        setEditingTodo(null);
        setEditedTitle('');
        setEditedDescription('');
      } else {
        console.error('Ошибка при обновлении ToDo');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  useEffect(() => {
    loadTodos();
    loadCompletedTasksFromStorage(); // Загрузка выполненных задач из AsyncStorage
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTodos();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {editingTodo && editingTodo._id === item._id ? (
              <View style={styles.editContainer}>
                <TextInput
                  placeholder="Название задачи"
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                  style={styles.editInput}
                />
                <TextInput
                  placeholder="Описание задачи"
                  value={editedDescription}
                  onChangeText={setEditedDescription}
                  style={styles.editInput}
                />
                <Button title="Сохранить" onPress={updateTodo} />
                <Button title="Отмена" onPress={cancelEdit} />
              </View>
            ) : (
              <View style={styles.todoTextContainer}>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Text style={styles.todoDescription}>{item.description}</Text>
              </View>
            )}
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => deleteTodo(item._id)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editTodo(item)}>
                <MaterialIcons name="edit" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleCompletion(item._id)}>
                <MaterialIcons
                  name={
                    completedTasks.includes(item._id)
                      ? 'check-box'
                      : 'check-box-outline-blank'
                  }
                  size={24}
                  color="green"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoDescription: {
    fontSize: 16,
    color: '#555',
  },
  editContainer: {
    flex: 1,
  },
  editInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TodoList;
