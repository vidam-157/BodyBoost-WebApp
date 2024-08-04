const mongoose = require('mongoose')

const Schema = mongoose.Schema
// const WorkoutModel = mongoose.model('workout', workoutSchema);

const workoutSchema = new Schema({
    title: { type: String, required: true },
    load: { type: Number, required: true },
    reps: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model('workout', workoutSchema);