// Handles the mapping of URL to the corresponding controllers.

const express = require('express')  // getting access to the express modules

const { createSchedule, 
        getAllSchedules, 
        getaSchedule, 
        removeSchedule,
        UpdateSchedule } = require('../Controllers/workoutController');

const router = express.Router()  // creating a instance of a router

// GET all workouts
router.get('/', getAllSchedules)

// GET a Single Workout
router.get('/:id', getaSchedule)

// POST a new Workout
router.post('/', createSchedule)

// DELETE a Workout
router.delete('/:id', removeSchedule)

// UPDATE a Workout
router.patch('/:id', UpdateSchedule)


module.exports = router