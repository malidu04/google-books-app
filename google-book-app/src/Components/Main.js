import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";

const Main = () => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state

  const searchBook = async (evt) => {
    if (evt.key === "Enter") {
      if (!search.trim()) {
        setError("Please enter a book name to search.");
        return;
      }
      setError(null); // Clear any previous errors
      setLoading(true); // Set loading to true before API call

      try {
        const API_KEY = process.env.AIzaSyCUYPfDCceJWz6krlIBjHmXaXbugCE5CbQ; // Use the API key from env
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${API_KEY}&maxResults=40`
        );
        setData(response.data.items || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    }
  };

  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>
            A room without books is like
            <br /> a body without a soul.
          </h1>
        </div>
        <div className="row2">
          <h2>Find Your Book</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={searchBook} // Use onKeyDown instead of onKeyPress
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <img src="./images/bg2.png" alt="Books Background" />
        </div>
      </div>

      <div className="container">
        {loading && <p>Loading...</p>} {/* Show loading message */}
        {error && <p className="error">{error}</p>} {/* Show error message */}
        {bookData.length > 0 ? (
          <Card book={bookData} />
        ) : (
          !loading && <p>No books found. Try searching for something else.</p>
        )}
      </div>
    </>
  );
};

export default Main;
