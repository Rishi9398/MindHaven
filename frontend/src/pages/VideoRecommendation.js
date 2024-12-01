import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoRecommendation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyDlRiKIO0AC-gGStRhGnIZbGoEYhNHesX4";
  const API_URL = "https://www.googleapis.com/youtube/v3/search";

  const categories = [
    "Self help",
    "Reducing stress",
    "Anxiety",
    "Panic attacks",
    "Breathing exercises",
    "Stretching",
    "Calm music",
    "Meditation",
  ];

  // Fetch default videos related to "health and well-being"
  useEffect(() => {
    const fetchDefaultVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            part: "snippet",
            q: "health and well-being",
            type: "video",
            maxResults: 10,
            key: API_KEY,
          },
        });
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching default videos:", error);
        alert("Failed to fetch default videos. Please try again later.");
      }
      setLoading(false);
    };

    fetchDefaultVideos();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a search term!");
      return;
    }
    performSearch(searchQuery);
  };

  const performSearch = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults: 10,
          key: API_KEY,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
      alert("Failed to fetch videos. Please try again later.");
    }
    setLoading(false);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    performSearch(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">Video Recommendations</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="Search for videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-2/3 lg:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm hover:bg-blue-200"
            >
              {category}
            </button>
          ))}
        </div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                  {video.snippet.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mt-2">
                  {video.snippet.description}
                </p>
              </a>
            </div>
          ))}
        </div>

        {!loading && videos.length === 0 && searchQuery.trim() && (
          <p className="text-center text-gray-600 mt-8">No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default VideoRecommendation;
