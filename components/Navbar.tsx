"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchMovies } from "@/api/getApi/getApi";
import { Movie } from "./MovieCarousel";
import { useSelectedMovie } from "@/context/SelectedMovieContext";

const navItems = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/filmes",
    title: "Filmes",
  },
  {
    id: "/series",
    title: "Series",
  },
];

const listVariants = {
  closed: {
    x: "100vh",
  },
  opened: {
    x: 0,
    transition: {
      type: "tween",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const listItemVariants = {
  closed: {
    x: -10,
    opacity: 0,
  },
  opened: {
    x: 0,
    opacity: 1,
  },
};

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { searchResults, isLoading } = useSearchMovies(debouncedQuery);
  const path = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { setSelectedMovie } = useSelectedMovie();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setProfileMenuOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
  };

  const handleResultClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setSearchQuery("");
    setDebouncedQuery("");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <header className="bg-black/50 fixed top-0 w-full z-50 h-24 sm:h-16 flex justify-center items-center">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-28">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src={logo}
              alt="logo"
              className="h-8 sm:h-6 w-auto object-contain cursor-pointer"
            />
          </Link>
          <div className="relative hidden sm:flex justify-center items-center gap-8">
            {navItems.map((item, index) => (
              <Link key={index} href={item.id}>
                <div
                  className={`text-sm sm:text-base xl:text-lg 2xl:text-xl cursor-pointer text-white hover:text-yellow-500 transition-all duration-300 ${
                    path === item?.id ? "text-yellow-500" : ""
                  }`}
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </div>

          {/* Search Input for Large Screens */}
          <div className="relative hidden sm:flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-black/20 rounded-lg px-4 py-2 focus:outline-none text-yellow-500 placeholder-white"
            />
            <div className="absolute right-4 cursor-pointer text-yellow-500">
              <Icon
                icon="ic:baseline-search"
                className="text-2xl md:text-3xl"
              />
            </div>
            {debouncedQuery && (
              <div className="absolute top-full mt-2 w-full bg-white z-50 max-h-[50vh] overflow-y-auto">
                {isLoading ? (
                  <div className="p-2 text-sm text-gray-600">Loading...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((movie: Movie) => (
                    <div
                      key={movie.id}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleResultClick(movie)}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        width={50}
                        height={75}
                        className="object-cover"
                      />
                      <div className="ml-2">
                        <h2 className="text-sm font-semibold">{movie.title}</h2>
                        <p className="text-xs text-gray-600">
                          {movie.release_date}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-sm text-gray-600">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className="relative flex justify-center items-center cursor-pointer"
            ref={profileRef}
          >
            <div onClick={() => setProfileMenuOpen((prev) => !prev)}>
              <Icon
                icon="mingcute:user-4-fill"
                className="text-2xl sm:text-4xl text-yellow-500"
              />
            </div>
            {profileMenuOpen && (
              <div className="flip-animation absolute top-10 right-0 bg-white rounded-sm shadow-lg p-2 z-50">
                <ul className="flex flex-col">
                  <li
                    className="flex items-center cursor-pointer text-black hover:text-yellow-500 transition-all duration-300"
                    onClick={() => setProfileMenuOpen((prev) => !prev)}
                  >
                    <Icon icon="mdi:account" className="mr-2" />
                    Profile
                  </li>
                  <li
                    className="flex items-center cursor-pointer text-black hover:text-yellow-500 transition-all duration-300"
                    onClick={() => setProfileMenuOpen((prev) => !prev)}
                  >
                    <Icon icon="mdi:logout" className="mr-2" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
            <div
              className="sm:hidden flex justify-center items-center z-50 cursor-pointer w-10 h-8 text-2xl text-yellow-500"
              onClick={() => setMobileNav((prev) => !prev)}
            >
              {mobileNav ? (
                <Icon icon="ic:baseline-close" className="text-yellow-500" />
              ) : (
                <Icon icon="ic:baseline-menu" className="text-yellow-500" />
              )}
            </div>
          </div>
        </div>

        {/* Search Icon for Small Screens */}
        <div className="sm:hidden flex items-center">
          <div className="relative flex justify-center items-center w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-black/50 rounded-lg px-2 py-1 focus:outline-none placeholder-white text-yellow-500"
            />
            <div className="absolute cursor-pointer text-yellow-500 right-4">
              <Icon icon="ic:baseline-search" />
            </div>
            {debouncedQuery && (
              <div className="absolute top-full mt-2 w-full bg-white z-50 max-h-[50vh] overflow-y-auto">
                {isLoading ? (
                  <div className="p-2 text-sm text-gray-600">Loading...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((movie: Movie) => (
                    <div
                      key={movie.id}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleResultClick(movie)}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        width={50}
                        height={75}
                        className="object-cover"
                      />
                      <div className="ml-2">
                        <h2 className="text-sm font-semibold">{movie.title}</h2>
                        <p className="text-xs text-gray-600">
                          {movie.release_date}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-sm text-gray-600">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileNav && (
        <motion.div
          variants={listVariants}
          initial="closed"
          animate="opened"
          className="fixed inset-0 h-screen bg-white flex flex-col items-center justify-center gap-8 text-2xl z-40"
        >
          {navItems.map((item, index) => (
            <motion.div variants={listItemVariants} key={index}>
              <Link
                href={item.id}
                className="whitespace-nowrap cursor-pointer text-black hover:text-yellow-500"
                onClick={() => setMobileNav((prev) => !prev)}
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </header>
  );
}
