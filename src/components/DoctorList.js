import React from "react";

function DoctorList({ doctors, handleDoctorSelect }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor) => (
        <div key={doctor._id} onClick={() => handleDoctorSelect(doctor)} className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100">
          <h3 className="text-lg font-medium mb-1">{doctor.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{doctor.specialty}</p>
          <p className="text-gray-400 text-sm">{doctor.city}</p>
        </div>
      ))}
    </div>
  );
}

export default DoctorList;
