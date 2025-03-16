const Pagination = ({ pagination, onPageChange }) => {
  return (
    <div className="flex justify-center items-center md:mt-7 gap-2">
      <button
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className={`px-3 py-1 rounded ${
          pagination.page === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-black text-white"
        }`}
      >
        Previous
      </button>

      <div className="flex space-x-1">
        {[...Array(pagination.pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-8 h-8 rounded-full ${
              pagination.page === i + 1
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.pages}
        className={`px-3 py-1 rounded ${
          pagination.page === pagination.pages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-black text-white "
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
