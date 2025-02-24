import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieCard from '../components/MovieCard/MovieCard';
import movies from '../assets/movies.json';
import genres from '../assets/genres.json';
import platformsData from '../assets/platforms.json';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    // Filtra las películas populares (por ejemplo, rating mayor a 8.5)
    const popular = movies.filter(movie => parseFloat(movie.rating) > 8.5);
    setPopularMovies(popular);
  }, []);

  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : '';
    }).join(', ');
  };

  return (
    <div className="home-container">
      <SearchBar />
      <h2>Películas y Series Populares</h2>
      <div className="movie-grid">
        {popularMovies.length > 0 ? (
          popularMovies.map(movie => (
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
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
}

export default Home;