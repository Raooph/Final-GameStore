import { useEffect, useState } from "react";
import "./My-Library.css";

export const MyLibrary = () => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("library")) || [];
    setLibrary(data);
  }, []);

  const removeGame = (id) => {
    const updated = library.filter(game => game.id !== id);
    setLibrary(updated);
    localStorage.setItem("library", JSON.stringify(updated));
  };

  if (library.length === 0) {
    return (
      <div className="library-empty">
        <h1>No Games in Library</h1>
        <p>Buy games to see them here</p>
      </div>
    );
  }

  return (
    <div className="library-page">
      <h1 className="library-title">My Library</h1>

      <div className="library-grid">
        {library.map(game => (
          <div key={game.id} className="library-card">
            <img src={game.background_image} alt={game.name} />

            <div className="library-info">
              <h3>{game.name}</h3>

              <p>Platform: PC</p>
              <p>Playtime: {(Math.random() * 50 + 1).toFixed(1)} hrs</p>

              <div className="library-actions">
                <button className="play-btn">Play</button>
                <button
                  className="remove-btn"
                  onClick={() => removeGame(game.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
