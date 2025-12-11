const express = require('express');
const app = express();
const authRouter = require('./router/authRoute');
const databaseconnect = require('./config/databaseConfig');
const cookieParser = require('cookie-parser');
const cors = require('express');

databaseconnect();

app.use(express.json()); // parsing 
app.use(cookieParser());

app.use(cors({
    origin : [process.env.CLIENT_URL],
    credential: true
}))



app.use('/api/auth', authRouter);

// Catch-all route
app.use('/', (req, res) => {
    res.status(200).json({ data: 'JWTauth server -updated' });
});

module.exports = app;

// Application Initialization: app.js

// Express is required and an instance (app) is created.
// The authRouter is required from ./router/authRoute.
// Middleware express.json() is used to parse incoming JSON requests.
// The /api/auth route is set up to use authRouter.
// A default route is defined to respond with a JSON message for any requests to /.
