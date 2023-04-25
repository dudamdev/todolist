const express = require('express');

const router = express.Router();

const tasksController = require('./controllers/tasksController');

const tasksMiddleware = require('./middlewares/tasksMiddleware');

router.get('/tasks', tasksController.getAll);
router.get('/tasks/:id', tasksController.getTask);
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksMiddleware.validateFieldDescription, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', tasksMiddleware.validateFieldTitle, tasksMiddleware.validateFieldDescription, tasksMiddleware.validateFieldStatus, tasksController.updateTask);

module.exports = router;
