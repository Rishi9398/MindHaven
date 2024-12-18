import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const MoodTracker = () => {
  const [moodValue, setMoodValue] = useState(50);
  const [journalEntry, setJournalEntry] = useState("");
  const [moodDescription, setMoodDescription] = useState("Neutral 🙂 Neither happy nor sad.");
  const [moodEntries, setMoodEntries] = useState([]);
  const [user, setUser] = useState(null); // Track logged-in user

  // Track real-time login/logout
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
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
    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("mood_entries")
        .insert([
          {
            email: user.email,
            mood_value: moodValue,
            mood_description: moodDescription,
            journal_entry: journalEntry,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        throw error;
      }

      alert("Mood Saved!");
      setJournalEntry("");
      fetchMoodEntries();
    } catch (error) {
      console.error("Error saving mood entry:", error);
      alert("Error saving mood entry!");
    }
  };

  const fetchMoodEntries = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("email", user.email)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setMoodEntries(data);
    } catch (error) {
      console.error("Error fetching mood entries:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMoodEntries();
    }
  }, [user]);

  const handleDeleteEntry = async (id) => {
    try {
      const { error } = await supabase
        .from("mood_entries")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      fetchMoodEntries();
    } catch (error) {
      console.error("Error deleting mood entry:", error);
      alert("Error deleting entry!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Mood Tracker</h1>

      {!user && (
        <p className="text-red-500 text-center mb-4">You need to log in to save your mood entries.</p>
      )}

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
        disabled={!user}
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
