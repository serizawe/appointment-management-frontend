import axios from "axios";
import React, { useState } from "react";


function Signup() {
  const [isDoctor, setIsDoctor] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");

  

 const handleSignup = async (e) => {
  e.preventDefault();
  const userData = {
  firstName,
  lastName,
  email,
  password,
  ...(isDoctor && { location }),
  ...(isDoctor && { specialty }),
};

  try {
  const endpoint = isDoctor ? 'http://localhost:5000/signup/doctor' : 'http://localhost:5000/signup';
  const response = await axios.post(endpoint, userData, {
  headers: {
    'Content-Type': 'application/json',
  },
});

  console.log(response.data);
  // handle the response data
} catch (error) {
  console.error('Error:',  error);
  // handle the error
}

};


  const handleSwitch = () => {
    setIsDoctor(!isDoctor);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-green-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">{isDoctor ? "Doctor Signup" : "Patient Signup"}</h2>
      <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {isDoctor && (
          <div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="specialty" className="block text-gray-700 font-bold mb-2">
            Specialty:
          </label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    )}

    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign Up
      </button>
      <div className="flex items-center justify-center">
        <span className="mr-2">{isDoctor ? "Patient" : "Doctor"}</span>
        <label htmlFor="switch" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="switch"
              name="switch"
              className="sr-only"
              checked={isDoctor}
              onChange={handleSwitch}
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isDoctor ? "transform translate-x-full" : ""}`}></div>
          </div>
        </label>
      </div>
    </div>
  </form>
</div> 
);
}
export default Signup;

