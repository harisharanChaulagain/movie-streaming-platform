import { useQuery } from "react-query";
import axios from "axios";

const API_KEY = "5fa7d14ab8dfcf5ffb154251dbe152ca";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
  return data.results;
};

export const useFetchMovies = () => {
  return useQuery("movies", fetchMovies);
};
