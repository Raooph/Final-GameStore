import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Card-Details.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { NotFound } from "../Not-Found/Not-Found";
import { Loader } from "../../components/Loader/Loader";

const API_KEY = "f40d210066494ecfbba32ff5b312d384";

export const CardDetails = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        const data = await res.json();

        if (data.detail === "Not found.") {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setGame(data);

        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const exists = wishlist.find(item => item.id === data.id);
        setIsInWishlist(!!exists);
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) return <Loader/>;

  if (notFound) {
    return (
      <NotFound/>
    );
  }

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!isInWishlist) {
      wishlist.push(game);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsInWishlist(true);
    } else {
      const updated = wishlist.filter(item => item.id !== game.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsInWishlist(false);
    }
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <img src={game.background_image} alt={game.name} />

        <div className="details-info">
          <h1>{game.name}</h1>

          <p className="meta">
            ⭐ {game.rating} / 5 · {game.released}
          </p>

          <p className="genres">
            {game.genres?.map(g => g.name).join(", ")}
          </p>
          <button className="wishlist-btn" onClick={toggleWishlist}>
            {isInWishlist ? (
              <>
                <FaHeart className="heart red" /> Remove from Wishlist
              </>
            ) : (
              <>
                <CiHeart className="heart" /> Add to Wishlist
              </>
            )}
          </button>
        </div>
      </div>

      <div className="details-body">
        <h3>About the game</h3>
        <p>{game.description_raw}</p>
      </div>
    </div>
  );

};
