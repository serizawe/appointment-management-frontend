import React from "react";
import { useSelector } from 'react-redux';

function DoctorDetails({ doctor, handleAppointmentSelect }) {
  console.log(useSelector(state => state.auth.userId))
  const userId = useSelector(state => state.auth.userId);
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-2">{doctor.firstName}</h3>
      <p className="text-gray-500 text-sm mb-2">{doctor.lastName}</p>
      <p className="text-gray-400 text-sm mb-2">{doctor.specialty}</p>
      <p className="text-gray-400 text-sm mb-2">{doctor.location}</p>
      <p className="text-gray-400 text-sm mb-4">{doctor.email}</p>
      <button type="button" onClick={() => handleAppointmentSelect(doctor._id,userId)} className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">Make Appointment</button>
    </div>
  );
}

export default DoctorDetails;
