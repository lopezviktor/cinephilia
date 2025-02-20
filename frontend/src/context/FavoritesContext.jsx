import React, { createContext, useState, useContext, useEffect } from 'react';

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
        setFavorites((prevFavorites) => [...prevFavorites, movie]);
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