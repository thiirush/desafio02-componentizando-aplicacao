import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { api } from "../../services/api";

interface HomeContextProviderProps {
  children?: React.ReactNode;
  selectedGenreId: number;
  setSelectedGenreId: Dispatch<SetStateAction<any>>;

  genres: any;
  setGenres: any;

  movies: any;
  setMovies: any;

  selectedGenre: any;
  setSelectedGenre: Dispatch<SetStateAction<any>>;
}

export const HomeContext = createContext<HomeContextProviderProps | null>(null);

export function HomeContextProvider({ children }: any) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <HomeContext.Provider
      value={{
        selectedGenreId,
        setSelectedGenreId,
        genres,
        setGenres,
        movies,
        setMovies,
        selectedGenre,
        setSelectedGenre,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
