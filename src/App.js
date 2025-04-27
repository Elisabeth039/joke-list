import React, { useState } from 'react';
import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);

  const getJoke = async () => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Не удалось загрузить шутку');
      const data = await response.json();
      const newJoke = `${data.setup} - ${data.punchline}`;
      setJokes(prevJokes => [...prevJokes, newJoke]);
    } catch (error) {
      console.log('Ошибка:', error.message);
    }
  };

  const getShortJokes = async () => {
    let shortJokes = [];
    while (shortJokes.length < 5 ) {
      try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok) throw new Error('Не удалось загрузить шутку');
        const data = await response.json();
        const newJoke = `${data.setup} - ${data.punchline}`;
        if (newJoke.length < 100) { // Только короткие шутки
          shortJokes.push(newJoke);
        }
      } catch (error) {
        console.log('Ошибка:', error.message);
        break; // Выходим из цикла при ошибке
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
      <h1>Список шуток</h1>
      <div className="button-group">
        <button onClick={getJoke}>Получить шутку</button>
        <button onClick={getShortJokes}>Получить 5 коротких шуток</button>
        <button onClick={clearJokes}>Очистить</button>
      </div>
      {jokes.length === 0 ? (
        <p>Нажми кнопку, чтобы увидеть шутку!</p>
      ) : (
        <ul>
          {jokes.map((joke, index) => (
            <li key={index}>
              <span>{joke}</span>
              <button onClick={() => deleteJoke(index)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;