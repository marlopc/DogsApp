import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, setDefault, setLoading, setPages } from '../../actions';
import { getSortCb } from '../../helpers/getSortCb';
import NotFoundError from '../not_found_error/NotFoundError';
import SearchFilters from '../search_filters/SearchFilters';
import Pagination from '../pagination/Pagination';
import DogItem from '../dog_item/DogItem';
import NavBar from '../nav_bar/NavBar';
import Loader from '../loader/Loader';
import Footer from '../footer/Footer';
import './Home.css';

const Home = () => {
  const [allDogs, setAllDogs] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const stateDogs = useSelector(state => state.dogs);
  const stateLoading = useSelector(state => state.loading);
  const statePage = useSelector(state => state.pagination.page);
  const stateSortType = useSelector(state => state.filters.sortType);
  const stateFilter = useSelector(state => state.filters.filter);
  const stateUserCreatedFilter = useSelector(state => state.filters.userCreatedFilter);
  const stateSearch = useSelector(state => state.filters.search);
  const statePages = useSelector(state => state.pagination.pages);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setDefault());
    dispatch(getTemperaments());
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    if(stateSearch) {
      dispatch(getDogs(stateSearch));
    }
  }, [stateSearch, dispatch]);

  useEffect(() => {
    if(!allDogs.length) {
      setNoResults(true);
    }
    else {
      dispatch(setLoading(false));
      setNoResults(false);
    }
  }, [allDogs, dispatch]);

  useEffect(() => {
    setAllDogs([...stateDogs].sort(getSortCb(stateSortType)));
  }, [stateSortType, stateDogs, stateLoading, stateFilter]);

  useEffect(() => {
    if(stateFilter || stateUserCreatedFilter) {
      const filtered = stateDogs.filter(dog => {
        if(!stateFilter || !dog.temperament) {
          if(stateUserCreatedFilter) {
            return isNaN(dog.id);
          }
          return false;
        }
        if(!stateFilter || dog.temperament.includes(stateFilter)) {
          if(stateUserCreatedFilter) {
            return isNaN(dog.id);
          }
          return true;
        }
        return false;
      });
      dispatch(setPages(Math.ceil(filtered.length / 8)));
      setAllDogs(filtered);
    } else {
      dispatch(setPages(Math.ceil(stateDogs.length / 8)));
      setAllDogs(stateDogs);
    }
  }, [
    stateDogs, 
    stateFilter,
    stateUserCreatedFilter,
    dispatch,
    statePages
  ]);
  
  return (
    <div>
      <NavBar />
      <section className="search-wrapper">
        <div className="filters">
          <SearchFilters />
        </div>
        <article className="page">
          <Pagination />
          <div className="results">
            { 
              stateLoading ? (
                <Loader />
              ) : (noResults ? (
                  <NotFoundError setLoading={setLoading}/>
                ) : (
                  allDogs.map(dog => 
                    <DogItem 
                      name={dog.name}
                      temperament={dog.temperament}
                      image_url={dog.image_url}
                      id={dog.id}
                      key={dog.id}
                    />
                  ).slice(statePage * 8 - 8, statePage * 8)
                )
              ) 
            }
          </div>
          <Pagination />
        </article>
      </section>
      <Footer />
    </div>
  )
}

export default Home
