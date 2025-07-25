import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { baseImgUrl } from "../../../utils/constants";
import { div } from "framer-motion/client";

const MovieRow = ({ title, movies, handleOpenModal }) => {
  const rowRef = useRef();

  const scrollLeft = () => {
    rowRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    rowRef.current.scrollLeft += 300;
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className=" sm:px-10 px-5 z-12 relative ">
      <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
      <div className="relative group overflow-visible">
        {/* Scroll Left Button */}
        <ChevronLeft
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden group-hover:block text-white bg-black/60 hover:bg-black cursor-pointer rounded-full p-1 w-8 h-8"
        />

        {/* Movie Posters */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth hide-scrollbar"
        >
          {movies.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleOpenModal(movie)}
              src={`${baseImgUrl}${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="w-[140px] sm:w-[160px] md:w-[500px] sm:h-[190px] h-[170px] object-cover rounded-md hover:scale-105 cursor-pointer transition-all duration-200"
            />
          ))}
        </div>

        {/* Scroll Right Button */}
        <ChevronRight
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden group-hover:block text-white bg-black/60 hover:bg-black cursor-pointer rounded-full p-1 w-8 h-8"
        />
      </div>
    </div>
  );
};

export default MovieRow;
