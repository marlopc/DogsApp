import React from "react";
import "./Pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../actions";

const Pagination = () => {
  const statePages = useSelector((state) => state.pagination.pages);
  const statePage = useSelector((state) => state.pagination.page);

  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(setPage(statePage - 1));
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    dispatch(setPage(statePage + 1));
    window.scrollTo(0, 0);
  };

  return (
    <div className="pagination-ctrl-container">
      {statePages !== 0 && (
        <>
          {statePage !== 1 ? (
            <button
              className="nav-buttons link button-container"
              onClick={handleBack}
            >
              {"<"}
            </button>
          ) : (
            <div className="btn-placeholder" />
          )}
          {statePages !== 1 && <strong>{statePage}</strong>}
          {statePage >= statePages ? (
            <div className="btn-placeholder" />
          ) : (
            <button
              className="nav-buttons link button-container"
              onClick={handleNext}
            >
              {">"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Pagination;
