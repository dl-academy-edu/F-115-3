// Базовый путь до нашего сервера, к которому мы будем добавлять строковые значения для построения запросов.
const BASE_SERVER_PATH = 'https://academy.directlinedev.com';

const mainLoader = document.querySelector('.main-loader_js');

(function() {
    const form = document.forms.filter;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    // Заготавливаем элемент глобального объекта XHR для работы с запросами.
    let reqTags = new XMLHttpRequest();
    // Регистрируем запрос для дальнейшего его использования.
    reqTags.open('GET', BASE_SERVER_PATH + '/api/tags');
    reqTags.setRequestHeader('Content-Type', 'application/json');
    // Отправляем запрос.
    mainLoader.classList.remove('hidden');
    reqTags.send();
    reqTags.onload = () => {
        mainLoader.classList.add('hidden');
        const tags = JSON.parse(reqTags.response).data;
        console.log(tags);
    }
    reqTags.onerror = () => {
        mainLoader.classList.add('hidden');
        alert("Сервер недоступен!");
    }
})();