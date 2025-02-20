import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import { useFavorites } from '../../context/FavoritesContext';


function MovieCard({ id, title, year, rating, poster }) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(id);

    const handleFavorite = () => {
        if (isFav) {
        removeFavorite(id);
        } else {
        addFavorite({ id, title, year, rating, poster });
        }
    };
  
    return (
        <div className="movie-card">
        <Link to={`/movie/${id}`}>
          <img 
            src={poster || 'https://via.placeholder.com/200x300'} 
            alt={title} 
            className="movie-poster" 
          />
        </Link>
        <div className="movie-info">
          <h3>{title}</h3>
          <p>{year}</p>
          <p>⭐ {rating}</p>
        </div>
        <button 
          className={`favorite-button ${isFav ? 'active' : ''}`} 
          onClick={handleFavorite}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
  )
}

export default MovieCard;
