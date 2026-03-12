import React from 'react'
import { useWorkoutsContext} from '../hooks/useworkoutContext'
// data fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
const WorkoutDetails = ({workout}) => {

  const {dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();
  const handleclick = async()=>{
    if(user){
      return
    }
    const response = await fetch('http://localhost:3000/api/workouts'+workout._id,{
      method: 'DELETE',
      headers :{
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
       dispatch({type: 'delete_workout', payload:json})
    }

  }  

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
     <p><strong>load(in kgs)</strong>{workout.load}</p>
     <p><strong>reps</strong>{workout.reps }</p>
          <p>{workout.createdAt && !isNaN(new Date(workout.createdAt).getTime()) 
    ? formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true }) 
    : 'Date pending...'}</p>
     <span className="material-symbols-outlined" onClick={handleclick}>delete</span>
    </div>
  )
}

export default WorkoutDetails