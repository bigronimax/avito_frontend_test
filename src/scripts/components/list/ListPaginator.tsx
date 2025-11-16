interface ListPaginatorProps {
  pages: number[];
  totalPages: number;
  currentPage: number;
  handlePrevPage: () => void;
  handlePageClick: (page: number) => void;
  handleNextPage: () => void;
}

function ListPaginator({
  pages,
  totalPages,
  currentPage,
  handlePrevPage,
  handlePageClick,
  handleNextPage,
}: ListPaginatorProps) {
  return (
    <>
      {totalPages > 1 && (
        <div className="mt-[20px] flex items-center justify-center gap-[5px]">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`rounded-[6px] border border-light-grey bg-white px-[15px] py-[10px] text-black-text transition-all ${currentPage === 1 ? "cursor-default opacity-50 hover:border-light-grey hover:text-black-text" : "hover:border-blue hover:text-blue"}`}
          >
            ← Назад
          </button>
          <div className="flex gap-[5px]">
            {pages.map((page, idx) =>
              page === 0 ? (
                <span
                  key={idx}
                  className="rounded-[6px] border border-solid border-light-grey bg-white px-[15px] py-[10px] text-black-text opacity-50"
                >
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  disabled={currentPage === page}
                  onClick={() => handlePageClick(page)}
                  className={`rounded-[6px] border border-light-grey bg-white px-[15px] py-[10px] text-black-text transition-all ${
                    currentPage === page
                      ? "cursor-default opacity-50 hover:border-light-grey hover:text-black-text"
                      : "hover:border-blue hover:text-blue"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`rounded-[6px] border border-light-grey bg-white px-[15px] py-[10px] text-black-text transition-all ${currentPage === totalPages ? "cursor-default opacity-50 hover:border-light-grey hover:text-black-text" : "hover:border-blue hover:text-blue"}`}
          >
            Вперед →
          </button>
        </div>
      )}
    </>
  );
}

export default ListPaginator;
