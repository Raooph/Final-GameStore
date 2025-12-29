import { useState, useEffect } from 'react';
import './Home.css';
import { fetchGames, fetchGenres } from '../../service/app';
import { Categories } from '../../components/Categories/Categories';
import { GameCard } from '../../components/Game-Card/Game-Card';
import { SearchBox } from '../../components/Search-Box/Search-Box';
export const Home=()=>{
  const [activeCategory, setActiveCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  
  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
   setLoading(true);
    const timer = setTimeout(async () => {
      const data = await fetchGames({ searchTerm, activeCategory });
      setGames(data);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, activeCategory]);

  return (
    <>
      <main className="container">
        <section className="hero">
          <h1>Welcome to Game Store</h1>
          <p>Search games and find your favorite!</p>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </section>

        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          genres={genres}
        />

        {loading ? (
          <div className="loading">Loading games...</div>
        ) : (
          <div className="games-grid">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Home;