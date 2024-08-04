require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/usersRoutes');

const app = express()  // Starting the express app
app.use(express.json())  // middleware - checks for the body of any request

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for request (Starting the server)
        app.listen(process.env.PORT, ()=> {
            console.log('Listning on port', process.env.PORT)
        })
    })
    .catch((error => {
        console.log(error)
    }))
