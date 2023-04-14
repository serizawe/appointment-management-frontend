import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import AppointmentsContainer from '../components/AppointmentsContainer';
import DoctorSearch from '../components/DoctorSearch';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DoctorSearch />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/appointments" element={<AppointmentsContainer />} />

    </Routes>
  );
}
