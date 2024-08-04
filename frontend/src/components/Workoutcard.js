import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UseWorkoutsContext } from '../hooks/UseWorkoutsContext';

const WorkoutCard = () => {

    const { dispatch } = UseWorkoutsContext(); // Update the UI in real-time when a new workout is added

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFeilds, setEmptyFeilds] = useState([])

    const handleSubmit = async (e) => {

        e.preventDefault();  // Prevent page refresh

        const workout = { title, load, reps };

        const response = await fetch('/api/workouts', {
            method: "POST",
            body: JSON.stringify(workout), // Convert workout response to a JSON string.
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);  // we have empty feilds inside this json response
            setEmptyFeilds(json.emptyFeilds)
        }

        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFeilds([]);
            console.log("New Workout Added", json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });  // Real-time UI update.
        }
    };

    return (
        <div>
            <Form className="workout-card" onSubmit={handleSubmit}>
                <h3 className="form-title">Update Workout Plan</h3>
                <Form.Group className="col-md-6 mb-6 inputs">
                    <Form.Label>Exercise Name:</Form.Label>
                    <Form.Control 
                        type="text" onChange={(e) => setTitle(e.target.value)} value={title}
                        className={emptyFeilds.includes('title') ? 'error' : ''} />
                </Form.Group>

                <Form.Group className="col-md-6 mb-6 inputs">
                    <Form.Label>Recommended Weight (Kg):</Form.Label>
                    <Form.Control type="number" onChange={(e) => setLoad(e.target.value)} value={load} 
                        className={emptyFeilds.includes('load') ? 'error' : ''}/>
                </Form.Group>

                <Form.Group className="col-md-6 mb-6 inputs">
                    <Form.Label>Number of Reps:</Form.Label>
                    <Form.Control type="number" onChange={(e) => setReps(e.target.value)} value={reps}
                    className={emptyFeilds.includes('reps') ? 'error' : ''} />
                </Form.Group>

                <Button className="primary submit-btn" type="submit">Update Schedule</Button>
                {error && <div className="error">{error}</div>}
            </Form>
        </div>
    );
};

export default WorkoutCard;