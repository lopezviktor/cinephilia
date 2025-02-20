import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './FilterBar.css';

function FilterBar() {

    const [genre, setGenre] = useState(''); // genre state
    const [rating, setRating] = useState(''); // rating state
    const [year, setYear] = useState(''); // year state
    const navigate = useNavigate(); // navigate function
    const location = useLocation(); // location object

    const handleFilter = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(location.search);

        if (genre) queryParams.set('genre', genre);
        else queryParams.delete('genre');

        if (year) queryParams.set('year', year);
        else queryParams.delete('year');

        if (rating) queryParams.set('rating', rating);
        else queryParams.delete('rating');

        navigate(`${location.pathname}?${queryParams.toString()}`);
    };
    return (
        <form className="filter-bar" onSubmit={handleFilter}>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Género</option>
        <option value="ACTION">Acción</option>
        <option value="COMEDY">Comedia</option>
        <option value="DRAMA">Drama</option>
        <option value="SCI_FI">Ciencia Ficción</option>
        <option value="ROMANCE">Romance</option>
        <option value="THRILLER">Thriller</option>
      </select>

      <input 
        type="number" 
        placeholder="Año" 
        value={year} 
        onChange={(e) => setYear(e.target.value)} 
        min="1900" 
        max={new Date().getFullYear()} 
      />

      <input 
        type="number" 
        placeholder="Calificación mínima" 
        value={rating} 
        onChange={(e) => setRating(e.target.value)} 
        min="0" 
        max="10" 
        step="0.1" 
      />

      <button type="submit">Aplicar</button>
    </form>
  );
}

export default FilterBar;
