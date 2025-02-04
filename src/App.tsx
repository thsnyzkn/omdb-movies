import './App.scss';
function App() {
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
            <tr>
              <td>Name</td>
              <td>Year</td>
              <td>Imdb ID</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
