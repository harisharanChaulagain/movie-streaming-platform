import React, { createContext, useContext, useState, ReactNode } from "react";

interface Movie {
  id: number;
  title: string;
  description: string;
  backdrop_path: string;
}

interface SelectedMovieContextProps {
  selectedMovie: Movie;
  setSelectedMovie: (movie: Movie) => void;
}

const defaultMovie: Movie = {
  id: 0,
  title: "Movie Title",
  description: "Movie Description",
  backdrop_path: "",
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
