import "./Game-Card.css";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const GameCard=({game})=>{
  const [addToWishList,setAddToWishList]=useState(false);
  const navigate=useNavigate();
  const goToDetails=()=>{
    navigate(`/game/${game.id}`)
  }
  
  useEffect(()=>{
    const wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];
    const isInWishlist=wishlist.some(item=>item.id===game.id);
    setAddToWishList(isInWishlist);
  },[game.id]);

  const addingToList=()=>{
    const wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];
    if(!addToWishList){
      wishlist.push(game);
      localStorage.setItem("wishlist",JSON.stringify(wishlist));
      setAddToWishList(true);
  }else{
    const updatedWishlist=wishlist.filter(item=>item.id!==game.id);
    localStorage.setItem("wishlist",JSON.stringify(updatedWishlist));
    setAddToWishList(false);
  }
}
    return (
        <div key={game.id} onClick={goToDetails} className="game-card">
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
                    <span onClick={addingToList} className="badge"><CiHeart size={22} style={{ display:` ${addToWishList ? "none":"block"}`}} /></span>
                    <span onClick={addingToList} className="badge"><FaHeart className="redHeart" size={19} style={{ display:` ${addToWishList ? "block":"none"}`}} /></span>
                  
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