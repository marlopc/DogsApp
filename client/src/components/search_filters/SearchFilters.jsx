import './SearchFilters.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  setFilter,
  setPage, 
  setSearch, 
  setSortType, 
  setUserCreatedFilter, 
  setLoading
} from '../../actions';
import { getSortCb } from '../../helpers/getSortCb';

const SearchFilters = () => {
  const [temperaments, setTemperaments] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const stateTemperaments = useSelector(state => state.temperaments);
  const stateFilter = useSelector(state => state.filters.filter);
  const stateUserCreatedFilter = useSelector(state => state.filters.userCreatedFilter);
  const stateSortType = useSelector(state => state.filters.sortType);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setTemperaments(stateTemperaments);
  }, [stateTemperaments])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchInput !== "") {
      dispatch(setLoading(true))
      dispatch(setPage(1));
      dispatch(setSearch(searchInput));
    }
  }
  
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }
  
  const handleSortChange = (e) => {
    dispatch(setSortType(e.target.value));
  }
  
  const handleFilter = (e) => {
    dispatch(setPage(1));
    dispatch(setFilter(e.target.value));
  }
  
  const handleCheckbox = (e) => {
    dispatch(setPage(1));
    dispatch(setUserCreatedFilter(e.target.checked));
  }
  
  return (
    <div className="form-container">
      <form data-testid="filters-form" className="search-div" onSubmit={handleSubmit}>
        <input 
          name="breed"
          type="text"
          value={searchInput} 
          onChange={handleChange} 
          placeholder="Search by breed"
          className="search-input"
          data-testid="filters-query"
        />
        <input className="search-submit" type="submit" value=">" data-testid="filters-submit"/>
      </form>
      <label htmlFor="sort">Sort:</label>
      <select 
        name="sort" 
        value={stateSortType} 
        onChange={handleSortChange} 
        className="select-sort"
        data-testid="filters-sort"
      >
        <option value="default" hidden={true}>Sort ⇅</option>
        <optgroup label="Alphabetically">
          <option value="AA">A {"<"} Z</option>
          <option value="AD">Z {"<"} A</option>
        </optgroup>
        <optgroup label="Weight">
          <option value="WA">Less weight {"<"} More weight</option>
          <option value="WD">More weight {"<"} Less weight</option>
        </optgroup>
      </select>
      <label htmlFor="filter">Filter:</label>
      <select 
        name="filter" 
        value={stateFilter} 
        onChange={handleFilter} 
        className="select-temps"
        data-testid="filters-filter"
      >
        <option name="placeholder" hidden="hidden" value="">Filter 🜄</option>
        <option value="">None</option>
        <optgroup label="Temperament">
        {
          [...temperaments]
            .sort(getSortCb("AA"))
            .map(temperament => (
              <option 
                value={temperament.name} 
                key={temperament.id}>
                {temperament.name}
              </option>
            ))
        }
        </optgroup>
      </select>
      <div>
        <input 
          type="checkbox" 
          name="checkbox"
          checked={stateUserCreatedFilter} 
          onChange={handleCheckbox}
          data-testid="filters-checkbox"
          />
        <label htmlFor="checkbox" className="check-label"> Made by user</label>
      </div>
    </div>
  )
}

export default SearchFilters
