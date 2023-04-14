if(location.search) {
    const params = {};

    const arrayStringParams = location.search.substring(1).split('&');

    for(let stringParam of arrayStringParams) {
        let param = stringParam.split('=');
        let nameParam = param[0];
        let valueParam = param[1];
        if(nameParam in params) {
            params[nameParam].push(valueParam);
        } else {
            params[nameParam] = [valueParam]
        }
    }

    const filterForm = document.forms.filterForm;

    const updateInput = (gInputs, typeParam) => {
        for (let input of gInputs) {
            const param = params[typeParam];
            for(partParam of param) {
                if(partParam === input.value) input.checked = true;
            }
        }
    }

    updateInput(filterForm.modelPhone, 'modelPhone');
    updateInput(filterForm.howShow, 'howShow');
}

const url = new URL(location.pathname, location.origin);
filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    url.searchParams.delete('howShow');
    url.searchParams.delete('modelPhone');

    const addCheckedInput = (nameGroupInput, typeParam) => {
        if (!nameGroupInput) return;
        for(checkbox of nameGroupInput) {
            if(checkbox.checked) {
                url.searchParams.append(typeParam, checkbox.value);
            }
        }
    }
    addCheckedInput(e.target.modelPhone, 'modelPhone');
    addCheckedInput(e.target.howShow, 'howShow');

    history.replaceState(null, '', url);
})