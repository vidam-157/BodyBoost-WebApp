import { React, useEffect } from 'react';
import { UseWorkoutsContext } from '../hooks/UseWorkoutsContext';

// Components
import Workoutcard from '../components/Workoutcard';
import Workoutdata from '../components/Workoutdata'

const Homepage = () => {

    const {workouts, dispatch} = UseWorkoutsContext()
    // const [sechedules, setSchedules] = useState(null)

    useEffect (() => {
        const fetchSchedule = async () => {
            const response = await fetch ("/api/workouts/")
            const json = await response.json()

            if (response.ok) {
                // setSchedules(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchSchedule();

    }, [dispatch])  // when we use external functions we have to declare them in the dependancy array.

    return (
        <div className='home'>
            <div className='form-container'>
                <Workoutcard />
            </div>
            <div className='workout'>
                {workouts && workouts.map ((workouts) => (
                    <Workoutdata key={workouts._id} workout={workouts} />
                    
                ))}
            </div>
        </div>
    );
};

export default Homepage;