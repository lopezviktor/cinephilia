import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import movies from '../assets/movies.json';
import genres from '../assets/genres.json';
import platformsData from '../assets/platforms.json';
import './MovieDetails.css';

const getGenreNames = (genreIds) => {
  if (!Array.isArray(genreIds) || genreIds.length === 0) {
    return "Sin género";
  }

  return genreIds
    .map(id => {
      const genre = genres.find(g => Number(g.id) === Number(id));
      return genre ? genre.name : null;
    })
    .filter(name => name !== null)
    .join(', ');
};

const getPlatformDetails = (platformIds) => {
  if (!Array.isArray(platformIds) || platformIds.length === 0) {
    return [];
  }

  return platformIds
    .map(id => platformsData.find(platform => platform.provider_id === id))
    .filter(platform => platform);
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === Number(id));
    setMovie(foundMovie);
  }, [id]);

  if (!movie) {
    return <p>Cargando detalles de la película...</p>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>Año: {movie.year}</p>
          <p>Valoración: {movie.rating}</p>
          <p>Géneros: {getGenreNames(movie.genre_ids)}</p>
          <div className="platforms">
            <p>Disponible en:</p>
            {getPlatformDetails(movie.platforms).map((platform) => (
              <img 
                key={platform.provider_id}
                src={platform.logo_path} 
                alt={platform.provider_name} 
                className="platform-logo"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="movie-details-body">
        <h2>Sinopsis</h2>
        <p>{movie.overview || "Sin sinopsis disponible."}</p>
      </div>
    </div>
  );
};

export default MovieDetails;