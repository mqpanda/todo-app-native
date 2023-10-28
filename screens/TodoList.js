import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Импорт хука useNavigation

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState('');
  const navigation = useNavigation(); // Использование хука useNavigation для доступа к объекту navigation

  const loadTodos = async () => {
    // Здесь вы читаете токен из AsyncStorage
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      // Выполняйте запрос к серверу с использованием токена для аутентификации
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

  useEffect(() => {
    // Вызов функции загрузки данных при монтировании компонента
    loadTodos();
  }, []);

  // Вызов функции загрузки данных при каждом входе на страницу
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
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default TodoList;
