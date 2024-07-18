/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import CottageIcon from '@mui/icons-material/Cottage';
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
        '& .MuiTextField-root': { m: 3, width: '45ch' }
      }}
    >
      <div className='patient-info'>
        <h1 style={{ fontFamily: 'Roboto, sans-serif', textAlign: 'start' }}>Patient Details</h1>
        <TextField
          id='outlined-read-only'
          label='Patient ID'
          value={patient.id}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          id='outlined-read-only'
          label='Patient First Name'
          value={patient.firstName}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          id='outlined-read-only'
          label='Patient Last Name'
          value={patient.lastName}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          id='outlined-read-only'
          label='Patient SSN'
          value={patient.ssn}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          id='outlined-read-only'
          label='Patient Email'
          value={patient.email}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          id='outlined-read-only'
          label='Patient Address'
          value={`${patient.street}, ${patient.city}, ${patient.state} ${patient.zip}`}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          id='outlined-read-only'
          label='Patient Age'
          value={patient.age}
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position='end'>years</InputAdornment>
          }}
        />
        <TextField
          id='outlined-read-only'
          label='Patient Height'
          value={patient.height}
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position='end'>in</InputAdornment>
          }}
        />
        <TextField
          id='outlined-read-only-input'
          label='Patient Weight'
          value={patient.weight}
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position='end'>lbs</InputAdornment>
          }}
        />
        <TextField
          id='outlined-read-only'
          label='Patient Gender'
          value={patient.gender}
        />
        <TextField
          id='outlined-read-only'
          label='Patient Insurance'
          value={patient.insurance}
        />
      </div>
      <CottageIcon />
    </Box>
  );
}
