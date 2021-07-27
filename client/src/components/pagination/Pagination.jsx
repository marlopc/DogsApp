import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../actions";
import "./Pagination.css";

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
          <div
            className={`${statePage === 1 ? "disabled-link" : "link"} button-container`}
            onClick={handleBack}
          >
            <div className="nav-buttons">{"<"}</div>
          </div>
          <div className={`${statePage === 1 ? "btn-placeholder" : ""}`}></div>
          {statePages !== 1 && <strong>{statePage}</strong>}
          <div
            className={`${statePage >= statePages ? "disabled-link" : "link"} button-container`}
            onClick={handleNext}
          >
            <div className="nav-buttons">{">"}</div>
          </div>
          <div
            className={`${statePage >= statePages ? "btn-placeholder" : ""}`}
          ></div>
        </>
      )}
    </div>
  );
};

export default Pagination;
