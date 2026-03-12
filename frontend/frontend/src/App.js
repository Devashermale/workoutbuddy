import './App.css';
import {BrowserRouter ,Routes ,Route,Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./pages/home.js"
import Login from './pages/login.js'
import Signup from './pages/signup.js';
import useAuthContext from './hooks/useAuthContext.js';
function App() {
  const {user} = useAuthContext()
  return (
     <>
      <BrowserRouter>
      <div className='pages'>
        <Navbar/>
        <Routes>
        <Route path='/' element={user ?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/login' element={!user?<Login/>:<Navigate to="/"/>}/>
        <Route path='/signup' element={!user?<Signup/>:<Navigate to="/"/>}/>


        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
