import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatientById } from '../apiService';
import '../index.css';

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatientById(id);
        setPatient(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchPatient();
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error.message}</p>;
  }

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <div className='patient-details'>
      <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Patient Details</h1>
      <div className='patient-info'>
        <p><strong>ID:</strong> {patient.id}</p>
        <p><strong>First Name:</strong> {patient.firstName}</p>
        <p><strong>Last Name:</strong> {patient.lastName}</p>
        <p><strong>SSN:</strong> {patient.ssn}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Street:</strong> {patient.street}</p>
        <p><strong>City:</strong> {patient.city}</p>
        <p><strong>State:</strong> {patient.state}</p>
        <p><strong>Zip:</strong> {patient.zip}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Height:</strong> {patient.height}</p>
        <p><strong>Weight:</strong> {patient.weight}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Insurance:</strong> {patient.insurance}</p>
      </div>
    </div>
  );
}