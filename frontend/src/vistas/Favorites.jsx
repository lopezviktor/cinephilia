import React from 'react'
import MovieCard from '../components/MovieCard/MovieCard';
import { useFavorites } from '../context/FavoritesContext';
import genres from '../assets/genres.json';
import platformsData from '../assets/platforms.json';
import './Favorites.css';


function Favorites() {
  const { favorites } = useFavorites();

  const getGenreNames = (genreIds) => {
    if (!Array.isArray(genreIds) || genreIds.length === 0) {
      return "Sin género";
    }
  
    // Convertimos todos los IDs a número para comparación exacta
    const normalizedGenreIds = genreIds.map(id => Number(id));
  
    // Mapeamos los IDs a nombres de géneros
    const genreNames = normalizedGenreIds
      .map(id => {
        const genre = genres.find(g => Number(g.id) === id);
        return genre ? genre.name : null;
      })
      .filter(name => name !== null)  // Elimina los null
      .join(', ');  // Une los nombres en un solo string
  
    return genreNames.length > 0 ? genreNames : "Sin género";
  };

  
  return (
    <div className="favorites-container">
      <h1>Favoritos</h1>
      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map(movie => (
            movie ? (  // Verifica si el favorito existe en el JSON
              <>
                {console.log("Genre IDs en Favorites:", movie.genre_ids)}
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
              </>
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
