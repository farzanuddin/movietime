import axios from "axios";
import { AUTH_KEY, URL_BASE } from "./constants";

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
