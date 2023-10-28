import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [token, setToken] = useState('');
  const navigation = useNavigation();

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

          const completedTasks = data
            .filter((todo) => todo.completed)
            .map((todo) => todo._id);
          setCompletedTasks(completedTasks);
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
      const response = await fetch(`http://localhost:4444/todos/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: !isTaskCompleted,
        }),
      });

      if (response.ok) {
        loadTodos();
      } else {
        setTodos(todos);
        console.error('Ошибка при обновлении ToDo');
      }
    } catch (error) {
      setTodos(todos);
      console.error('Ошибка:', error);
    }
  };

  const editTodo = (todo) => {
    navigation.navigate('EditTask', {
      taskId: todo._id,
      title: todo.title,
      description: todo.description,
    });
  };

  useEffect(() => {
    loadTodos();
    loadCompletedTasksFromStorage();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTodos();
    });
    return unsubscribe;
  }, [navigation]);

  const TaskItem = ({ task }) => (
    <View style={styles.taskContainer}>
      <View>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
      </View>

      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => editTodo(task)}>
          <MaterialIcons name="edit" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(task._id)}>
          <MaterialIcons name="delete" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCompletion(task._id)}>
          <MaterialIcons
            name={
              completedTasks.includes(task._id)
                ? 'check-box'
                : 'check-box-outline-blank'
            }
            size={24}
            color="green"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <TaskItem task={item} />}
    />
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row', // Добавляем направление "row" для размещения кнопок в ряд
    justifyContent: 'space-between', // Равномерное распределение между элементами
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 16,
    color: 'gray',
  },
  taskActions: {
    flexDirection: 'row', // Размещаем кнопки в ряд
    alignItems: 'center', // Выравнивание кнопок по центру
  },
});

export default TodoList;
