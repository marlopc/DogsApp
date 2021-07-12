import './Home.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../nav_bar/NavBar';
import DogItem from '../dog_item/DogItem';
import PageCarrousel from '../page_carrousel/PageCarrousel';
import SearchFilters, { getSortingCb } from '../search_filters/SearchFilters';
import { getDogs, getTemperaments } from '../../actions';
import Loader from '../loader/Loader';
// import { useHistory } from 'react-router-dom';

const Home = ({ filter, breed, page }) => {
  page = parseInt(page);

  const [allDogs, setAllDogs] = useState([]);
  const [dogsFiltered, setDogsFiltered] = useState([]);
  const [pages, setPages] = useState(0);
  const [sortType, setSortType] = useState("");
  // const [filter, setFilter] = useState("");
  // const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);
  const [userCreatedFilter, setUserCreatedFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const stateDogs = useSelector(state => state.dogs);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getDogs(breed));
    dispatch(getTemperaments());
  }, [dispatch, breed]);

  useEffect(() => {
    if(!dogsFiltered.length) {
      setNoResults(true);
    }
    else {
      setLoading(false);
      setNoResults(false);
    }
  }, [dogsFiltered]);

  useEffect(() => {
    setAllDogs([...stateDogs].sort(getSortingCb(sortType)));
  }, [sortType, stateDogs])

  useEffect(() => {
    if(filter || userCreatedFilter) {
      const filtered = allDogs.filter(dog => {
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
      setDogsFiltered(filtered.slice(page * 8 - 8, page * 8));
    } else {
      setPages(Math.ceil(allDogs.length / 8));
      setDogsFiltered(allDogs.slice(page * 8 - 8, page * 8));
    }
  }, [
    stateDogs, 
    filter, 
    allDogs, 
    page, 
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
            filter={filter}
          />
        </div>
        <article className="page">
          <PageCarrousel 
            pages={pages} 
            breed={breed} 
            page={page}
            filter={filter}
          />
          <div className="results">
            { 
              loading ? (
                <Loader />
              ) : (noResults ? (
                  <h1>RESULTADOS NO ENCONTRADOS</h1>
                ) : (
                  dogsFiltered.map(dog => 
                    <DogItem 
                      name={dog.name}
                      temperament={dog.temperament}
                      image_url={dog.image_url}
                      id={dog.id}
                      key={dog.id}
                    />
                  )
                )
              ) 
            }
          </div>
          <PageCarrousel 
            pages={pages} 
            breed={breed} 
            page={page} 
            filter={filter}
          />
        </article>
      </section>
    </div>
  )
}

export default Home
