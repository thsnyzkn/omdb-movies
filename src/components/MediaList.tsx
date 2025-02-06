import { NavLink } from 'react-router';
import { Media } from '../types';

interface MediaListProps {
    mediaList: Media[];
}

function MediaList({ mediaList }: MediaListProps) {
    return (
        <table aria-describedby="media-table-description">
            <caption>Content Listing</caption>
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
                        <td>
                            <NavLink to={`/media/${movie.imdbID}`}>
                                {movie.Title}
                            </NavLink>
                        </td>
                        <td>{movie.Year}</td>
                        <td>{movie.imdbID}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MediaList; 