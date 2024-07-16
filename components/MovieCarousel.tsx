import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchMovies } from "@/api/getApi/getApi";
import Image from "next/image";
import { Icon } from "@iconify/react";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  poster_path: string;
  release_date : string;
}

interface MovieCarouselProps {
  onMovieSelect: (movie: Movie) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ onMovieSelect }) => {
  const { data: movies, isLoading, error } = useFetchMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    onMovieSelect(movie);
  };

  // Custom Next Arrow component
  const NextArrow = ({
    onClick,
  }: {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) => {
    return (
      <div
        className="absolute right-4 -top-10 lg:-top-20 cursor-pointer z-10"
        onClick={onClick}
      >
        <Icon
          icon="grommet-icons:next"
          className="text-yellow-500 text-3xl hidden sm:block"
        />
      </div>
    );
  };

  // Custom Previous Arrow component
  const PrevArrow = ({
    onClick,
  }: {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) => {
    return (
      <div
        className="absolute left-4 -top-10 lg:-top-20 cursor-pointer z-10"
        onClick={onClick}
      >
        <Icon
          icon="grommet-icons:previous"
          className="text-primary-400 text-3xl text-yellow-500 hidden sm:block"
        />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  return (
    <Slider {...settings}>
      {movies?.map((movie: Movie) => (
        <div
          key={movie.id}
          onClick={() => handleMovieClick(movie)}
          className={` p-2 ${
            selectedMovie?.id === movie.id
              ? "scale-115 transition-all duration-300"
              : "mt-10"
          }`}
        >
          <div className="w-full h-[40vh] rounded-xl overflow-hidden border border-white">
            <Image
              height={1000}
              width={1000}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-full w-full object-cover hover:cursor-pointer"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default MovieCarousel;
