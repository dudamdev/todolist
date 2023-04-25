const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTitle = document.querySelector('#input-title');
const inputDescription = document.querySelector('#input-description');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    return tasks;
};


const addTask = async (event) => {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const task = { title: inputTitle.value, description: inputDescription.value };

    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });

    loadTasks();

    inputTitle.value = '';
    inputDescription.value = '';
};

const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    });

    loadTasks();
};

const updateTask = async ({ id, title, description, status }) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status }),
    });

    loadTasks();
};

const formatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' }
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
};

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if (innerText) {
        element.innerText = innerText;
    }

    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
};

const createSelect = (value) => {
    const options = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluída">concluída</option>
    `;

    const select = createElement('select', '', options);

    select.value = value;

    return select;
};

const createRow = (task) => {
    const { id, title, description, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdDescription = createElement('td', description);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);

    select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value }));

    const editButton = createElement('button', '', '<span class="material-icons">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-icons">delete</span>');

    const editTitleForm = createElement('form');
    const editDescriptionForm = createElement('form');
    const editTitleInput = createElement('input');
    const editDescriptionInput = createElement('input');

    editTitleInput.value = title;
    editDescriptionInput.value = description;

    editTitleForm.appendChild(editTitleInput);
    editDescriptionForm.appendChild(editDescriptionInput);

    editTitleForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateTask({ id, title: editTitleInput.value, description, status });
    });

    editDescriptionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateTask({ id, title, description: editDescriptionInput.value, status });
    });

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdDescription.innerText = '';
        tdTitle.appendChild(editTitleForm);
        tdDescription.appendChild(editDescriptionForm);
    });
    deleteButton.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select);

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
};

const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
};

addForm.addEventListener('submit', addTask);

loadTasks();