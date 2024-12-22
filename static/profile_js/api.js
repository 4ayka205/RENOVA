const getData = () => 
  fetch('http://127.0.0.1:8000/json-receive/')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error('Не удалось загрузить данные. Попробуйте обновить страницу');
    });

const getUserTraining = (id = 2) => { //типа айди тренировки, когда их будет больше, нужно будет делать проверку.
  return getData()
          .then((data) => {
            return JSON.parse(data[0].json_data);
          })
          .catch((error) => console.error(error.message));
  
};

const userTraining = await getUserTraining();

export {userTraining};

