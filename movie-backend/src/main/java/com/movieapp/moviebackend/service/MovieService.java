package com.movieapp.moviebackend.service;


import com.movieapp.moviebackend.model.Movie;
import com.movieapp.moviebackend.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // Obtener todas las películas
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // Obtener una película por su ID
    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    // Crear una nueva película
    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    // Actualizar una película existente
    public Optional<Movie> updateMovie(Long id, Movie updatedMovie) {
        return movieRepository.findById(id).map(movie -> {
            movie.setTitle(updatedMovie.getTitle());
            movie.setGenre(updatedMovie.getGenre());
            movie.setYear(updatedMovie.getYear());
            movie.setRating(updatedMovie.getRating());
            movie.setDescription(updatedMovie.getDescription());
            return movieRepository.save(movie);
        });
    }

    // Eliminar una película por su ID
    public boolean deleteMovie(Long id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Búsqueda personalizada: Películas por género
    public List<Movie> getMoviesByGenre(String genre) {
        return movieRepository.findByGenre(genre);
    }

    // Búsqueda personalizada: Películas por título (contiene)
    public List<Movie> getMoviesByTitle(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }

    // Búsqueda personalizada: Películas con calificación mayor o igual a un valor
    public List<Movie> getMoviesByRating(double rating) {
        return movieRepository.findByRatingGreaterThanEqual(rating);
    }

    // Búsqueda personalizada: Películas por año
    public List<Movie> getMoviesByYear(int year) {
        return movieRepository.findByYear(year);
    }
}
