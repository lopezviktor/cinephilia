import React from 'react'
import MovieCard from '../components/MovieCard/MovieCard';
import { useFavorites } from '../context/FavoritesContext';
import './Favorites.css';


function Favorites() {
  const { favorites } = useFavorites();
  
  return (
  <div className="favorites-container">
      <h1>Favoritos ⭐</h1>
      {favorites.length > 0 ? (
        <div className="movies-grid">
          {favorites.map(movie => (
            <MovieCard 
              key={movie.id} 
              id={movie.id} 
              title={movie.title} 
              year={movie.year} 
              rating={movie.rating} 
              poster={movie.poster} 
            />
          ))}
        </div>
      ) : (
        <p>No tienes favoritos todavía.</p>
      )}
    </div>
  );
}

export default Favorites
