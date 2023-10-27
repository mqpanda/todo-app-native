import Toast from 'react-native-toast-message';

export const showSuccessNotification = (message) => {
  Toast.show({
    type: 'success',
    position: 'top',
    text1: 'Успех',
    text2: message,
    visibilityTime: 3000, // Время отображения уведомления (3 секунды)
  });
};

export const showErrorNotification = (message) => {
  Toast.show({
    type: 'error',
    position: 'top',
    text1: 'Ошибка',
    text2: message,
    visibilityTime: 3000,
  });
};
