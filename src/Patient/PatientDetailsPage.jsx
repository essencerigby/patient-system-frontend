/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { getPatientById } from '../apiService';

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
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete='off'
    >
      <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Patient Details</h1>
      <div className='patient-info'>
        <TextField
          id='outlined-disabled'
          label='Patient ID'
          value={patient.id}
        />
        <TextField
          id='outlined-disabled'
          label='Patient First Name'
          value={patient.firstName}
        />
        <TextField
          id='outlined-disabled'
          label='Patient Last Name'
          value={patient.lastName}
        />
        <TextField
          id='outlined-disabled'
          label='Patient SSN'
          value={patient.ssn}
        />
        <TextField
          id='outlined-disabled'
          label='Patient Email'
          value={patient.email}
        />
        <TextField
          id='outlined-disabled'
          label='Patient Address'
          value={`${patient.street}, ${patient.city}, ${patient.state} ${patient.zip}`}
        />
        <TextField
          id='outlined-disabled'
          label='Patient Age'
          value={patient.age}
          InputProps={{
            endAdornment: <InputAdornment position='end'>years</InputAdornment>
          }}
        />
        <TextField
          id='outlined-disabled'
          label='Patient Height'
          value={patient.height}
          InputProps={{
            endAdornment: <InputAdornment position='end'>in</InputAdornment>
          }}
        />
        <TextField
          id='outlined-disabled'
          label='Patient Weight'
          value={patient.weight}
          InputProps={{
            endAdornment: <InputAdornment position='end'>lbs</InputAdornment>
          }}
        />
        <TextField
          id='outlined-disabled'
          label='Patient Gender'
          value={patient.gender}
        />
        <TextField
          id='outlined-disabled'
          label='Patient Insurance'
          value={patient.insurance}
        />
      </div>
    </Box>
  );
}
