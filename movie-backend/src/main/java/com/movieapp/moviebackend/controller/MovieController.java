package com.movieapp.moviebackend.controller;

import com.movieapp.moviebackend.model.Movie;
import com.movieapp.moviebackend.service.ExternalMovieService;
import com.movieapp.moviebackend.service.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;
    private final ExternalMovieService externalMovieService;


    public MovieController(MovieService movieService, ExternalMovieService externalMovieService) {
        this.movieService = movieService;
        this.externalMovieService = externalMovieService;
    }

    // Búsqueda de películas usando tanto la base de datos local como la API externa
    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String title, @RequestParam(defaultValue = "false") boolean external) {
        List<Movie> movies = new ArrayList<>();

        // Si external=true, consultar la API externa
        if (external) {
            movies.addAll(externalMovieService.searchMoviesByTitle(title));
        } else {
            // Si no, buscar en la base de datos local
            movies.addAll(movieService.getMoviesByTitle(title));
        }

        return ResponseEntity.ok(movies);
    }


    // Obtener todas las películas
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return ResponseEntity.ok(movies);
    }

    // Obtener una película por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Optional<Movie> movie = movieService.getMovieById(id);
        return movie.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Crear una nueva película
    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        Movie savedMovie = movieService.createMovie(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovie);
    }

    // Actualizar una película existente
    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie updatedMovie) {
        Optional<Movie> updated = movieService.updateMovie(id, updatedMovie);
        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Eliminar una película por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        if (movieService.deleteMovie(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Búsqueda personalizada: Películas por género
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Movie>> getMoviesByGenre(@PathVariable String genre) {
        List<Movie> movies = movieService.getMoviesByGenre(genre);
        return ResponseEntity.ok(movies);
    }

    // Búsqueda personalizada: Películas con calificación mayor o igual a un valor
    @GetMapping("/rating/{rating}")
    public ResponseEntity<List<Movie>> getMoviesByRating(@PathVariable double rating) {
        List<Movie> movies = movieService.getMoviesByRating(rating);
        return ResponseEntity.ok(movies);
    }

    // Búsqueda personalizada: Películas por año
    @GetMapping("/year/{year}")
    public ResponseEntity<List<Movie>> getMoviesByYear(@PathVariable int year) {
        List<Movie> movies = movieService.getMoviesByYear(year);
        return ResponseEntity.ok(movies);
    }
}
