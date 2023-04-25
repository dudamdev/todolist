const connection = require('./connection');

// camada que se conecta diretamente com banco de dados

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const getTask = async (id) => {
    const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    return tasks;
};

const createTask = async (task) => {
    const { title, description } = task;
    const dateUTC = new Date(Date.now()).toUTCString();

    const [createdTask] = await connection.execute('INSERT INTO tasks(title, description, status, created_at) VALUES(?, ?, ?, ?)', [title, description, 'pendente', dateUTC]);

    return { insertId: createdTask.insertId };
}

const deleteTask = async (id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

const updateTask = async (id, task) => {
    const { title, description, status } = task;

    const [updatedTask] = await connection.execute('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);

    return updatedTask;
}

module.exports = {
    getAll,
    getTask,
    createTask,
    deleteTask,
    updateTask,
};