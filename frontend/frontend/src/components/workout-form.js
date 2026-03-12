import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useworkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'
function Workoutform() {
  const { user } = useAuthContext()
  const { dispatch } = useWorkoutsContext()
  const [title, settitle] = useState('')
  const [load, setload] = useState('')
  const [reps, setreps] = useState('')
  const [error, seterror] = useState(null)
  const [emptyfields, setemptyfields] = useState([])

  const handlesubmit = async () => {
    if(!user){
      seterror('you must be logged in')
      return
    }
    const workout = { title, load, reps }
    const response = await fetch('http://localhost:3000/api/workouts/', {
      method: 'post',
      body: JSON.stringify(workout),
      headers: {
        'content-type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      seterror(json.error)
      setemptyfields(json.emptyfields)
    } else {
      seterror(null);
      settitle('')
      setload('')
      setreps('')
      setemptyfields('')
      console.log('new workout added', json)
      dispatch({ type: 'create_workout', payload: json })
    }
  }
  return (
    <form className='create' onSubmit={handlesubmit}>
      <h3>Add a new workout</h3>
      <label>excerises title</label>
      <input type='text'
        onChange={(e) => settitle(e.target.value)}
        value={title}
        className={emptyfields.includes('title') ? 'error' : ''}
      />
      <label>load (in kg)</label>
      <input type='text'
        onChange={(e) => setload(e.target.value)}
        value={load}
        className={emptyfields.includes('loads') ? 'error' : ''}

      />
      <label>reps</label>
      <input type='text'
        onChange={(e) => setreps(e.target.value)}
        value={reps}
        className={emptyfields.includes('reps') ? 'error' : ''}

      />
      <button>Add workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Workoutform