$(document).ready(function() {

  $("#carousel-1").owlCarousel({
    items: 5,
    loop:true, //Зацикливаем слайдер
    dots: 5,
    dotsEach: true,
    margin: 30, //Отступ от картино если выводите больше 1
    nav:false, //Отключил навигацию
    autoplay:false, //Автозапуск слайдера
    smartSpeed:2000, //Время движения слайда
    autoplayTimeout:7000, //Время смены слайда
    responsive:{ //Адаптация в зависимости от разрешения экрана
        0:{
            items:1.2
        },
        556:{
            items:1.2
        },
        700:{
            items:1.2
        },
        1040:{
            items:1.2
        }
      }
  });

  $("#carousel-2").owlCarousel({
    items: 4,
    loop:true, //Зацикливаем слайдер
    dots: 4,
    dotsEach: true,
    margin: 30, //Отступ от картино если выводите больше 1
    nav:false, //Отключил навигацию
    autoplay:true, //Автозапуск слайдера
    smartSpeed:2000, //Время движения слайда
    autoplayTimeout:7000, //Время смены слайда
    responsive:{ //Адаптация в зависимости от разрешения экрана
        0:{
            items:1.2
        },
        556:{
            items:1.8
        },
        700:{
            items:2.2
        },
        1040:{
            items:3
        }
      }
  });


  $("#carousel-3").owlCarousel({
    items: 4,
    loop:true, //Зацикливаем слайдер
    dots: 4,
    dotsEach: true,
    margin: 30, //Отступ от картино если выводите больше 1
    nav:false, //Отключил навигацию
    autoplay:true, //Автозапуск слайдера
    smartSpeed:2000, //Время движения слайда
    autoplayTimeout:7000, //Время смены слайда
    responsive:{ //Адаптация в зависимости от разрешения экрана
        0:{
            items:1.2
        },
        556:{
            items:1.8
        }
      }
  });

});

function burgerMenu(selector) {
  let menu = $(selector);
  let button = menu.find('.burger-menu_button', '.burger-menu_lines');
  let links = menu.find('.burger-menu_link');
  let overlay = menu.find('.burger-menu_overlay');

  button.on('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  links.on('click', () => toggleMenu());
  overlay.on('click', () => toggleMenu());

  function toggleMenu(){
    menu.toggleClass('burger-menu_active');

    if (menu.hasClass('burger-menu_active')) {
      $('body').css('overlow', 'hidden');
    } else {
      $('body').css('overlow', 'visible');
    }
  }
}

burgerMenu('.burger-menu');

// Перебираем каждый элемент шапки
document.querySelectorAll('.js-faq-trigger').forEach(function(trigger) {
  // Получаем родителя, элемент аккордеона
  var parent = trigger.closest('.js-faq');

  // клик по шапке
  trigger.addEventListener('click', function(e) {

      // если при клике у него уже есть активный класс
      if (parent.classList.contains('is-active')) {
          // то мы его удаляем
          parent.classList.remove('is-active');
      }
      // если при клике мы не нашли у элемента активный класс
      else {
          // удаляем у всех элементов активный класс
          document.querySelectorAll('.js-faq').forEach(function(item) {
              item.classList.remove('is-active');
          });
          // добавляем класс тому элементу, по которому кликнули
          parent.classList.add('is-active');
      }
  })
});



document.addEventListener('DOMContentLoaded', function () {
  // Находим все ссылки, которые должны открывать модальное окно
  const links = document.querySelectorAll('.services__grid__item__line__link', '.footer__services__column__list__item__link');
  const linksMenu = document.querySelectorAll('.footer__services__column__list__item__link');
  // Находим модальное окно и его элементы для заголовка и текста
  const modal = document.getElementById('myModal');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');

  const modal1 = document.getElementById('modal-1');
  const modal2 = document.getElementById('modal-2');
  const modal3 = document.getElementById('modal-3');
  const modal4 = document.getElementById('modal-4');

  const link1 = document.getElementById('dentists-link-1');
  const link2 = document.getElementById('dentists-link-2');
  const link3 = document.getElementById('dentists-link-3');
  const link4 = document.getElementById('dentists-link-4');

  // Находим элемент для закрытия модального окна
  const closeModal = document.querySelector('.close');
  const closeButtons = document.querySelectorAll('.close');

  // Функция для открытия модального окна с уникальным заголовком и текстом
  function openModal(event) {
    event.preventDefault();
    const title = this.getAttribute('data-title');
    const text = this.getAttribute('data-text');

    modalTitle.textContent = title;
    modalText.innerHTML = text; // Используем innerHTML для поддержки форматирования
    modal.style.display = 'block';
  }


  // Добавляем обработчик событий на каждую ссылку
  linksMenu.forEach(link => {
    link.addEventListener('click', openModal);
  });

  links.forEach(link => {
    link.addEventListener('click', openModal);
  });

  link1.addEventListener('click', e => {
    if (modal1.style.display != 'block') {
      modal1.style.display = 'block'
    } else {
      modal1.style.display = 'none'
    }
    return true
  })
  link2.addEventListener('click', e => {
    if (modal2.style.display != 'block') {
      modal2.style.display = 'block'
    } else {
      modal2.style.display = 'none'
    }
    return true
  })
  link3.addEventListener('click', e => {
    if (modal3.style.display != 'block') {
      modal3.style.display = 'block'
    } else {
      modal3.style.display = 'none'
    }
    return true
  })
  link4.addEventListener('click', e => {
    if (modal4.style.display != 'block') {
      modal4.style.display = 'block'
    } else {
      modal4.style.display = 'none'
    }
    return true
  })


// Добавляем обработчик событий для закрытия модального окна ко всем крестикам
closeButtons.forEach(button => {
  button.addEventListener('click', closeModalFunction);
});

// Закрываем модальное окно при клике вне его
window.addEventListener('click', function(event) {
  // Проверяем, является ли цель клика модальным окном и закрываем его
  if (event.target.classList.contains('dentists__modal')) {
    event.target.style.display = 'none';
  }
});


  // Функция для закрытия модального окна
  function closeModalFunction() {
    modal.style.display = 'none';
    this.closest('.dentists__modal').style.display = 'none';
  }

  // Добавляем обработчик событий для закрытия модального окна
  closeModal.addEventListener('click', closeModalFunction);

  // Закрываем модальное окно при клике вне его
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      closeModalFunction();
    }
    if (event.target == modal1) {
      closeModalFunction();
    }
    if (event.target == modal2) {
      closeModalFunction();
    }
    if (event.target == modal3) {
      closeModalFunction();
    }
    if (event.target == modal4) {
      closeModalFunction();
    }
  });
});

