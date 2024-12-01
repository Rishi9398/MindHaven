import React, { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "95395cca5f1c4df8bcebdd190f4c36fe";
  const API_URL = `https://newsapi.org/v2/everything?q=health+mental+wellbeing&sortBy=publishedAt&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        setArticles(response.data.articles);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
          Latest News on Health & Mental Well-being
        </h1>

        {loading && (
          <p className="text-center text-blue-700 text-lg font-medium">
            Loading news...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 text-lg font-medium">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900"
              >
                <img
                  src={article.urlToImage || "https://via.placeholder.com/150"}
                  alt={article.title}
                  className="w-full h-52 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-blue-800">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {article.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Published on:{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </a>
            </div>
          ))}
        </div>

        {!loading && articles.length === 0 && !error && (
          <p className="text-center text-blue-800 mt-8 text-lg font-medium">
            No news found.
          </p>
        )}
      </div>
    </div>
  );
};

export default News;
