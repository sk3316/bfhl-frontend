import React, { useState } from 'react';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest Alphabet', label: 'Highest Alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonInput);
      const res = await fetch('https://bajaj-api-orpin.vercel.app//bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      });
      const result = await res.json();
      setResponse(result);
    } catch (error) {
      alert('Invalid JSON');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};

    if (filter.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets.join(',');
    }
    if (filter.includes('Numbers')) {
      filteredResponse.numbers = response.numbers.join(',');
    }
    if (filter.includes('Highest Alphabet')) {
      filteredResponse.highest_alphabet = response.highest_alphabet.join(',');
    }

    return (
      <div>
        <h4>Filtered Response</h4>
        {Object.keys(filteredResponse).map(key => (
          <div key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}: {filteredResponse[key]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App" style={{ margin: '20px' }}>
      <h1>RA2111033010107</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="jsonInput">API Input</label>
        <input
          id="jsonInput"
          type="text"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data":["M","1","334","4","B"]}'
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
          Submit
        </button>
      </form>

      {response && (
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="multiFilter">Multi Filter</label>
          <Select
            id="multiFilter"
            isMulti
            options={options}
            onChange={(selectedOptions) => setFilter(selectedOptions.map(option => option.value))}
          />
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
