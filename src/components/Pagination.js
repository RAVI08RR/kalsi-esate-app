import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageSetSize = 5;
  const halfSet = Math.floor(pageSetSize / 2);

  let startPage = Math.max(currentPage - halfSet, 1);
  let endPage = Math.min(startPage + pageSetSize - 1, totalPages);

  if (endPage - startPage + 1 < pageSetSize) {
    startPage = Math.max(endPage - pageSetSize + 1, 1);
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className="pagination-btn"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <button key="ellipsis-start" className="pagination-btn" disabled>
            ...
          </button>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <button key="ellipsis-end" className="pagination-btn" disabled>
            ...
          </button>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          className={`pagination-btn ${
            totalPages === currentPage ? "active" : ""
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <img
          src="/assets/images/chevron-left.svg"
          alt="arrow"
          className="arrow-pagination"
        />
      </button>
      {renderPageNumbers()}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <img
          src="/assets/images/chevron-right.svg"
          alt="arrow"
          className="arrow-pagination"
        />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
