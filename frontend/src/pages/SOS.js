import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import emailjs from 'emailjs-com'; // Import EmailJS SDK

const SOS = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and restrict to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLocationError(''); // Clear any previous error
        },
        (error) => {
          setLocationError(error.message);
          console.error('Error fetching location:', error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSendSOS = () => {
    if (!phoneNumber || !email || !location) {
      alert('Please provide all required information and ensure location is available.');
      return;
    }

    const locationString = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;

    // Send email using EmailJS
    const templateParams = {
      phoneNumber,
      email,
      location: locationString,
    };

    // Replace the placeholders with your own EmailJS credentials
    emailjs.send('service_e70bn4m', 'template_t80r3fi', templateParams, '4_QkuMgAs5utYlAho')
      .then(
        (response) => {
          alert('SOS sent successfully!');
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
          alert('Failed to send SOS. Please try again later.');
        }
      );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #e3f2fd, #ffffff)',
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            SOS Help System
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
            Enter your emergency contact details and share your location to request immediate help.
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 4 }}>
            <TextField
              label="Emergency Contact Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              inputProps={{
              inputMode: "numeric", // For mobile number pads
              pattern: "[0-9]*", // Ensures only numeric input
              maxLength: 10, // Limits input to 10 characters
            }}
            sx={{ mb: 3 }}
              
              
            />
            <TextField
              label="Emergency Contact Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSendSOS}
              sx={{ py: 1.5 }}
            >
              Send SOS
            </Button>
          </Box>

          {locationError ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" color="error">
                {locationError}
              </Typography>
            </Box>
          ) : (
            location && (
              <Box sx={{ mt: 5 }}>
                <Typography variant="body1" color="textSecondary">
                  Current Location: Latitude {location.latitude}, Longitude {location.longitude}
                </Typography>
                <Box sx={{ mt: 2, height: '400px' }}>
                  <MapContainer
                    center={[location.latitude, location.longitude]}
                    zoom={13}
                    style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[location.latitude, location.longitude]}>
                      <Popup>Your Current Location</Popup>
                    </Marker>
                  </MapContainer>
                </Box>
              </Box>
            )
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default SOS;
