// components/MovieUpcoming.jsx
import React, { useEffect, useState } from "react";
import { getUpcoming } from "../../Api";
// import Toggle from "../Toggle";
import MovieCard from "../MovieCard";
import MovieSkeleton from "../MovieSkeleton";

const MovieUpcoming = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMovies = async page => {
        setIsLoading(true);
        const response = await getUpcoming(page);
        setTimeout(() => {
            setMovies(response);
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="mx-2 lg:container mb-11">
            <div className="flex justify-between mb-4 mt-9">
                <h2 className="text-xl font-primary">Akan Hadir</h2>
            </div>
            <div className="flex space-x-2 lg:gap-5 snap-x overflow-x-auto scroll-smooth">
                {isLoading
                    ? Array.from({ length: 10 }).map((_, index) => (
                          <MovieSkeleton key={index} />
                      ))
                    : movies.map(movie => (
                          <div
                              key={movie.id}
                              className="min-w-[155px] md:min-w-[170px] lg:min-w-[180px] flex flex-col"
                          >
                              <MovieCard key={movie.id} movie={movie} />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default MovieUpcoming;
