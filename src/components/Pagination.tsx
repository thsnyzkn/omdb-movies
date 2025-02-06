interface PaginationProps {
    currentPage: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
}

function Pagination({ currentPage, onNextPage, onPreviousPage }: PaginationProps) {
    return (
        <div className='pagination'>
            <button onClick={onPreviousPage} disabled={currentPage === 1}>
                Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={onNextPage}>
                Next
            </button>
        </div>
    );
}

export default Pagination; 