import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h2>Cinephilia 🎬</h2>
      <ul className={menuOpen ? 'active' : ''}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explorar</Link></li>
        <li><Link to="/favorites">Favoritos</Link></li>
        <li><Link to="/profile">Perfil</Link></li>
      </ul>
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;