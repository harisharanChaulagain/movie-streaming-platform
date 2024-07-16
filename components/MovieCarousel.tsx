import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchMovies } from "@/api/getApi/getApi";

interface Movie {
  id: number;
  title: string;
  description: string;
  backdrop_path: string;
}

interface MovieCarouselProps {
  onMovieSelect: (movie: Movie) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ onMovieSelect }) => {
  const { data: movies, isLoading, error } = useFetchMovies();

  const handleMovieClick = (movie: Movie) => {
    onMovieSelect(movie);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
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
          className="p-2"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-48 object-cover"
          />
        </div>
      ))}
    </Slider>
  );
};

export default MovieCarousel;
