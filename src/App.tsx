import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router";
import { fetchMedia, setPage } from './redux/mediaSlice';
import { RootState } from './redux/store';
import { AppDispatch } from './redux/store';
import { useDebounce } from './hooks';
import './styles/main.scss';
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { mediaList, loading, error, currentPage } = useSelector((state: RootState) => state.media)

  const [searchTerm, setSearchTerm] = useState('Pokemon');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedYear = useDebounce(year, 300);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3 && (debouncedYear.length === 0 || debouncedYear.length === 4)) {
      dispatch(fetchMedia({ searchTerm: debouncedSearchTerm, type, year: debouncedYear, page: currentPage }));
    }
  }, [dispatch, debouncedSearchTerm, debouncedYear, type, currentPage]);


  const handleNextPage = () => {
    dispatch(setPage(currentPage + 1));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setPage(1));
    dispatch(fetchMedia({ searchTerm, year, type, page: 1 }));
  };

  return (
    <>
      <header>
        <h1>Movies Database</h1>
      </header>
      <main>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for a movie..."
          />
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            placeholder="Year"
            min="1900"
            max={new Date().getFullYear()}
          />
          <select value={type} onChange={handleTypeChange}>
            <option value="">All</option>
            <option value="movie">Movie</option>
            <option value="series">TV Series</option>
            <option value="episode">Episode</option>
          </select>
          <button type="submit" disabled={!searchTerm.trim()}>Search</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <table aria-describedby="movie-table-description">
          <caption>Movie Listing</caption>
          <thead>
            <tr>
              <th scope="col">Movie Title</th>
              <th scope="col">Year</th>
              <th scope="col">Imdb ID</th>
            </tr>
          </thead>
          <tbody>
            {mediaList?.map((movie) => (
              <tr key={movie.imdbID}>
                <NavLink to={`/media/${movie.imdbID}`}>
                  <td>
                    {movie.Title}
                  </td>
                </NavLink>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>

              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button onClick={handleNextPage}>
            Next
          </button>
        </div>
      </main >
    </>
  );
}

export default App;
