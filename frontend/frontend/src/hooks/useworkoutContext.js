import { useContext } from "react";
import { WorkoutsContext } from "../context/Workoutcontext";

export const useWorkoutsContext =()=>{
    const context = useContext(WorkoutsContext)
    if(!context){
        throw Error('useWorkout must be used inside a WorkoutsContextProvider')
    }
    return context

}
export default useWorkoutsContext