import {useAuthContext} from './useAuthContext'
import {useWorkoutContext} from './useworkoutContext'

export const  useLogout = ()=>{

    const {dispatch} = useAuthContext()
    const {dispatch: workoutDispatch} = useWorkoutContext()
    const logout =()=>{
        localStorage.removeItem('user')
        dispatch({type :'logout'})
       workoutDispatch({type:'SET_WORKOUTS', payload:null})
    }
    return {logout}
}
