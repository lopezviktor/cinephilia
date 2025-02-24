import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import { useFavorites } from '../../context/FavoritesContext';
import StreamerAvailability from '../../components/StreamerAvailability/StreamerAvailability';

function MovieCard({ id, title, year, rating, poster, platforms, genreNames }) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(id);

    const handleFavorite = () => {
      if (isFav) {
      removeFavorite(id);
      } else {
      addFavorite({ id, title, year, rating, poster, platforms, genreNames });
      }
    };
  
    return (
      <div className="movie-card">
        <img 
          src={poster || 'https://via.placeholder.com/200x300'} 
          alt={title} 
          className="movie-poster" 
        />
        <div className="movie-info">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-year">{year}</p>
          <p className="movie-rating">⭐ {rating}</p>
          <p className="movie-genres">Géneros: {genreNames}</p>  
        </div>
        <StreamerAvailability platforms={platforms.filter(platform => platform)} />        
        <button 
          className={`favorite-button ${isFav ? 'fav-active' : ''}`} 
          onClick={handleFavorite}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
    );
}

export default MovieCard;