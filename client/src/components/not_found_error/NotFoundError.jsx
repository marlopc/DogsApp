import { useDispatch } from 'react-redux';
import { getDogs, setDefaultHome } from '../../actions';
import './NotFoundError.css';
import dogHelp from '../../assets/nf-help.png';

const NotFoundError = ({ setLoading }) => {

  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(setDefaultHome());
    dispatch(getDogs());
    setLoading(true)
  };

  return (
    <div className="nf-container">
      <div>
        <img src={dogHelp} alt="" width="200px"/>
      </div>
      <div className="help-text">
        <h1>No results were found</h1>
        <ul>
          <li>Check if you misspelled your search</li>
          <li>Look in another temperament or filter</li>
          <li>Search it manually</li>
        </ul>
          <small>Click <strong style={{cursor:"pointer"}} onClick={handleReset}> here</strong> to get back</small>
      </div>
    </div>
  )
}

export default NotFoundError
