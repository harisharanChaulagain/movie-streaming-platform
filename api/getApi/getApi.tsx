import { useQuery } from "react-query";
import axios from "axios";
import { Movie } from "@/components/MovieCarousel";

const API_KEY = "5fa7d14ab8dfcf5ffb154251dbe152ca";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}`
  );
  return data.results;
};

export const useFetchMovies = () => {
  return useQuery<Movie[]>("movies", fetchMovies);
};

export const useSearchMovies = (query: string | undefined) => {
  const { data: movies = [] } = useFetchMovies();

  const searchResults = query
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
    : movies;

  return {
    searchResults,
    isLoading: false,
  };
};
