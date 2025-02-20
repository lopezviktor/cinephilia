import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import MovieCard from '../components/MovieCard/MovieCard';

function Home() {
  return (
    <div className="home-container">
      <SearchBar />
      <h2>Películas y Series Populares</h2>
      <div className="movies-grid">
        <MovieCard 
            id="1"
            title="The Matrix" 
            year="1999" 
            rating="8.7" 
            poster="https://via.placeholder.com/200x300" 
          />
          <MovieCard 
            id="2"
            title="Inception" 
            year="2010" 
            rating="8.8" 
            poster="https://via.placeholder.com/200x300" 
          />
          <MovieCard 
            id="3"
            title="Breaking Bad" 
            year="2008" 
            rating="9.5" 
            poster="https://via.placeholder.com/200x300" 
          />
      </div>
    </div>
  );
}

export default Home;
