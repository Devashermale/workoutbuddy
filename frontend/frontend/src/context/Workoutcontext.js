const  {createContext, useReducer} = require('react')

export const WorkoutsContext = createContext()
export const workoutsReducer = (state , action) =>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                workouts :action.payload
            }
        case 'create_workout':
            return {
                workouts:[action.payload, ...state.workouts]
            }
        case 'delete_workout':
            return {
            workouts: state.workouts.filter((w) => w._id !== action.payload._id)            }
        default:
            return state
    }   
}
export const WorkoutsContextProvider = ({children})=>{
    const [state ,dispatch] = useReducer(workoutsReducer,{
        workouts :null
    })
return (
    <WorkoutsContext.Provider value={{...state ,dispatch}}>
     {children}
    </WorkoutsContext.Provider>
)
}
export default workoutsReducer