import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorList from "./DoctorList";
import DoctorDetails from "./DoctorDetails";

function DoctorSearch() {
  const [searchParams, setSearchParams] = useState({ name: "", specialty: "", city: "" });
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  


  useEffect(() => {
    axios
      
      .get("http://localhost:5000/doctors")
      .then((res) => {
        setDoctors(res.data);
        const allLocations = [...new Set(res.data.map((doctor) => doctor.location))];
        setLocations(allLocations);
        const allSpecialties = [...new Set(res.data.map((doctor) => doctor.specialty))];
        setSpecialties(allSpecialties);
        setFilteredDoctors(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchParamsChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleLocationSelect = (location) => {
    setSearchParams({ ...searchParams, city: location });
  };

  const handleSpecialtySelect = (specialty) => {
    setSearchParams({ ...searchParams, specialty });
  };

  const handleSearch = () => {
  const filteredList = doctors.filter((doctor) => {
    const nameMatch = searchParams.name
      ? doctor.firstName.toLowerCase().includes(searchParams.name.toLowerCase())
      : true;
    const specialtyMatch = searchParams.specialty
      ? doctor.specialty === searchParams.specialty
      : true;
    const locationMatch = searchParams.city
      ? doctor.location === searchParams.city
      : true;
    return nameMatch && specialtyMatch && locationMatch;
  });
  setFilteredDoctors(filteredList);
  };


  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    
    
  };

  const handleAppointmentSelect = async (doctorId, patientId) => {
  

  try {
    // Get available appointments for the selected doctor
  
    const response = await axios.get(`http://localhost:5000/appointments/${doctorId}`);
    const availableAppointments = response.data;

    // Check if there are any available appointments
    if (availableAppointments.length === 0) {
      console.log("No available appointments found");
      return;
    }

    // Prompt user to select an appointment
    const selectedAppointment = await askForAppointmentSelection(availableAppointments);
    const appointment = {
      doctorId: doctorId,
      start: selectedAppointment.toISOString(),
      end: new Date(selectedAppointment.getTime() + 30 * 60 * 1000).toISOString(),
      patientId: patientId,
    };
    console.log(patientId)
    console.log(doctorId)
    await axios.post("http://localhost:5000/appointments/", appointment);
    console.log("Appointment made successfully!");
  } catch (error) {
    console.log(error);
  }
};

const askForAppointmentSelection = async (availableAppointments) => {
  console.log("Available Appointments:");
  availableAppointments.forEach((appointment, index) => {
    console.log(`${index + 1}. ${new Date(appointment).toLocaleString()}`);
  });
  const answer = await prompt("Enter the number of the appointment you want to select:");
  const selectedAppointment = availableAppointments[parseInt(answer) - 1];
  if (!selectedAppointment) {
    console.log("Invalid selection. Please try again.");
    return askForAppointmentSelection(availableAppointments);
  }
  return new Date(selectedAppointment);
};


  return (
    <div className="max-w-3xl mx-auto mt-8 flex">
  <div className="w-1/4 bg-gray-100 p-4 rounded-lg mr-4">
    <h3 className="text-lg font-bold mb-2">Filter By Location</h3>
    <ul>
      {locations.map((location) => (
        <li key={location} className="cursor-pointer mb-2 text-gray-600 hover:text-gray-900" onClick={() => handleLocationSelect(location)}>
          {location}
        </li>
      ))}
    </ul>

    <h3 className="text-lg font-bold my-4">Filter By Specialty</h3>
    <ul>
      {specialties.map((specialty) => (
        <li key={specialty} className="cursor-pointer mb-2 text-gray-600 hover:text-gray-900" onClick={() => handleSpecialtySelect(specialty)}>
          {specialty}
        </li>
      ))}
    </ul>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        setSearchParams({ name: "", specialty: "", city: "" });
        setFilteredDoctors(doctors);
      }}
    >
      Remove Filters
    </button>
  </div>
  <div className="w-3/4">
    <form className="flex flex-col sm:flex-row justify-between mb-8">
      <label htmlFor="name" className="mr-2 sm:w-1/4">
        Doctor Name:
      </label>
      <input type="text" id="name" name="name" placeholder="Search by doctor name" onChange={handleSearchParamsChange} className="border rounded py-2 px-3 w-full sm:w-3/4 mb-2 sm:mb-0" />
      
      <button type="button" className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 sm:w-auto" onClick={handleSearch}>
        Search
      </button>
    </form>
    {selectedDoctor ? (
      <DoctorDetails doctor={selectedDoctor} handleAppointmentSelect={handleAppointmentSelect} />
    ) : (
      <DoctorList doctors={filteredDoctors} handleDoctorSelect={handleDoctorSelect} />
    )}
  </div>
</div>

);
}

export default DoctorSearch;
