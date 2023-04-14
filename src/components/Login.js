import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { loginRequest } from '../redux/authSlice';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();
  dispatch(loginRequest());
  dispatch(login(email, password, userType)).then(() => {
    if (userType === 'patient') navigate('/');
    else navigate('/appointments');
    });
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-green-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            required
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
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="userType" className="block text-gray-700 font-bold mb-2">
            User Type:
          </label>
          <div className="relative">
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
             
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
          >
            Create an account
        </button>
      </div>
  </form>
</div>
);
}

export default Login;
