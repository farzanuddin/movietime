import axios from "axios";

const AUTH_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTJjMmRmNTVhZGVlZTYxNzk1NDBjMmI5MzlhNmMyNCIsInN1YiI6IjY1YWZjZGM3YmQ1ODhiMDBhZDk2MzFiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GnVtIe2UaNEW6gk0hptaOab1nsmkdfKK9eSAnwPTayI";
const URL_BASE = "https://api.themoviedb.org/3";

const fetchData = async (endpoint) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTH_KEY}`,
    },
  };
  const constructedUrl = URL_BASE + endpoint;
  try {
    const response = await axios.get(constructedUrl, options);

    if (response.status !== 200) {
      throw new Error("Network response failed");
    }

    return response.data;
  } catch (error) {
    console.error(`Error during data fetching for endpoint ${endpoint}`, error.message);
    throw error;
  }
};

export const getMovies = async (endpoint) => {
  try {
    const response = await fetchData(`${endpoint}`);
    return response;
  } catch (error) {
    console.error(`Could not fetch any movies from ${endpoint}`, error);
    return null;
  }
};

const mapGenreIdsToNames = async (genreIds) => {
  try {
    const genreResponse = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_KEY}`,
        },
      }
    );

    const genreMap = new Map(genreResponse.data.genres.map((genre) => [genre.id, genre.name]));

    const mappedGenres = genreIds.map((genreId) => {
      return {
        id: genreId,
        name: genreMap.get(genreId),
      };
    });

    return mappedGenres;
  } catch (error) {
    console.error("Error mapping genre IDs to names", error.message);
    throw error;
  }
};

export const getMoviesWithGenres = async (endpoint) => {
  try {
    const response = await fetchData(endpoint);

    if (response && response.results) {
      // Extract genre IDs from the movie data
      const genreIds = response.results.flatMap((movie) => movie.genre_ids);

      // Map genre IDs to names
      const mappedGenres = await mapGenreIdsToNames(genreIds);

      // Add the mapped genres back to the movie data
      const moviesWithGenres = response.results.map((movie) => ({
        ...movie,
        genres: movie.genre_ids.map((genreId) =>
          mappedGenres.find((genre) => genre.id === genreId)
        ),
      }));

      return { ...response, results: moviesWithGenres };
    }

    return null;
  } catch (error) {
    console.error("Could not fetch movies with genres", error);
    return null;
  }
};
