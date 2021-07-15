import './SearchFilters.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  setFilter,
  setPage, 
  setSearch, 
  setSortType, 
  setUserCreatedFilter, 
  setSearchInput 
} from '../../actions';

const SearchFilters = () => {
  const [temperaments, setTemperaments] = useState([]);

  const stateTemperaments = useSelector(state => state.temperaments);
  const stateFilter = useSelector(state => state.filters.filter);
  const stateUserCreatedFilter = useSelector(state => state.filters.userCreatedFilter);
  const stateSortType = useSelector(state => state.filters.sortType);
  const stateSearchInput = useSelector(state => state.filters.searchInput)
  
  const dispatch = useDispatch();

  useEffect(() => {
    setTemperaments(stateTemperaments);
  }, [stateTemperaments])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(stateSearchInput !== "") {
      dispatch(setPage(1));
      dispatch(setSearch(stateSearchInput));
    }
  }
  
  const handleChange = (e) => {
    dispatch(setSearchInput(e.target.value));
  }
  
  const handleSortChange = (e) => {
    dispatch(setSortType(e.target.value));
  }
  
  const handleFilter = (e) => {
    dispatch(setPage(1));;
    dispatch(setFilter(e.target.value));
  }
  
  const handleCheckbox = (e) => {
    dispatch(setPage(1));
    dispatch(setUserCreatedFilter(e.target.checked));
  }
  
  return (
    <div className="form-container">
      <form className="search-div" onSubmit={handleSubmit}>
        <input 
          name="breed"
          type="text"
          value={stateSearchInput} 
          onChange={handleChange} 
          placeholder="Search by breed"
          className="search-input"
          />
          <input className="search-submit" type="submit" value=">"/>
      </form>
      <label htmlFor="sort">Sort:</label>
      <select name="sort" value={stateSortType} onChange={handleSortChange} className="select-sort">
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
      <select name="filter" value={stateFilter} onChange={handleFilter} className="select-temps">
        <option name="placeholder" hidden="hidden" value="">Filter</option>
        <option value="">None</option>
        <optgroup label="Temperament">
        {
          [...temperaments]
          .sort((a, b) => {
            if(a.name > b.name) {
              return 1;
            }
              if(b.name > a.name) {
                return -1;
              }
              return 0;
            })
            .map(temperament => <option value={temperament.name} key={temperament.id}>{temperament.name}</option>)
          }
        </optgroup>
      </select>
      <div>
        <input 
          type="checkbox" 
          name="checkbox"
          checked={stateUserCreatedFilter} 
          onChange={handleCheckbox}
          />
        <label htmlFor="checkbox" className="check-label"> Made by user</label>
      </div>
    </div>
  )
}

export default SearchFilters
