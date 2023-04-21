const btn = document.querySelector('button');

function json(str) {
    return new Promise((res, rej) => {
        if ( typeof str === 'string' ) {
            res(JSON.parse(str));
        } else {
            rej('В функцию json() была передана не строка');
        }
    });
}

const fetchDL = () => {
    return new Promise((resolve, rejected) => {
        console.log('Запустился процесс промиса...');

        setTimeout(() => {
            rejected('Увы вы не успели нажать кнопку за 5 секунд');
        }, 5000);

        btn.addEventListener('click', () => {
            resolve({
                ok: false,
                status: 200,
                jsonData: JSON.stringify({
                    name: 'Alexander Filippov', 
                    age: 22,
                })
            })
        })
    });
}

fetchDL()
.then((response) => {
    if ( response.ok ) {
        return json(response.ok);
    } else {
        throw 'Exception';
    }
})
.then((res) => {
    console.log('Промис выполнился успешно!');
    console.log(res);
})
.catch((err) => {
    console.log('Единственный catch в блоке');
    if (err === 'Exception') {
        console.log('Я Саня');
    }
    // console.error(err);
})
.finally(() => {
    console.log('Промис завершился.');
});