const btnOpenReg = document.querySelector('.j-register-button');
const modalReg = document.querySelector('.j-modal-register');
const btnCloseReg = document.querySelector('.j-close-modal-register');
const loaderReg = document.querySelector('.loader_js');
const regForm = document.forms.registerForm;
const linkToProfile = document.querySelector('.j-to-profile');

btnOpenReg.addEventListener('click', () => {
    interactionModal(modalReg);
})

btnCloseReg.addEventListener('click', () => {
    interactionModal(modalReg);
})

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loaderReg.classList.remove('hidden');
    let data = {};
    data.email = regForm.email.value;
    data.name = regForm.name.value;
    data.surname = regForm.surname.value;
    data.password = regForm.password.value;
    data.location = regForm.location.value;
    data.age = +regForm.age.value;

    sendRequest({
        url: '/api/users',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if ( res.success ) {
            interactionModal(modalReg);
            alert(`Пользователь с id ${res.data.id} & email ${res.data.email} зарегистрирован!`);
            regForm.reset();
        } else {
            throw res;
        }
    })
    .catch(err => {
        clearErrors(regForm);
        // errorFormHandler(err.errors, regForm);
    })
    .finally(() => {
        loaderReg.classList.add('hidden');
    });
})