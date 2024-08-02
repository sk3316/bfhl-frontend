import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const result = await axios.post('https://bajaj-api-orpin.vercel.app/bfhl', {
        data: JSON.parse(inputData),
      });
      setResponse(result.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="container">
      <h1>API Input</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder='{"data": ["M", "1", "334", "4", "B"]}'
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className="response">
          <h2>Filtered Response</h2>
          <p>Numbers: {response.numbers.join(', ')}</p>
          <p>Alphabets: {response.alphabets.join(', ')}</p>
          <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
