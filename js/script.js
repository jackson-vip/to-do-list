const localStorageKay = 'to-do-list-jv';

// Funções : 

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKay) || "[]");
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name == inputValue);
    return !exists ? false : true;
}

function newTask() {
    let input = document.getElementById('input-new-task');
    input.style.border = '';

    // Validation :
    if (!input.value) {

        alert('Digite uma nova task');

    } else if (validateIfExistsNewTask()) {

        input.style.border = '1px solid red';
        alert('Já existe uma tarefa com essa descrição!');

    } else {
        // increment to localStorage
        // JSON.parse() : Ao receber dados de um servidor web, os dados são sempre uma string.
        // Analise os dados com JSON.parse() e os dados se tornarão um objeto JavaScript.   

        let values = JSON.parse(localStorage.getItem(localStorageKay) || "[]");
        values.push({
            name: input.value,
            done: false
        })
        localStorage.setItem(localStorageKay, JSON.stringify(values));
        showValues();
        input.value = '';
    }
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKay) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<div class='btn-options'>
        <li  class="${values[i].done ? 'concluido' : ''}" >${values[i]['name']}
        <button id='btn-ok' onclick='taskDone("${values[i]['name']}")'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
            </svg>  
        </button>
        
        <button id='btn-del' onclick='removeItem("${values[i]['name']}")'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg>
        </button>
        </li>

        </div>`;
    };
}

showValues();

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKay) || "[]");
    let index = values.findIndex(x => x.name === data);
    values.splice(index, 1);
    localStorage.setItem(localStorageKay, JSON.stringify(values));
    showValues();
}

function taskDone (name){
    let values = JSON.parse(localStorage.getItem(localStorageKay) || "[]");
    let index = values.findIndex(x => x.name === name);
    values[index].done = !values[index].done;
    localStorage.setItem(localStorageKay, JSON.stringify(values));
    showValues();
}
