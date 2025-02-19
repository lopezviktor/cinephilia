package com.movieapp.moviebackend.repository;

import com.movieapp.moviebackend.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    // Encontrar peliculas por genero
    List<Movie>findByGenre(String genre);

    // Buscar películas por título (ignorando mayúsculas/minúsculas)
    List<Movie> findByTitleContainingIgnoreCase(String title);

    // Listar películas con una calificación superior a un valor dado
    List<Movie> findByRatingGreaterThanEqual(double rating);

    // Buscar películas por año de lanzamiento
    List<Movie> findByYear(int year);
}
