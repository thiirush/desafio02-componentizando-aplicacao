import { HomeContext } from "../contexts/Home/";

import { useContext, useEffect } from "react";
import { MovieCard } from "./MovieCard";

export function Content() {
  const homeContext = useContext(HomeContext);

  return (
    <main>
      <div className="movies-list">
        {homeContext?.movies.map((movie: MovieProps) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        ))}
      </div>
    </main>
  );
}
