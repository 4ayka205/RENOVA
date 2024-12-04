document.addEventListener("DOMContentLoaded", () => {
    // Все кнопки-заголовки фильтров
    const filterHeaders = document.querySelectorAll(".filters__header");
    // Все группы фильтров
    const filterGroups = document.querySelectorAll(".filters__group");
  
    // Функция для скрытия всех групп фильтров
    const hideAllFilters = () => {
      filterGroups.forEach(group => group.classList.remove("active"));
      // Возвращаем стрелки в исходное состояние
      filterHeaders.forEach(header => {
        const arrow = header.querySelector('img');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      });
    };
  
    // Обработчик для кнопок заголовков
    filterHeaders.forEach(header => {
      header.addEventListener("click", () => {
        const targetId = header.dataset.target; // Получаем ID целевого блока
        const targetGroup = document.getElementById(targetId);
        const arrow = header.querySelector('img'); // Стрелка
  
        // Если группа уже открыта, закрываем её
        if (targetGroup.classList.contains("active")) {
          targetGroup.classList.remove("active");
          if (arrow) arrow.style.transform = 'rotate(0deg)'; // Возврат стрелки
        } else {
          // Закрываем все группы, если нажали на другой заголовок
          hideAllFilters();
          // Показываем выбранную группу
          targetGroup.classList.add("active");
          if (arrow) arrow.style.transform = 'rotate(180deg)'; // Поворот стрелки
        }
      });
    });
  
    // Скрытие фильтров при клике вне области
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".filters")) {
        hideAllFilters();
      }
    });
  });