const todo = require('../../schemas/todo');
const { createResponse }= require('../../utils/response');
const asyncHandler = require('express-async-handler');
const {SERVER_ERROR} = require('../../errors/index');
const moment = require('moment-timezone');
const { get } = require('express/lib/response');
moment.tz.setDefault("Asia/Seoul"); 

// todo 생성
const createTodo = asyncHandler(async (req, res, next) => {
    // req.body.user_email = res.locals.email;
    const result = await todo.create(req.body);
    res.json(createResponse(res, result));
});

//todo 수정
const updateTodo = asyncHandler(async (req, res, next) => {
    const result = await todo.findOneAndUpdate({'_id':req.params.id}, req.body);
    res.json(createResponse(res, result));
});

//todo 삭제
const deleteTodo = asyncHandler(async(req, res, next) => {
    console.log(req.params.id);
    await todo.deleteOne({'_id': req.params.id})
    res.json(createResponse(res, ''));
});

//오늘 날짜인 todo 모두(끝냈는지 안끝냈는지 상관없음) 가져오기
const getAllTodayTodo = asyncHandler(async (req, res, next) => {
    const start = moment().startOf('day');
    const end = moment().startOf('day').add(1, "days");
    console.log(start);
    console.log(end);
    const result = await todo.find({day : {$gte : start, $lt : end}});
    console.log(result);
    res.json(createResponse(res, result));
});


//오늘 날짜인 끝내지 못한 todo 가져오기
const getNotCompletedTodayTodo = asyncHandler(async (req, res, next) => {
    const start = moment().startOf('day');
    const end = moment().startOf('day').add(1, "days");
    console.log(start);
    console.log(end);
    const result = await todo.find({day : {$gte : start, $lt : end}, completed : false});
    res.json(createResponse(res, result));
});

//오늘 날짜인 끝낸 todo 가져오기
const getCompletedTodayTodo = asyncHandler(async (req, res, next) => {
    const start = moment().startOf('day');
    const end = moment().startOf('day').add(1, "days");
    console.log(start);
    console.log(end);
    const result = await todo.find({day : {$gte : start, $lt : end}, completed : true});
    res.json(createResponse(res, result));
});

// 해당 할일 끝냈는지 체크
const updateCompletedById = asyncHandler(async (req, res, next) => {
    const exTodo = await todo.findOne({'_id':req.params.id});
    const result = await todo.updateOne({'_id':req.params.id}, {'completed': !exTodo.completed});
    res.json(createResponse(res, result));
});

// 해당 날짜의 할일 가져오기
const getTodoByDay = asyncHandler(async (req, res, next) => {
    const start = moment(req.query.day).startOf('day');
    const end = moment(req.query.day).startOf('day').add(1, "days");
    console.log(start);
    console.log(end);
    const result = await todo.find({day : {$gte : start, $lt : end}});
    res.json(createResponse(res, result));
});

const getNotCompletedTodo = asyncHandler(async (req, res, next) => {
    
    const result = await todo.find({completed: false});
    res.json(createResponse(res, result));
});

// 모든 todo 가져오기
const getAllTodo = asyncHandler(async (req, res, next) => {
    const result = await todo.find();
    res.json(createResponse(res, result));
});



exports.getTodoByDay = getTodoByDay;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
exports.getAllTodayTodo = getAllTodayTodo;
exports.updateCompletedById = updateCompletedById;
exports.getNotCompletedTodayTodo = getNotCompletedTodayTodo;
exports.getCompletedTodayTodo = getCompletedTodayTodo;
exports.getNotCompletedTodo = getNotCompletedTodo;
exports.getAllTodo = getAllTodo;