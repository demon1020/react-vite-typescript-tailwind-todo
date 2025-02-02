interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  skip: number;
  total: number;
}

function Pagination({ page, setPage, skip, total }: PaginationProps) {
  return (
    <div className="w-full flex items-center justify-between mt-10">
      <button
        className="btn btn-outline flex-1 mx-2"
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
      >
        « Previous
      </button>

      <span className="flex-1 text-center font-semibold">
        Page {skip === 0 ? 1 : (skip / 3).toFixed()} of (
        {(total / 3).toFixed(0)})
      </span>

      <button
        className="btn btn-outline flex-1 mx-2"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={skip + 3 >= total}
      >
        Next »
      </button>
    </div>
  );
}

export default Pagination;
