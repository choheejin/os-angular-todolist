const router = require('express').Router();
const todo = require('../../schemas/todo');
const controller = require('./controller');
const {verifyToken} = require('../../middlewares/authorization');


router.post('/', controller.createTodo);
router.delete('/:id', controller.deleteTodo);
router.put('/:id', controller.updateTodo);
router.get('/', controller.getTodo);

module.exports = router;