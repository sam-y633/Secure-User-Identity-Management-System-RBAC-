require('dotenv').config(); 

const PORT = process.env.PORT || 5001;
const app = require('./app');

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});

//1. Entry Point: index.js

// The application starts here.
// The app module is required from app.js.
// The server listens on a specified port (PORT), either from the environment variables or defaulting to 5001.

// Flow Recap
// Server Initialization: index.js

// Starts the server on http://localhost:5001.
// Request Handling: app.js

// Routes requests to /api/auth to authRouter.
// Routing: authRoute.js

// Matches the POST request to /signup and calls the signup function.
// Controller Execution: authController.js

// Processes the signup request and sends a JSON response.
