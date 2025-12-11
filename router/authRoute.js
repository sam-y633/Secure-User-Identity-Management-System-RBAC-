const express = require('express');
const { signup, signin,getUser ,logout} = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth');
const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/user',jwtAuth, getUser);
authRouter.get('/logout',jwtAuth, logout);


module.exports = authRouter;


// Routing: authRoute.js

// Express is required and a router instance (authRouter) is created.
// The signup function is required from ../controller/authController.
// A POST route /signup is defined to use the signup controller function.
// The authRouter is exported.
