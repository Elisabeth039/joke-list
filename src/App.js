import React, { useState } from 'react';
import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);

  const getJoke = async () => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Failed to load a joke');
      const data = await response.json();
      const newJoke = `${data.setup} - ${data.punchline}`;
      setJokes(prevJokes => [...prevJokes, newJoke]);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const getShortJokes = async () => {
    let shortJokes = [];
    while (shortJokes.length < 5 ) {
      try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok) throw new Error('Failed to load a joke');
        const data = await response.json();
        const newJoke = `${data.setup} - ${data.punchline}`;
        if (newJoke.length < 100) { 
          shortJokes.push(newJoke);
        }
      } catch (error) {
        console.log('Error:', error.message);
        break;
      }
    }
    setJokes(prevJokes => [...prevJokes, ...shortJokes]);
  };

  const deleteJoke = (index) => {
    const newJokes = jokes.filter((_, i) => i !== index);
    setJokes(newJokes);
  };

  const clearJokes = () => {
    setJokes([]);
  };

  return (
    <div className="app">
      <h1>Joke list</h1>
      <div className="button-group">
        <button onClick={getJoke}>Get 1 joke</button>
        <button onClick={getShortJokes}>Get 5 short jokes</button>
        <button onClick={clearJokes}>Clear</button>
      </div>
      {jokes.length === 0 ? (
        <p>Press to see a joke!</p>
      ) : (
        <ul>
          {jokes.map((joke, index) => (
            <li key={index}>
              <span>{joke}</span>
              <button onClick={() => deleteJoke(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;