import './PageCarrousel.css'
import { Link } from 'react-router-dom';

const PageCarrousel = ({ pages, breed, page, filter }) => {

  const pointerBack = (breed, page) => {
    if(breed) {
      return `/home/breed=${breed}/page=${page - 1}`;
    }
    if(filter) {
      return `/home/filter=${filter}/page=${page - 1}`;
    }
    return `/home/page=${page - 1}`;
  };

  const pointerNext = (breed, page) => {
    if(breed) {
      return `/home/breed=${breed}/page=${page + 1}`;
    }
    if(filter) {
      return `/home/filter=${filter}/page=${page + 1}`;
    }
    return `/home/page=${page + 1}`;
  };
  
  const scrollToZero = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="search-bar-container">
      {
        pages !== 0 && <>
          <Link 
            to={pointerBack(breed, page)} 
            className={`${page === 1 ? "disabled-link" : "link"} button-container`} 
            onClick={scrollToZero}
          >
            <div className="nav-buttons">{"<"}</div>
          </Link>
          <div className={`${page === 1 ? "btn-placeholder" : ""}`}>
          </div>
          { 
            pages !== 1 &&
            <strong>{page}</strong>
          }
          <Link 
            to={pointerNext(breed, page)} 
            className={`${page >= pages ? "disabled-link" : "link"} button-container`} 
            onClick={scrollToZero}
          >
            <div className="nav-buttons">{">"}</div>
          </Link>
          <div className={`${page >= pages ? "btn-placeholder" : ""}`}>
          </div>
        </>
      }
    </div>
  )
}

export default PageCarrousel
