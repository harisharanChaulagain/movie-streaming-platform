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


  const renderStars = (rating: number) => {
    const stars = [];
    const filledStars = Math.round(rating / 2);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          icon={i <= filledStars ? "mdi:star" : "mdi:star-outline"}
          className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl"
        />
      );
    }
    return stars;
  };

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
      <div className="absolute inset-0 bg-black/50 text-white z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full px-4 md:px-10 lg:px-16 xl:px-28 mx-auto">
          <div className="flex flex-col gap-2 mt-28 sm:mt-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
              {selectedMovie.title}
            </h1>
            <div className="flex items-center">
              {renderStars(selectedMovie?.vote_average)}
            </div>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC]">
              genre
            </div>
            <div className="flex gap-4">
              <div className="bg-black h-fit w-fit shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] cursor-pointer rounded-md">
                <Icon icon="ic:baseline-plus" className="text-4xl text-white" />
              </div>
              <div className="bg-black h-fit w-fit shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] cursor-pointer rounded-md">
                <Icon icon="mdi:play" className="text-white text-4xl" />
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 text-[#CCCCCC]">
              {selectedMovie?.overview?.length > 100
                ? `${selectedMovie.overview.substring(0, 100)}...`
                : selectedMovie?.overview}
            </p>
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
