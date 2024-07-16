"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import MovieCarousel from "./MovieCarousel";
import { useFetchMovies } from "@/api/getApi/getApi";
import { useSelectedMovie } from "@/context/SelectedMovieContext";

const HeroSection: React.FC = () => {
  const { data: movies, isLoading } = useFetchMovies();
  const { selectedMovie, setSelectedMovie } = useSelectedMovie();

  useEffect(() => {
    if (movies && movies.length > 0) {
      setSelectedMovie(movies[0]);
    }
  }, [movies, setSelectedMovie]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen">
      {selectedMovie.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w1280${selectedMovie.backdrop_path}`}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 h-full w-full object-contain object-top"
        />
      )}
      <div className="absolute inset-0 bg-black/20 text-white z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full px-4 md:px-10 lg:px-16 xl:px-28 mx-auto">
          <div className="flex flex-col gap-2 justify-center">
            <h1 className="text-4xl font-bold mb-4">{selectedMovie.title}</h1>
            <div>star rating</div>
            <div>genre</div>
            <div className="flex gap-4">
              <div className="bg-black h-fit w-fit">
                <Icon icon="ic:baseline-plus" className="text-4xl text-white" />
              </div>
              <div className="bg-black h-fit w-fit">
                <Icon icon="mdi:play" className="text-white text-4xl" />
              </div>
            </div>
            <p className="text-xl mb-4">{selectedMovie.description}</p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full z-20">
        <MovieCarousel onMovieSelect={setSelectedMovie} />
      </div>
    </div>
  );
};

export default HeroSection;
