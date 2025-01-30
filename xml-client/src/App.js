import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [xmlData, setXmlData] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch the XML file from the public folder
      const response = await fetch('/long-conversation.xml');
      const xmlText = await response.text();
      setXmlData(xmlText);
      setShowResponse(true);

      // Create a Blob containing the XML
      const blob = new Blob([xmlText], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'long-conversation.xml';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching XML file');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>XML Generator</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <button type="submit">Get XML</button>
          </form>
        </div>
        {showResponse && xmlData && (
          <div className="response-container">
            <h2>XML Content:</h2>
            <pre>{xmlData}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;