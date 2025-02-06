import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMediaDetail } from "../redux/mediaSlice";
import { RootState, AppDispatch } from "../redux/store";
import './MediaDetail.scss'

function MediaDetail() {
  const { imdbId } = useParams<{ imdbId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { mediaDetail, loading, error } = useSelector(
    (state: RootState) => state.media
  );

  useEffect(() => {
    if (imdbId) {
      dispatch(fetchMediaDetail(imdbId));
    }
  }, [dispatch, imdbId]);

  if (loading) return <p>loading</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="media-detail">
      {mediaDetail && (
        <>
          <h1>{mediaDetail.Title}</h1>
          <img src={mediaDetail.Poster} alt={`${mediaDetail.Title} Poster`} />
          <p>
            <strong>Duration:</strong> {mediaDetail.Runtime}
          </p>
          <p>
            <strong>Genre:</strong> {mediaDetail.Genre}
          </p>
          <p>
            <strong>Director:</strong> {mediaDetail.Director}
          </p>
          <p>
            <strong>Cast:</strong> {mediaDetail.Actors}
          </p>
          <p>
            <strong>IMDb Rating:</strong> {mediaDetail.imdbRating}
          </p>
          <p>
            <strong>Plot:</strong> {mediaDetail.Plot}
          </p>
        </>
      )
      }
    </div >
  );
}

export default MediaDetail;
