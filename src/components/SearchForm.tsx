import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useDebounce } from '../hooks/useDebounce';
import { fetchMedia, setPage } from '../redux/mediaSlice';

interface SearchFormProps {
    initialSearchTerm?: string;
}

function SearchForm({ initialSearchTerm = 'Pokemon' }: SearchFormProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { currentPage } = useSelector((state: RootState) => state.media)
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [year, setYear] = useState('');
    const [type, setType] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const debouncedYear = useDebounce(year, 300);

    useEffect(() => {
        if (debouncedSearchTerm.length >= 3 && (debouncedYear.length === 0 || debouncedYear.length === 4)) {
            dispatch(fetchMedia({ searchTerm: debouncedSearchTerm, type, year: debouncedYear, page: currentPage }));
        }
    }, [dispatch, debouncedSearchTerm, debouncedYear, type, currentPage]);

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
    );
}

export default SearchForm; 