import { useEffect, useState } from "react";
import "./My-Library.css";

export const MyLibrary = () => {
  const [library, setLibrary] = useState([]);
  const [filter, setFilter] = useState("none");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("library")) || [];
    setLibrary(data);
  }, []);

  const removeGame = (id) => {
    const updatedLibrary = library.filter((game) => game.id !== id);
    setLibrary(updatedLibrary);
    localStorage.setItem("library", JSON.stringify(updatedLibrary));
  };

  const totalPlaytime = library.reduce(
    (sum, game) => sum + (game.playtime || Math.random() * 50 + 1),
    0
  ).toFixed(1);

  const sortedLibrary = [...library];
  if (filter === "rating") {
    sortedLibrary.sort((a, b) => b.rating - a.rating);
  } else if (filter === "released") {
    sortedLibrary.sort(
      (a, b) => new Date(b.released) - new Date(a.released)
    );
  }

  if (library.length === 0) {
    return (
      <div className="library-empty">
        <h1>No Games in Library</h1>
        <p>You haven’t bought any games yet</p>
      </div>
    );
  }

  return (
    <div className="library-page">
      <h1 className="library-title">My Library</h1>

      <div className="library-info-bar">
        <p>Total Games: {library.length}</p>
        <p>Total Playtime: {totalPlaytime} hrs</p>
        <div className="sort-buttons">
          <button onClick={() => setFilter("none")}>Default</button>
          <button onClick={() => setFilter("rating")}>Sort by Rating</button>
          <button onClick={() => setFilter("released")}>Sort by Release</button>
        </div>
      </div>

      <div className="library-grid">
        {sortedLibrary.map((game) => (
          <div key={game.id} className="library-card">
            <img src={game.background_image} alt={game.name} />

            <div className="library-info">
              <h3>{game.name}</h3>
              <p><span>Release:</span> {game.released}</p>
              <p><span>Rating:</span> ⭐ {game.rating}</p>
              <p>
                <span>Genres:</span>{" "}
                {game.genres
                  ? game.genres.map(g => g.name).join(", ")
                  : "Unknown"}
              </p>
              <p>
                <span>Playtime:</span>{" "}
                {(game.playtime || Math.random() * 60 + 5).toFixed(1)} hrs
              </p>

              <div className="card-overlay">
                <p>{game.description_raw?.slice(0, 100)}...</p>
              </div>

              <div className="library-actions">
                <button className="play-btn">Play</button>
                <button
                  className="remove-btn"
                  onClick={() => removeGame(game.id)}
                >
                  Remove
                </button>
              </div>

              <div className="library-footer">
                <span>Owned</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
