import React, { createContext, useState, useContext, useEffect } from 'react';
import genres from '../assets/genres.json';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie) => {
        // Si `genre_ids` no existe, intenta obtenerlo de `genreNames`
        const genreIdsFromNames = movie.genreNames 
            ? movie.genreNames.split(', ').map(name => {
                const genre = genres.find(g => g.name === name);
                return genre ? Number(genre.id) : null;
            }).filter(id => id !== null)
            : [];
    
        const movieToSave = {
            ...movie,
            genre_ids: Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0
                ? movie.genre_ids.map(id => Number(id))  // Asegura que sean números
                : genreIdsFromNames  // Si no hay `genre_ids`, intenta obtenerlos de `genreNames`
        };
    
        console.log("Guardando en favoritos:", movieToSave);
    
        setFavorites((prevFavorites) => {
            if (!prevFavorites.some(fav => fav.id === movie.id)) {
                return [...prevFavorites, movieToSave];
            }
            return prevFavorites;
        });
    };

    const removeFavorite = (id) => {
        setFavorites((prevFavorites) => 
            prevFavorites.filter(movie => movie.id !== id)
        );
    };

    const isFavorite = (id) => {
        return favorites.some(movie => movie.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    return useContext(FavoritesContext);
};