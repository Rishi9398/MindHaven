import React, { useState } from 'react';
import { Box, Typography, Slider, TextField, Button } from '@mui/material';

const MoodTracker = () => {
  const [moodValue, setMoodValue] = useState(50); // Default value for the slider
  const [journalEntry, setJournalEntry] = useState('');
  const [moodDescription, setMoodDescription] = useState('Neutral 🙂 Neither happy nor sad, feeling indifferent. Just going through the motions of the day.');

  const handleMoodChange = (event, newValue) => {
    setMoodValue(newValue);
    updateMoodDescription(newValue);
  };

  const updateMoodDescription = (value) => {
    if (value <= 20) {
      setMoodDescription('Sad 😞 Feeling down or upset. It might help to talk to someone.');
    } else if (value <= 40) {
      setMoodDescription('Low 😕 Not feeling great, but managing.');
    } else if (value <= 60) {
      setMoodDescription('Neutral 🙂 Neither happy nor sad, feeling indifferent. Just going through the motions of the day.');
    } else if (value <= 80) {
      setMoodDescription('Good 😊 Feeling positive and content.');
    } else {
      setMoodDescription('Happy 😄 Feeling great and full of joy!');
    }
  };

  const handleSaveEntry = () => {
    alert(`Mood Saved! \nMood: ${moodDescription}\nJournal Entry: ${journalEntry}`);
    setJournalEntry('');
  };

  return (
    <Box
  sx={{
    width: '80%',
    margin: '40px auto', // Adds top and bottom spacing
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" align="center" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
        Rate Your Mood
      </Typography>

      <Slider
        value={moodValue}
        onChange={handleMoodChange}
        min={0}
        max={100}
        step={1}
        sx={{ color: '#1976d2', marginBottom: '16px' }}
      />

      <Typography variant="body1" align="center" sx={{ fontStyle: 'italic', marginBottom: '16px' }}>
        <strong>Mood Description:</strong> {moodDescription}
      </Typography>

      <TextField
        label="Journal Entry"
        placeholder="Write about your day..."
        multiline
        rows={4}
        fullWidth
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
        variant="outlined"
        sx={{ marginBottom: '16px' }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveEntry}
          sx={{ textTransform: 'none', padding: '8px 24px' }}
        >
          Save Mood
        </Button>
      </Box>

      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="success"
          sx={{ textTransform: 'none' }}
        >
          View Previous Mood Reports
        </Button>
      </Box>
    </Box>
  );
};

export default MoodTracker;
