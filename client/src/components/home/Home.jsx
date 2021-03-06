import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import DogItem from "../dog_item/DogItem";
import Footer from "../footer/Footer";
import Loader from "../loader/Loader";
import NavBar from "../nav_bar/NavBar";
import NotFoundError from "../not_found_error/NotFoundError";
import Pagination from "../pagination/Pagination";
import SearchFilters from "../search_filters/SearchFilters";
import { getSortCb } from "../../helpers/getSortCb";
import { getDogs, getTemperaments, setDefaultHome, setPages } from "../../actions";

const Home = () => {
  const [allDogs, setAllDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const stateDogs = useSelector((state) => state.dogs);
  const statePage = useSelector((state) => state.pagination.page);
  const stateSortType = useSelector((state) => state.filters.sortType);
  const stateFilter = useSelector((state) => state.filters.filter);
  const stateUserCreatedFilter = useSelector(
    (state) => state.filters.userCreatedFilter
  );
  const stateSearch = useSelector((state) => state.filters.search);
  const statePages = useSelector((state) => state.pagination.pages);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Home - Dogs App";
  });

  useEffect(() => {
    dispatch(setDefaultHome());
    dispatch(getTemperaments());
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDogs(stateSearch));
  }, [stateSearch, dispatch]);

  useEffect(() => {
    setAllDogs([...stateDogs].sort(getSortCb(stateSortType)));
    if (stateDogs.length) {
      setLoading(false);
    }
  }, [stateSortType, stateDogs, stateFilter]);

  useEffect(() => {
    if (stateFilter || stateUserCreatedFilter) {
      const filtered = stateDogs.filter((dog) => {
        if (stateFilter && !dog.temperament) {
          return false;
        }

        if (!stateFilter || !dog.temperament) {
          if (stateUserCreatedFilter) {
            return isNaN(dog.id);
          }
          return false;
        }

        if (!stateFilter || dog.temperament.includes(stateFilter)) {
          if (stateUserCreatedFilter) {
            return isNaN(dog.id);
          }
          return true;
        }
        return false;
      });
      dispatch(setPages(Math.ceil(filtered.length / 9)));
      setAllDogs(filtered.sort(getSortCb(stateSortType)));
    } else {
      dispatch(setPages(Math.ceil(stateDogs.length / 9)));
      setAllDogs([...stateDogs].sort(getSortCb(stateSortType)));
    }
  }, [
    stateDogs,
    stateFilter,
    stateUserCreatedFilter,
    dispatch,
    statePages,
    stateSortType,
  ]);

  return (
    <div>
      <NavBar />
      <div className="search-wrapper">
        <div className="filters">
          <SearchFilters />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <section className="page">
            <div className="results">
              {allDogs.length ? (
                allDogs
                  .map((dog) => (
                    <DogItem
                      name={dog.name}
                      temperament={dog.temperament}
                      image_url={dog.image_url}
                      id={dog.id}
                      key={dog.id}
                    />
                  ))
                  .slice(statePage * 9 - 9, statePage * 9)
              ) : (
                <NotFoundError setLoading={setLoading} />
              )}
            </div>
            <Pagination />
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
