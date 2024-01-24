import axios from "axios";

const AUTH_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTJjMmRmNTVhZGVlZTYxNzk1NDBjMmI5MzlhNmMyNCIsInN1YiI6IjY1YWZjZGM3YmQ1ODhiMDBhZDk2MzFiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GnVtIe2UaNEW6gk0hptaOab1nsmkdfKK9eSAnwPTayI";
const URL_BASE = "https://api.themoviedb.org/3";
const API_KEY = "c12c2df55adeee6179540c2b939a6c24";

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
    const response = await fetchData(endpoint);
    return response;
  } catch (error) {
    console.error(`Could not fetch any movies from ${endpoint}`, error);
    return null;
  }
};
