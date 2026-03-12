import { useEffect } from 'react'
import Workoutdetails from '../components/workoutdetails'
import Workoutform from '../components/workout-form'
import { useWorkoutsContext } from '../hooks/useworkoutContext';
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
    //usestate
    // const [workouts, setWorkouts] = useState(null)
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:3000/api/workouts/', {
                headers:
                {
                    "Authorization": `Bearer ${user.token}`
                }

            })
            const json = await response.json()
            if (response.ok) {
                //usestate
                //  setWorkouts(json);
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }

        }

        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])
    return (
        <div className='home'>
            <div className='workouts'>
                {
                    workouts && workouts.map((workout) => (

                        <Workoutdetails key={workout._id} workout={workout} />
                    ))
                }
            </div>
            <Workoutform />
        </div>
    )
}

export default Home;