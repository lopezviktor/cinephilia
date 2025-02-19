package com.movieapp.moviebackend.service;

import com.movieapp.moviebackend.model.Movie;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExternalMovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final String TMDB_URL = "https://api.themoviedb.org/3/search/movie";

    public List<Movie> searchMoviesByTitle(String title) {
        String url = String.format("%s?query=%s&api_key=%s", TMDB_URL, title, apiKey);
        RestTemplate restTemplate = new RestTemplate();

        JsonNode response = restTemplate.getForObject(url, JsonNode.class);
        List<Movie> movies = new ArrayList<>();

        if (response != null && response.has("results")) {
            for (JsonNode result : response.get("results")) {
                Movie movie = new Movie();
                movie.setTitle(result.get("title").asText());
                movie.setDescription(result.get("overview").asText());
                movie.setYear(result.has("release_date") ? Integer.parseInt(result.get("release_date").asText().substring(0, 4)) : 0);
                movie.setRating(result.has("vote_average") ? result.get("vote_average").asDouble() : 0.0);
                movie.setGenre(null); // Podrías mapear los géneros de la API externa a tu enum si lo deseas.
                movies.add(movie);
            }
        }

        return movies;
    }
}