import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar/FilterBar';
import MovieCard from '../components/MovieCard/MovieCard';
import './Explore.css';

// Películas de ejemplo (puedes reemplazar esto con una llamada a la API más adelante)
const allMovies = [
  {
    id: 1,
    title: 'The Matrix',
    year: '1999',
    rating: '8.7',
    genre: 'SCI_FI',
    poster: 'https://via.placeholder.com/200x300'
  },
  {
    id: 2,
    title: 'Inception',
    year: '2010',
    rating: '8.8',
    genre: 'SCI_FI',
    poster: 'https://via.placeholder.com/200x300'
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    year: '1994',
    rating: '8.9',
    genre: 'DRAMA',
    poster: 'https://via.placeholder.com/200x300'
  },
  {
    id: 4,
    title: 'The Dark Knight',
    year: '2008',
    rating: '9.0',
    genre: 'ACTION',
    poster: 'https://via.placeholder.com/200x300'
  }
];

function Explore() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const genre = queryParams.get('genre');
  const year = queryParams.get('year');
  const rating = queryParams.get('rating');

  const [filteredMovies, setFilteredMovies] = useState(allMovies);

  useEffect(() => {
    // Filtrado dinámico
    let movies = allMovies;

    if (query) {
      movies = movies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (genre) {
      movies = movies.filter(movie => movie.genre === genre);
    }

    if (year) {
      movies = movies.filter(movie => movie.year === year);
    }

    if (rating) {
      movies = movies.filter(movie => parseFloat(movie.rating) >= parseFloat(rating));
    }

    setFilteredMovies(movies);
  }, [query, genre, year, rating]);

  return (
    <div>
      <h1>Explorar 🎥</h1>
      <FilterBar />
      <p>Resultados de búsqueda para: <strong>{query}</strong></p>
      <p>Género: {genre || 'Todos'}</p>
      <p>Año: {year || 'Cualquiera'}</p>
      <p>Calificación mínima: {rating || 'Ninguna'}</p>
      
      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              id={movie.id} 
              title={movie.title} 
              year={movie.year} 
              rating={movie.rating} 
              poster={movie.poster} 
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