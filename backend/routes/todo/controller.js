const todo = require('../../schemas/todo');
const { createResponse }= require('../../utils/response');
const asyncHandler = require('express-async-handler');
const {SERVER_ERROR} = require('../../errors/index');
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul"); 

// todo 생성
const createTodo = asyncHandler(async (req, res, next) => {
    // req.body.user_email = res.locals.email;
    const day = moment().add(9, 'hours');
    req.body.day = day;
    const result = await todo.create(req.body);
    res.json(createResponse(res, result));
});

//todo 수정
const updateTodo = asyncHandler(async (req, res, next) => {
    const result = await todo.findOne({'_id':req.params.id});
    await todo.updateOne({'_id':result._id}, req.body);
    res.json(createResponse(res));
});

//todo 삭제
const deleteTodo = asyncHandler(async(req, res, next) => {
    console.log(req.params.id);
    await todo.deleteOne({'_id': req.params.id})
    res.json(createResponse(res, ''));
});

// 조건별 todo 가져오기
const getTodo = asyncHandler(async (req, res, next) => {
    const result = await todo.find(req.query);
    res.json(createResponse(res, result));
});



exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
exports.getTodo = getTodo;