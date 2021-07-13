import './SearchFilters.css';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";


export const getSortingCb = (sorting) => {
  const sorts = {
    AA (a, b) {
      if(a.name > b.name) {
        return 1
      }
      if(b.name > a.name) {
        return -1;
      }
      return 0
    },
    AD (a, b) {
      if(a.name > b.name) {
        return -1
      }
      if(b.name > a.name) {
        return 1;
      }
      return 0
    },
    WA (a, b) {
      if(parseInt(a.weight) > parseInt(b.weight)) {
        return 1
      }
      if(parseInt(b.weight) > parseInt(a.weight)) {
        return -1;
      }
      return 0
    },
    WD (a, b) {
      if(parseInt(a.weight) > parseInt(b.weight)) {
        return -1
      }
      if(parseInt(b.weight) > parseInt(a.weight)) {
        return 1;
      }
      return 0
    }
  }

  return sorts[sorting];
}

const SearchFilters = ({ setPage, filter, setFilter, setSortType, sortType, setUserCreatedFilter, userCreatedFilter, search, setSearch }) => {
  const [form, setForm] = useState("");
  const [temperaments, setTemperaments] = useState([]);

  const stateTemperaments = useSelector(state => state.temperaments);
  const stateFilter = useSelector(state => state.filter);

  // const history = useHistory();

  useEffect(() => {
    setTemperaments(stateTemperaments);
  }, [stateTemperaments])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(form !== "") {
      setPage(1);
      setSearch(form);
    }
  }

  const handleChange = (e) => {
    setForm(e.target.value);
  }

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  }

  const handleFilter = (e) => {
    setPage(1);
    setFilter(e.target.value);
  }

  const handleCheckbox = (e) => {
    setPage(1);
    setUserCreatedFilter(e.target.checked);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input 
          name="breed"
          type="text"
          value={form} 
          onChange={handleChange} 
          placeholder="Search by breed"
        />
        <input type="submit" value=">"/>
      </form>
      <select value={stateFilter} onChange={handleFilter}>
        <option name="placeholder" hidden="hidden" value="">Filter</option>
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
          checked={userCreatedFilter} 
          onChange={handleCheckbox}
          />
        <label htmlFor="checkbox"> Made by user</label>
      </div>
      <select value={sortType} onChange={handleSortChange}>
        <option name="placeholder" hidden="hidden" value="">Sort</option>
        <optgroup label="Alphabetically">
          <option value="AA">A {"<"} Z</option>
          <option value="AD">Z {"<"} A</option>
        </optgroup>
        <optgroup label="Weight">
          <option value="WA">Less weight {"<"} More weight</option>
          <option value="WD">More weight {"<"} Less weight</option>
        </optgroup>
      </select>
    </div>
  )
}

export default SearchFilters
