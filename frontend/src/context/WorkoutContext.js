import React , {createContext, useReducer} from "react";

export const WorkoutsContext = createContext();

// Step 1: Define the reducer function.
export const reducer = (state, action) => {

    switch (action.type) {
        case 'SET_WORKOUTS' :
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT' :
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT' : 
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state;
    }
}

// Step 2: Define the initial state
const initalState = {workouts: null}

export const WorkoutContexter = ({ children }) => {

    // Step 3: Defining the useReducer hook
    const [state, dispatch] = useReducer(reducer, initalState); // Returns current state and dispatch functions

    // Step 4: Dispatch actions to update the sate
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}

export default WorkoutContexter;