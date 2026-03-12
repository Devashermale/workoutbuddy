import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/Workoutcontext';
import { AuthcontextProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthcontextProvider>
    <WorkoutsContextProvider >
    <App />
    </WorkoutsContextProvider>
    </AuthcontextProvider>
);

