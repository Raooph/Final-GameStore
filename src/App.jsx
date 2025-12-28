import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  
  const API_KEY = 'f40d210066494ecfbba32ff5b312d384';
  const BASE_URL = 'https://api.rawg.io/api';

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
        const data = await response.json();
        setGenres(data.results.slice(0, 4));
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        let url = `${BASE_URL}/games?key=${API_KEY}&page_size=12`;
        
        if (searchTerm) {
          url += `&search=${searchTerm}`;
        }
        
        if (activeCategory) {
          url += `&genres=${activeCategory}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchGames();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, activeCategory]);

  return (
    <>
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">NEXUS</div>
            <nav>
              <a href="#">Store</a>
              <a href="#">Library</a>
              <a href="#">Community</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Welcome to Game Store</h1>
          <p>Search games and find your favorite!</p>
          
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search for games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        <div className="categories">
          <button
            className={`category-btn ${activeCategory === '' ? 'active' : ''}`}
            onClick={() => setActiveCategory('')}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`category-btn ${activeCategory === genre.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading games...</div>
        ) : (
          <div className="games-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card">
                <div 
                  className="game-img" 
                  style={{ 
                    backgroundImage: game.background_image 
                      ? `url(${game.background_image})` 
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {game.metacritic && (
                    <span className="badge">{game.metacritic}</span>
                  )}
                </div>
                <div className="game-info">
                  <div className="game-title">{game.name}</div>
                  <div className="game-genre">
                    {game.genres?.map(g => g.name).join(', ') || 'Various'}
                  </div>
                  <div className="game-footer">
                    <span className="rating">
                      ★ {game.rating || 'N/A'}
                    </span>
                    <span className="price">
                      {game.released ? new Date(game.released).getFullYear() : 'TBA'}
                    </span>
                  </div>
                  <button className="buy-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;