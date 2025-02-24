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
          src={poster || 'https://picsum.photos/200/300'} 
          alt={title} 
          className="movie-poster" 
        />
        <div className="movie-info">
          <h3>{title}</h3>
          <p>{year}</p>
          <p>⭐ {rating}</p>
          <p>Géneros: {genreNames}</p>  {/* ⬅️ Muestra los géneros */}
        </div>
        <StreamerAvailability platforms={platforms} />  {/* ⬅️ Pasa las plataformas */}
        <button 
          className="favorite-button" 
          onClick={handleFavorite}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
    );
}

export default MovieCard;
