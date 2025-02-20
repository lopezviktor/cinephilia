import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/explore?query=${query}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input 
        type="text" 
        placeholder="Buscar películas o series..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;