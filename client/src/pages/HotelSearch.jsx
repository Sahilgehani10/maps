import React, { useState } from 'react';
import axios from 'axios';

const HotelSearch = () => {
  const [location, setLocation] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.get('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/', {
        params: {
          query: location,
        },
        headers: {
            'X-RapidAPI-Key': '07c3f1b256mshbb34fab97e082a6p11483fjsnd28b1711e413',
            'X-RapidAPI-Host': 'skyscanner80.p.rapidapi.com'
        },
      });

      setHotels(response.data.Places);
    } catch (error) {
      setError('Error fetching hotels. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {hotels.length > 0 && (
        <div>
          <h2>Hotel Suggestions</h2>
          <ul>
            {hotels.map((hotel, index) => (
              <li key={index}>{hotel.PlaceName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelSearch;
