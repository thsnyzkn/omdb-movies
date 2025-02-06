import { MediaDetail } from '../types';

interface MediaDetailContentProps {
    mediaDetail: MediaDetail;
}

function MediaDetailContent({ mediaDetail }: MediaDetailContentProps) {
    return (
        <div className="media-detail">
            <div className="poster-column">
                <img src={mediaDetail.Poster} alt={`${mediaDetail.Title} Poster`} />
            </div>
            <div className="details-column">
                <h1>{mediaDetail.Title}</h1>
                <p><strong>Duration:</strong> {mediaDetail.Runtime}</p>
                <p><strong>Genre:</strong> {mediaDetail.Genre}</p>
                <p><strong>Director:</strong> {mediaDetail.Director}</p>
                <p><strong>Cast:</strong> {mediaDetail.Actors}</p>
                <p><strong>IMDb Rating:</strong> {mediaDetail.imdbRating}</p>
                <p><strong>Plot:</strong> {mediaDetail.Plot}</p>
            </div>
        </div>
    );
}

export default MediaDetailContent; 