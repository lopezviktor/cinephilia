import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../vistas/Home';
import Explore from '../vistas/Explore';
import MovieDetail from '../vistas/MovieDetails';
import Favorites from '../vistas/Favorites';
import Profile from '../vistas/Profile';
import Navbar from '../components/Navbar/Navbar';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/explore" element={<Explore />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore/:genre?" element={<Explore />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;