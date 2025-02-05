import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedia } from './redux/mediaSlice';
import { RootState } from './redux/store';
import { AppDispatch } from './redux/store';
import './App.scss';
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { mediaList, loading, error } = useSelector((state: RootState) => state.media)

  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);


  return (
    <>
      <header>
        <h1>Movies Database</h1>
      </header>
      <main>
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
            {mediaList.map((movie) => (
              <tr key={movie.imdbID}>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
