import React from 'react';
import { View, Text, Button } from 'react-native';

function TodoScreen({ navigation }) {
  // В этом компоненте вы можете отобразить список задач (todo)

  return (
    <View>
      <Text>Список задач (Todo)</Text>
      {/* Добавьте здесь отображение задач и функциональность для работы с ними */}
      <Button
        title="Добавить задачу"
        onPress={() => {
          // Навигация на страницу добавления задачи (если необходимо)
          // navigation.navigate('AddTaskScreen');
        }}
      />
    </View>
  );
}

export default TodoScreen;