const openPopUp1 = document.querySelector('.open_pop-up1')
const openPopUp2 = document.querySelector('.open_pop-up2')
const openPopUp3 = document.querySelector('.open_pop-up3')
const popUp1 = document.getElementById('modal-consultation')
const popUp2 = document.getElementById('modal-appointment')
const popUp3 = document.getElementById('modal-credit')
const popUp4 = document.getElementById('burger-menu-min-id')
const closePopUp1 = document.querySelector('.pop-up__close-1')
const closePopUp2 = document.querySelector('.pop-up__close-2')
const closePopUp3 = document.querySelector('.pop-up__close-3')
const closePopUp4 = document.querySelector('.pop-up__close-4')



closePopUp1.addEventListener('click', () => {
  popUp1.classList.remove('active')
})
closePopUp2.addEventListener('click', () => {
  popUp2.classList.remove('active')
})
closePopUp3.addEventListener('click', () => {
  popUp3.classList.remove('active')
})

closePopUp4.addEventListener('click', () => {
  popUp4.classList.remove('burger-menu_active')
})



const btns1 = document.querySelectorAll('.open_pop-up1')
const btns2 = document.querySelectorAll('.open_pop-up2')
const btns3 = document.querySelectorAll('.open_pop-up3')
// Проходим по массиву
btns1.forEach(function(btn) {
  // Вешаем событие клик
  btn.addEventListener('click', function(e) {
    e.preventDefault()
    popUp1.classList.add('active')
  })
})
btns2.forEach(function(btn) {
  // Вешаем событие клик
  btn.addEventListener('click', function(e) {
    e.preventDefault()
    popUp2.classList.add('active')
  })
})
btns3.forEach(function(btn) {
  // Вешаем событие клик
  btn.addEventListener('click', function(e) {
    e.preventDefault()
    popUp3.classList.add('active')
  })
})

document.addEventListener('DOMContentLoaded', () => {
  // Находим кнопку закрытия модального окна по классу .pop-up__close-6
  const closeButton = document.querySelector('.pop-up__close-5');

  // Функция для закрытия модального окна
  function closeModal() {
    // Находим модальное окно по его классу .burger-menu_nav и изменяем его стиль display на 'none'
    document.querySelector('.burger-menu_nav').style.display = 'none';
  }

  // Добавляем обработчик событий на кнопку закрытия
  closeButton.addEventListener('click', closeModal);
});

document.addEventListener('DOMContentLoaded', () => {
  // Находим модальное окно по ID
  const modal = document.getElementById('modalPolitics');
  // Находим кнопку закрытия модального окна по классу .close-btn
  const closeButtons = document.querySelectorAll('.close-btn');
  // Находим ссылки, которые должны открывать модальное окно, по классу .links-politics
  const openLinks = document.querySelectorAll('.links-politics');

  // Функция для открытия модального окна
  function openModal() {
    modal.style.display = 'block';
  }

  // Функция для закрытия модального окна
  function closeModal() {
    modal.style.display = 'none';
  }

  // Добавляем обработчик событий для открытия модального окна
  openLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Предотвращаем переход по ссылке
      openModal();
    });
  });

  // Добавляем обработчик событий для закрытия модального окна
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Находим все кнопки и крестики для закрытия модальных окон
  const closeButtons = document.querySelectorAll('.close-btn');

  // Функция для закрытия модального окна
  function closeModal() {
    // Закрываем модальное окно, изменяя его стиль display на 'none'
    // closest находит ближайший родительский элемент с классом .modal и скрывает его
    this.closest('.modal').style.display = 'none';
  }

  // Добавляем обработчик событий для каждой кнопки закрытия
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
});

