const getCurrentWorkout = async () => {
  try {
      const response = await fetch('/save-workout/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Ошибка при получении номера тренировки');
      }

      const data = await response.json();
      return data.success ? data.workout_id : null;
  } catch (error) {
      console.error('Ошибка:', error);
      return null;
  }
};

const getData = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8000/json-receive/');
      if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
      }
      return await response.json();
  } catch (error) {
      console.error(error.message);
      throw new Error('Не удалось загрузить данные. Попробуйте обновить страницу');
  }
};

const getUserTraining = async (id) => {
  try {
      const data = await getData();
      let neededData;
      Array.from(data).forEach(element => {
        if (element.id === id){
          neededData = element
        }
      });
      const training = JSON.parse(neededData.json_data);

      // Проверяем, существует ли тренировка с заданным ID
      // console.log(training, id);
      return training || null;
  } catch (error) {
      console.error(error.message);
      return null;
  }
};

const getUserTrainingData = async () => {
  const WORKOUT_ID = await getCurrentWorkout();
  console.log(WORKOUT_ID);
  if (WORKOUT_ID) {
      const training = await getUserTraining(WORKOUT_ID);
      if (training) {
          return training; // Возвращаем данные тренировки, если они существуют
      }
  }
  return false; // Если номер тренировки не получен или тренировка не найдена
};

// Пример вызова:
const userTraining = await getUserTrainingData();

function getCSRFToken() {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}

const deleteWorkout = async () => {
  try {
      const response = await fetch('/save-workout/', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCSRFToken() // Убедитесь, что передаете токен CSRF
          },
      });

      const data = await response.json();

      if (data.success) {
          console.log('Тренировка успешно удалена:', data.message);
      } else {
          console.error('Ошибка:', data.message);
      }
  } catch (error) {
      console.error('Ошибка:', error);
  }
};

export { userTraining, deleteWorkout };

