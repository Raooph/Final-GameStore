import { useEffect, useState } from "react";
import "./Wishlist.css";
import { GameCard } from "../../components/Game-Card/Game-Card";
export const Wishlist=()=>{
    const [wishlistGames,setWishlistGames]=useState([]);
    useEffect(()=>{
        const wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];
        setWishlistGames(wishlist);
    },[])
    return (
        <div className="container">
            <h1>My Wishlist</h1>
            {wishlistGames.length===0 ? ((
        <p>Your wishlist is empty. Add some games!</p>
      )):(
        <div className="wishlist-grid">
            {wishlistGames.map((game)=>{
            return(
                    <GameCard key={game.id} game={game}/>)
        })}
            </div>
      )}
        </div>
    )
}