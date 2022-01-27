const router = require('express').Router();
const todo = require('../../schemas/todo');
const controller = require('./controller');
const {verifyToken} = require('../../middlewares/authorization');


router.post('/', controller.createTodo);
router.delete('/:id', controller.deleteTodo);
router.put('/:id', controller.updateTodo);
router.get('/today', controller.getAllTodayTodo);
router.get('/completed/:id', controller.updateCompletedById);
router.get('/day', controller.getTodoByDay);
router.get('/today/completed', controller.getCompletedTodayTodo);
router.get('/today/notCompleted', controller.getNotCompletedTodayTodo);
router.get('/all' , controller.getAllTodo);

module.exports = router;