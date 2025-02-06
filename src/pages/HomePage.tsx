import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/mediaSlice';
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store';

import { SearchForm, MediaList, Pagination } from '../components'
import '../styles/main.scss';


function HomePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { mediaList, loading, error, currentPage } = useSelector((state: RootState) => state.media)


    const handleNextPage = () => {
        dispatch(setPage(currentPage + 1));
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setPage(currentPage - 1));
        }
    };





    return (
        <>
            <header>
                <h1>Movies Database</h1>
            </header>
            <main>
                <SearchForm />
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <MediaList mediaList={mediaList} />
                <Pagination currentPage={currentPage} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />
            </main >
        </>
    );
}

export default HomePage;
