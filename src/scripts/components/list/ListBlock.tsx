import type {
  Item as ListItemModel,
  Pagination,
} from "../../api/models.api.ts";
import ListItem from "./ListItem.tsx";
import ListPaginator from "./ListPaginator.tsx";

interface ListBlockProps {
  cards: ListItemModel[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export default function ListBlock({
  cards,
  pagination,
  onPageChange,
}: ListBlockProps) {
  const { currentPage, totalPages, totalItems } = pagination;

  let pages = [];

  if (totalPages <= 5) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage <= 2) {
    pages = [1, 2, 3, 0, totalPages];
  } else if (currentPage >= totalPages - 1) {
    pages = [1, 0, totalPages - 2, totalPages - 1, totalPages];
  } else {
    pages = [
      1,
      0,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      0,
      totalPages,
    ];
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    window.scrollTo(0, 0);
  };

  const idList = cards.map((item) => item.id);

  return (
    <div className="flex h-full flex-col gap-[25px]">
      <h2 className={`text-[28px] font-bold`}>
        Найдено {totalItems} объявлений
      </h2>
      <div className="flex flex-col gap-[20px]">
        {cards.length ? (
          cards.map((item) => (
            <ListItem key={item.id} item={item} idList={idList} />
          ))
        ) : (
          <h2>Ничего не найдено</h2>
        )}
      </div>
      <ListPaginator
        pages={pages}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}
