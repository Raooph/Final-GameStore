import { useState, useEffect } from 'react';
import './Home.css';
import { fetchGames, fetchGenres } from '../../service/app';
import { Categories } from '../../components/Categories/Categories';
import { GameCard } from '../../components/Game-Card/Game-Card';
import { SearchBox } from '../../components/Search-Box/Search-Box';
import { Loader } from '../../components/Loader/Loader';

export const Home=()=>{
  const [activeCategory, setActiveCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  useEffect(() => {
   setLoading(true);
    const timer = setTimeout(async () => {
      const data = await fetchGames({ searchTerm, activeCategory, page: currentPage });
      setGames(data.results);
      setTotalPages(Math.ceil(data.count / 12));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, activeCategory, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

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
          <Loader/>
        ) : (
          <>
            <div className="games-grid">
              {games.map((game) => (
                  <GameCard  key={game.id} game={game} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-arrow"
                >
                  ←
                </button>
                
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`dots-${index}`} className="pagination-dots">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  )
                ))}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-arrow"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Home;