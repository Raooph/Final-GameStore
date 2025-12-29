import "./Categories.css";
export const Categories=({activeCategory, setActiveCategory, genres})=>{      
    return (
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
    )
}