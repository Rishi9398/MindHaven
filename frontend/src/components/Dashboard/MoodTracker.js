import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../supabaseClient";

const MoodTracker = () => {
  const [moodValue, setMoodValue] = useState(50);
  const [journalEntry, setJournalEntry] = useState("");
  const [moodDescription, setMoodDescription] = useState("Neutral 🙂 Neither happy nor sad.");
  const [moodEntries, setMoodEntries] = useState([]);
  const [userEmail, setUserEmail] = useState(null); // Store logged-in user's email

  useEffect(() => {
    // Fetch user details on component load
    const fetchUser = async () => {
      const user = supabase.auth.user(); // Get the logged-in user from Supabase
      if (user) {
        setUserEmail(user.email); // Set the user's email
      } else {
        alert("Please log in first.");
      }
    };

    fetchUser();
  }, []);

  const handleMoodChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMoodValue(value);
    updateMoodDescription(value);
  };

  const updateMoodDescription = (value) => {
    if (value <= 20) {
      setMoodDescription("Sad 😞 Feeling down or upset.");
    } else if (value <= 40) {
      setMoodDescription("Low 😕 Not feeling great, but managing.");
    } else if (value <= 60) {
      setMoodDescription("Neutral 🙂 Neither happy nor sad.");
    } else if (value <= 80) {
      setMoodDescription("Good 😊 Feeling positive and content.");
    } else {
      setMoodDescription("Happy 😄 Feeling great and full of joy!");
    }
  };

  const handleSaveEntry = async () => {
    if (!userEmail) {
      alert("Please log in first.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("mood_entries")
        .insert([
          {
            email: userEmail, // Associate entry with the logged-in user's email
            mood_value: moodValue,
            mood_description: moodDescription,
            journal_entry: journalEntry,
            created_at: new Date().toISOString(), // Include a timestamp
          },
        ]);

      if (error) {
        throw error;
      }

      alert("Mood Saved!");
      setJournalEntry(""); // Reset the journal entry field
      fetchMoodEntries(); // Refresh mood entries
    } catch (error) {
      console.error("Error saving mood entry:", error);
      alert("Error saving mood entry!");
    }
  };

  const fetchMoodEntries = useCallback(async () => {
    if (!userEmail) return;

    try {
      const { data, error } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("email", userEmail) // Fetch entries for the logged-in user
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setMoodEntries(data);
    } catch (error) {
      console.error("Error fetching mood entries:", error);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchMoodEntries();
  }, [fetchMoodEntries]);

  const handleDeleteEntry = async (id) => {
    try {
      const { error } = await supabase
        .from("mood_entries")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      fetchMoodEntries(); // Refresh mood entries after deletion
    } catch (error) {
      console.error("Error deleting mood entry:", error);
      alert("Error deleting entry!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Mood Tracker</h1>

      <div className="bg-white p-4 shadow rounded-md mb-6">
        <label className="block text-sm font-medium mb-2">Rate Your Mood:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={moodValue}
          onChange={handleMoodChange}
          className="w-full"
        />
        <p className="text-center mt-2 text-gray-700">
          <strong>Mood Description:</strong> {moodDescription}
        </p>
      </div>

      <div className="bg-white p-4 shadow rounded-md mb-6">
        <label className="block text-sm font-medium mb-2">Journal Entry:</label>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          rows="4"
          className="w-full border rounded-md p-2"
          placeholder="Write about your day..."
        />
      </div>

      <button
        onClick={handleSaveEntry}
        className="bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 transition"
      >
        Save Mood
      </button>

      <h2 className="text-xl font-bold mt-8 mb-4">Previous Entries</h2>
      <div className="space-y-4">
        {moodEntries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 shadow rounded-md">
            <p className="text-sm text-gray-700">
              <strong>Mood:</strong> {entry.mood_description}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Journal:</strong> {entry.journal_entry}
            </p>
            <button
              onClick={() => handleDeleteEntry(entry.id)}
              className="text-red-600 text-sm mt-2"
            >
              Delete Entry
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
