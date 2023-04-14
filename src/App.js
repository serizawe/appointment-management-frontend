
import './App.css';
import Appointments from "./components/Appointments";
import AppointmentForm from './components/AppointmentForm';
import AppointmentsContainer from './components/AppointmentsContainer';
import Login from './components/Login';
import Signup from './components/Signup'
import DoctorSearch from './components/DoctorSearch';
import { BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/Routes';
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
