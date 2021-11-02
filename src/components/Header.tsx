import { useContext, useEffect } from "react";
import { api } from "../services/api";
import { HomeContext } from "../contexts/Home/";

export function Header() {
  const homeContext = useContext(HomeContext);

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${homeContext?.selectedGenreId}`)
      .then((response) => {
        homeContext?.setSelectedGenre(response.data);
      });
  }, [homeContext?.selectedGenreId]);

  return (
    <header>
      <span className="category">
        Categoria:<span> {homeContext?.selectedGenre.title}</span>
      </span>
    </header>
  );
}
