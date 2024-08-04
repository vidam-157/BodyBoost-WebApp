import React from "react";
import {UseWorkoutsContext} from '../hooks/UseWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Workoutdata = ({ workout }) => {

    const { dispatch } = UseWorkoutsContext();

    const deleteItem = async () => {

        const response = await fetch('api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
            <div className="text-container">
            <h5>{workout.title}</h5>
            <p><strong>Load (kg) : </strong> {workout.load}</p>
            <p><strong>Reps : </strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            </div>
            <span className="dlt-btn" onClick={deleteItem}> 
                <i className="fa fa-trash"></i>
            </span>
        </div>
    )

}

export default Workoutdata;