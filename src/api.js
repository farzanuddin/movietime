import axios from "axios";
import { AUTH_KEY, URL_BASE } from "./constants";

const cache = {};

const fetchData = async (endpoint) => {
  if (typeof endpoint !== "string" || endpoint.trim() === "") {
    throw new Error("Invalid endpoint");
  }

  if (cache[endpoint]) {
    return cache[endpoint];
  }

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
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    cache[endpoint] = response.data;
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}`, error.message);
    throw error;
  }
};

export const getDataFromAPI = async (endpoint, query = "") => {
  try {
    const response = await fetchData(`${endpoint}${query && `?query=${query}`}`);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};

const mapGenreIdsToNames = async (genreIds) => {
  try {
    const genreResponse = await getDataFromAPI("/genre/movie/list", "language=en");

    const genreMap = new Map(genreResponse?.genres?.map((genre) => [genre.id, genre.name]));

    const mappedGenres = genreIds?.map((genreId) => ({
      id: genreId,
      name: genreMap.get(genreId),
    }));

    return mappedGenres;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMoviesWithGenres = async (endpoint) => {
  try {
    const response = await fetchData(endpoint);

    if (!response || !response.results) {
      throw new Error("Invalid response format");
    }

    const genreIds = response.results.flatMap((movie) => movie.genre_ids);
    const mappedGenres = await mapGenreIdsToNames(genreIds);
    const moviesWithGenres = response?.results?.map((movie) => ({
      ...movie,
      genres: movie?.genre_ids?.map((genreId) => mappedGenres.find((genre) => genre.id === genreId)),
    }));

    return { ...response, results: moviesWithGenres };
  } catch (error) {
    console.error(error);
    return;
  }
};

export const mapActorDetails = async (actorId) => {
  try {
    const res = await fetchData(`/person/${actorId}`);
    const mappedActorDetails = {
      name: res.name,
      birth: res.place_of_birth,
      profile: res.profile_path,
      popularity: res.popularity,
    };
    return mappedActorDetails;
  } catch (error) {
    console.error(error);
  }
};
