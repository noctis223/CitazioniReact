import React, { useState, useEffect } from 'react';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#3498db'); // Colore predefinito
  const [newBackgroundColor, setNewBackgroundColor] = useState(null);

  useEffect(() => {
    if (newBackgroundColor !== null) {
      // Cambia il colore di sfondo con effetto di transizione
      setBackgroundColor(newBackgroundColor);

      const timeoutId = setTimeout(() => {
        setBackgroundColor(getRandomColor()); 
      }, 700); // Regola la durata della transizione (in millisecondi)

      return () => clearTimeout(timeoutId);
    }
  }, [newBackgroundColor]);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);

      setNewBackgroundColor(getRandomColor());
    } catch (error) {
      console.error('Errore nel recupero della citazione:', error);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <div className="container text-center mt-5">
      <div
        id="quote-box"
        style={{
          background: backgroundColor,
          transition: 'background 0.5s ease-in-out',
          padding: '20px',
          borderRadius: '8px', // Aggiunge un bordo arrotondato
        }}
      >
        <div id="text" className="mb-3">
          {quote}
        </div>
        <div id="author" className="mb-3">
          - {author}
        </div>
      </div>
      <button
        id="new-quote"
        className="btn btn-primary mr-2"
        onClick={handleNewQuote}
      >
        Nuova Citazione
      </button>
      <a
        id="tweet-quote"
        className="btn btn-info"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `"${quote}" - ${author}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet Citazione
      </a>
    </div>
  );
}

export default App;



console.log('hello world')