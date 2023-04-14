const book = document.querySelector('.books');
const btnBack = document.querySelector('.button-back_js');
const btnNext = document.querySelector('.button-next_js');

let activeStr;

const strArray = [
    "LocalStorage и SessionStorage являются веб-хранилищами для локального хранения данных внутри браузера пользователя, в них вы можете хранить информацию в формате ключ-значение. Ключ и значение - это всегда строки.",
    "Отличие между этими хранилищами сводится только к периоду времени, в течение которого они могут хранить данные, помещенные в них.",
    "LocalStorage - привязана к источнику (домену, протоколу и порту), a SessionStorage ограничена только одной вкладкой браузера."
];


const updateStrCount = () => {
    +localStorage.getItem('activeStr')
        ? (activeStr = +localStorage.getItem('activeStr'))
        : (activeStr = 1);
}
updateStrCount();

const createStrNumber = () => {
    const div = document.createElement('div');
    div.classList.add('number-str');

    div.innerText = `${activeStr} из ${strArray.length}`;
    book.insertAdjacentElement('beforeend', div);
}
createStrNumber();

if (activeStr === 1) btnBack.setAttribute('disabled', 'disabled');
if (activeStr === strArray.length) btnNext.setAttribute('disabled', 'disabled');

const createStr = () => {
    const div = document.createElement('div');
    div.classList.add('str');
    div.innerText = strArray[activeStr - 1];
    book.insertAdjacentElement('afterbegin', div);
}
createStr();

const strChange = (direction) => {
    switch(direction) {
        case 'next': {
            if (activeStr < strArray.length) {
                localStorage.setItem('activeStr', activeStr + 1);
                updateStrCount();
                btnBack.removeAttribute('disabled');
            }
            if (activeStr === strArray.length) {
                btnNext.setAttribute('disabled', 'disabled');
            }
            break;
        }
        case 'back': {
            if (activeStr != 1) {
                localStorage.setItem('activeStr', activeStr - 1);
                updateStrCount();
                btnNext.removeAttribute('disabled');
            }
            if (activeStr === 1) {
                btnBack.setAttribute('disabled', 'disabled');
            }
            break;
        }
        default: {
            console.error('Непредвиденное направление');
        }
    }
    document.querySelector('.str').remove();
    createStr();
    document.querySelector('.number-str').remove();
    createStrNumber();
}

btnBack.addEventListener('click', () => strChange('back'));
btnNext.addEventListener('click', () => strChange('next'));
