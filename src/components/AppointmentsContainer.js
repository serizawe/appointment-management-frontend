import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentForm from "./AppointmentForm";
import Appointments from "./Appointments";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointments")
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => console.log(err));
  }, [appointments]);

  const addAppointment = (appointment) => {
    axios
      .post("http://localhost:5000/appointments/add", appointment)
      .then((res) => {
        setAppointments([...appointments, res.data]);
        console.log(appointments)
      })
      .catch((err) => console.log(err));
      
  };

  const handleLogout = () => {
    // call the logout API endpoint and clear the user's token from local storage
    axios
      .post("http://localhost:5000/api/auth/logout")
      .then((res) => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login page
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
      </div>
      <div className="flex ">
        <AppointmentForm addAppointment={addAppointment} />
        <Appointments appointments={appointments} />
      </div>
    </div>
  );
}

export default DoctorDashboard;
