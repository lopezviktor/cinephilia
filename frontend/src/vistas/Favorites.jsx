import React from 'react'
import MovieCard from '../components/MovieCard/MovieCard';
import { useFavorites } from '../context/FavoritesContext';
import genres from '../assets/genres.json';
import './Favorites.css';


function Favorites() {
  const { favorites } = useFavorites();

  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : '';
    }).join(', ');
  };
  
  return (
    <div className="favorites-container">
      <h1>Favoritos ⭐</h1>
      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map(movie => (
            movie ? (  // Verifica si el favorito existe en el JSON
              <MovieCard 
                key={movie.id} 
                id={movie.id} 
                title={movie.title} 
                year={movie.year} 
                rating={movie.rating} 
                poster={movie.poster} 
                platforms={Array.isArray(movie.platforms) ? movie.platforms : []}
                genreNames={getGenreNames(movie.genre_ids || [])}
              />
            ) : (
              <p>Esta película ya no está disponible.</p>
            )
          ))}
        </div>
      ) : (
        <p>No tienes favoritos todavía.</p>
      )}
    </div>
  );
}

export default Favorites
