require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/courses');
const chapterRouter = require('./routes/chapters');
const imageRouter = require('./routes/imageCourses');
const orderRouter = require('./routes/orderPayments');
const mediaRouter = require('./routes/media');
const myCourseRouter = require('./routes/myCourses');
const reviewRouter = require('./routes/reviews');
const mentorRouter = require('./routes/mentors');
const lessonRouter = require('./routes/lessons');
const webhookRouter = require('./routes/webhook');
const refreshTokensRouter = require('./routes/refreshTokens');

const verifyToken =  require('./middleware/verifyToken');
const can =  require('./middleware/permissions');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: false ,limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', courseRouter);
app.use('/media',verifyToken,can('admin','student'), mediaRouter);
app.use('/refresh-tokens', refreshTokensRouter);
app.use('/mentors',verifyToken,can('admin'), mentorRouter);
app.use('/chapters',verifyToken,can('admin'), chapterRouter);
app.use('/lessons',verifyToken,can('admin'),lessonRouter);
app.use('/image-courses',verifyToken,can('admin'),imageRouter);
app.use('/my-courses',verifyToken,can('admin','student'),myCourseRouter);
app.use('/reviews',verifyToken,can('admin','student'),reviewRouter);
app.use('/webhook',webhookRouter);
app.use('/orders',verifyToken,can('admin','student'),orderRouter);

module.exports = app;
