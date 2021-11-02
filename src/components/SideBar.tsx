import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/Home/";
import { Button } from "../components/Button";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export function SideBar() {
  const homeContext = useContext(HomeContext);

  function handleClickButton(id: number) {
    homeContext?.setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      homeContext?.setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {homeContext?.genres.map((genre: GenreResponseProps) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={homeContext?.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
