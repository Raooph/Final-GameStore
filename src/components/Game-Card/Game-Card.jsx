import "./Game-Card.css";
export const GameCard=({game})=>{
    return (
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
    )
}