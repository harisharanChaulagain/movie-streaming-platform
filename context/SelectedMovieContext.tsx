import React, { createContext, useContext, useState, ReactNode } from "react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average:number
}

interface SelectedMovieContextProps {
  selectedMovie: Movie;
  setSelectedMovie: (movie: Movie) => void;
}

const defaultMovie: Movie = {
  id: 0,
  title: "Movie Title",
  overview: "Movie Description",
  backdrop_path: "",
  vote_average:10
};

const SelectedMovieContext = createContext<SelectedMovieContextProps>({
  selectedMovie: defaultMovie,
  setSelectedMovie: () => {},
});

export const SelectedMovieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(defaultMovie);

  return (
    <SelectedMovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </SelectedMovieContext.Provider>
  );
};

export const useSelectedMovie = () => useContext(SelectedMovieContext);
