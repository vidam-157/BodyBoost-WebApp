// Defines what happens when a specific route is accessed.

const Workout = require('../Models/workoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getAllSchedules = async (req,res) => {

    const workoutSchedule = await Workout.find({}).sort({createdAt: -1}) // Getting all douments and sorting them in descending order

    res.status(200).json(workoutSchedule)

}

// Get a single workout
const getaSchedule = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workoutSchedule = await Workout.findById(id)

    if (!workoutSchedule) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workoutSchedule)

}

// Create a new workout
const createSchedule = async (req, res) => {
    
    const {title, load, reps} = req.body

    let emptyFeilds = []

    if(!title) {
        emptyFeilds.push('title')
    }
    if(!load) {
        emptyFeilds.push('load')
    }
    if(!reps) {
        emptyFeilds.push('reps')
    }
    if(emptyFeilds.length > 0) {
        return res.status(400).json({ error: 'Please fill all the feilds', emptyFeilds})
    }

    // add docuement to DB
    try {
        const workoutSchedule = await Workout.create({title, load, reps})
        res.status(200).json(workoutSchedule)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a workout
const removeSchedule = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workoutSchedule =  await Workout.findOneAndDelete({_id: id})

    if (!workoutSchedule) {
        return res.status(400).json({error: "No such workout"})
    }

    res.status(200).json(workoutSchedule)

}

// Update a workout
const UpdateSchedule = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const UpdateSchedule = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!UpdateSchedule) {
        return res.status(400).json({error: "No such workout"})
    }

    res.status(200).json(UpdateSchedule)

}

module.exports = {
    getAllSchedules,
    getaSchedule,
    createSchedule,
    removeSchedule,
    UpdateSchedule
}