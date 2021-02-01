export const errorsAuth = [
  { value: 'auth/invalid-email', name: 'Вы ввели неверную почту' },
  { value: 'auth/internal-error', name: 'Внутренняя ошибка' },
  { value: 'auth/invalid-password', name: 'Вы ввели неверный пароль' },
  { value: 'auth/email-already-exists', name: 'Эта почта уже используется' },
  { value: 'auth/invalid-credential', name: 'Неверные учетные данные' },
  { value: 'auth/operation-not-allowed', name: 'Операция не разрешена' },
  { value: 'auth/email-already-exists', name: 'Учетные данные уже используются' },
  { value: 'auth/email-already-in-use', name: 'Пользователь с такой почтой уже существует' },
  { value: 'auth/weak-password', name: 'Пароль должен содержать не менее 6 знаков' },
  { value: 'auth/wrong-password', name: 'Пароль неверный или пользователь не имеет пароля' },
  {
    value: 'auth/too-many-requests',
    name:
      'Доступ к этой учетной записи был временно отключен из-за множества неудачных попыток входа в систему. Вы можете немедленно восстановить его, сбросив пароль, или можете повторить попытку позже.',
  },
  { value: ' auth/user-not-found', name: 'Данный пользователь не существует' },
];
export const getErrors = (value) => {
  const error = errorsAuth.find((x) => x.value === value);
  if (error) {
    return error.name;
  }
  return null;
};
