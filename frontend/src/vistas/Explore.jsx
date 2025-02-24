import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar/FilterBar';
import MovieCard from '../components/MovieCard/MovieCard';
import genres from '../assets/genres.json';
import movies from '../assets/movies.json';
import platformsData from '../assets/platforms.json';
import './Explore.css';

function Explore() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const genre = queryParams.get('genre');
  const year = queryParams.get('year');
  const rating = queryParams.get('rating');

  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setFilteredMovies(movies); // Inicialmente, mostrar todas las películas
  }, []);

  useEffect(() => {
    let filtered = movies;
  
    if (query) {
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (genre) {
      filtered = filtered.filter(movie => movie.genre_ids.includes(parseInt(genre)));
    }
    
    if (year) {
      filtered = filtered.filter(movie => movie.release_date.startsWith(year));
    }
    
    if (rating) {
      filtered = filtered.filter(movie => parseFloat(movie.rating) >= parseFloat(rating));
    }
    
    // Ordena por rating de mayor a menor
    filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    
    setFilteredMovies(filtered);
  }, [query, genre, year, rating]);

  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : '';
    }).join(', ');
  };

  return (
    <div>
      <h1>Explorar</h1>
      <FilterBar />
      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              id={movie.id} 
              title={movie.title} 
              year={movie.release_date.split('-')[0]} 
              rating={movie.rating} 
              poster={movie.poster_path} 
              platforms={movie.platforms.map(id => 
                platformsData.find(platform => platform.provider_id === id)
              ).filter(platform => platform)} 
              genreNames={getGenreNames(movie.genre_ids)}
            />
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}

export default Explore;