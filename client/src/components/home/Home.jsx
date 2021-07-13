import './Home.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../nav_bar/NavBar';
import DogItem from '../dog_item/DogItem';
import PageCarrousel from '../page_carrousel/PageCarrousel';
import SearchFilters, { getSortingCb } from '../search_filters/SearchFilters';
import { getDogs, getTemperaments } from '../../actions';
import Loader from '../loader/Loader';
import NotFoundError from '../not_found_error/NotFoundError';

const Home = () => {
  const [allDogs, setAllDogs] = useState([]);
  const [pages, setPages] = useState(0);
  const [sortType, setSortType] = useState("AA");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [userCreatedFilter, setUserCreatedFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const stateDogs = useSelector(state => state.dogs);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getDogs(search || null));
    dispatch(getTemperaments());
  }, [dispatch, search]);

  useEffect(() => {
    if(!allDogs.length) {
      setNoResults(true);
    }
    else {
      setLoading(false);
      setNoResults(false);
    }
  }, [allDogs]);

  useEffect(() => {
    if(!loading) {
      setAllDogs([...stateDogs].sort(getSortingCb(sortType)));
    }
  }, [sortType, stateDogs, loading])

  useEffect(() => {
    if(filter || userCreatedFilter) {
      const filtered = stateDogs.filter(dog => {
        if(!filter || !dog.temperament) {
          if(userCreatedFilter) {
            return isNaN(dog.id)
          }
          return false;
        }
        if(!filter || dog.temperament.includes(filter)) {
          if(userCreatedFilter) {
            return isNaN(dog.id)
          }
          return true;
        }
        return false;
      });
      setPages(Math.ceil(filtered.length / 8));
      setAllDogs(filtered);
    } else {
      setPages(Math.ceil(stateDogs.length / 8));
      setAllDogs(stateDogs);
    }
  }, [
    stateDogs, 
    filter,
    userCreatedFilter
  ]);
  
  return (
    <div>
      <NavBar />
      <section className="search-wrapper">
        <div className="filters">
          <SearchFilters 
            setSortType={setSortType} 
            sortType={sortType} 
            userCreatedFilter={userCreatedFilter} 
            setUserCreatedFilter={setUserCreatedFilter}
            setFilter={setFilter}
            filter={filter}
            setSearch={setSearch}
            setPage={setPage}
            search={search}
          />
        </div>
        <article className="page">
          <PageCarrousel 
            pages={pages} 
            search={search} 
            page={page}
            filter={filter}
            setPage={setPage}
          />
          <div className="results">
            { 
              loading ? (
                <Loader />
              ) : (noResults ? (
                  <NotFoundError/>
                ) : (
                  allDogs.map(dog => 
                    <DogItem 
                      name={dog.name}
                      temperament={dog.temperament}
                      image_url={dog.image_url}
                      id={dog.id}
                      key={dog.id}
                    />
                  ).slice(page * 8 - 8, page * 8)
                )
              ) 
            }
          </div>
          <PageCarrousel 
            pages={pages} 
            search={search} 
            page={page}
            filter={filter}
            setPage={setPage}
          />
        </article>
      </section>
    </div>
  )
}

export default Home
