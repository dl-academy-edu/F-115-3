// Базовый путь до нашего сервера, к которому мы будем добавлять строковые значения для построения запросов.
const BASE_SERVER_PATH = 'https://academy.directlinedev.com';

// Функция для работы с модалками, а именно переключением их состояний.
// Она является как закрывающей, так и открывающей функцией. 
// Это хороший пример переиспользования кода.
function interactionModal(modal) {
    modal.classList.toggle('hidden');
}

function setErrorChecked(inputs, errorMessage) {
    const error = errorCreator(errorMessage);
    inputs[0].parentElement.parentElement
    .insertAdjacentElement('afterend', error);
    function handler() {
      error.remove();
      for(let input of [...inputs]) {
        input.removeEventListener('input', handler); 
        input.classList.remove('is-invalid');
      }
    }
    for(let input of [...inputs]) {
      input.classList.add('is-invalid');
      
      input.addEventListener('input', handler, {once: true});
    }
  }
  
  function setError(input, messageError) {
    if(input[0]) {
      setErrorChecked(input, messageError);
    } else {
      setErrorText(input, messageError);
    }
  }
  
  function setErrorText(input, errorMessage) {
    const error = errorCreator(errorMessage);
    input.classList.add('is-invalid');
    input.insertAdjacentElement('afterend', error);
    input.addEventListener('input', function() {
      error.remove();
      input.classList.remove('is-invalid');
    }, {once: true});
  }
  
  function errorCreator(message) {
    let messageError = document.createElement('div');
    messageError.classList.add('invalid-feedback');
    messageError.classList.add('invalid-feedback_js');
    messageError.innerText = message;
    return messageError;
  }
  
  function errorFormHandler(errors, form) {
    if(Object.keys(errors).length) {
      Object.keys(errors).forEach(key => {
        const messageError = errors[key];
        const input = form.elements[key];
        setError(input, messageError);
      })
      return;
    }
  }
  
  function clearErrors(element) {
    const messages = element.querySelectorAll('.invalid-feedback_js');
    const invalids = element.querySelectorAll('.is-invalid');
    messages.forEach(message => message.remove());
    invalids.forEach(invalid => invalid.classList.remove('is-invalid'));
  }