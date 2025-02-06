import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMediaDetail } from "../redux/mediaSlice";
import { RootState, AppDispatch } from "../redux/store";
import MediaDetailContent from '../components/MediaDetailContent';
import './MediaDetailPage.scss'

function MediaDetailPage() {
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
    if (!mediaDetail) return null;

    return <MediaDetailContent mediaDetail={mediaDetail} />;
}

export default MediaDetailPage; 