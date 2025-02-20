import React from 'react'
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <h2>Cinephilia 🎬</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explorar</Link></li>
        <li><Link to="/favorites">Favoritos</Link></li>
        <li><Link to="/profile">Perfil</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
