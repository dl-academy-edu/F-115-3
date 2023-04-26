(function initLogin() {
    const modalLogin = document.querySelector ('.j-modal-login');
    const buttonOpenLogin = document.querySelector('.j-login-button');
    const buttonCloseLogin = document.querySelector('.j-close-modal-login');
    const loginForm = document.forms.loginForm;

    if (isLogin) rerenderLinks();

    const login = (e) => {
        e.preventDefault();
        let data = {};
        data.email = loginForm.email.value;
        data.password = loginForm.password.value;

        // Validation

        sendRequest({
            method: 'POST',
            url: '/api/users/login',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json' 
            },
        })
        .then((res) => {
            if (res.ok) res.json();
        })
        .then(res => {
            console.log('Вы успешно вошли!');
            console.log(res);
            rerenderLinks();
            interactionModal(modalLogin);
            setTimeout(() => {
                location.pathname = '/'
            }, 2000)
        })
        .catch(err => {
            if(err._message) {
                alert(err._message);
            }
            clearErorrs(loginForm);
            errorFormHandler(err.errors, loginForm);
        })
    }

    buttonOpenLogin.addEventListener('click', function() {
        interactionModal(modalLogin);
    });

    buttonCloseLogin.addEventListener('click', function() {
        interactionModal(modalLogin);
    })

    loginForm.addEventListener('submit', login);
})();
