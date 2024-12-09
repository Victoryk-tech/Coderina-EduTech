import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ currentPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="p-1 rounded-md hover:bg-gray-200"
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft size={24} />
      </button>
      <span>
        {currentPage} - {totalPages} of {totalPages}
      </span>
      <button
        className="p-1 rounded-md hover:bg-gray-200"
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
