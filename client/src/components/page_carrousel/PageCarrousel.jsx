import './PageCarrousel.css';

const PageCarrousel = ({ pages, page, setPage }) => {
  
  // const pointerBack = (breed, page) => {
  //   if(breed) {
  //     return `/home/breed=${breed}/page=${page - 1}`;
  //   }
  //   if(filter) {
  //     return `/home/filter=${filter}/page=${page - 1}`;
  //   }
  //   return `/home/page=${page - 1}`;
  // };
  
  // const pointerNext = (breed, page) => {
  //   if(breed) {
  //     return `/home/breed=${breed}/page=${page + 1}`;
  //   }
  //   if(filter) {
  //     return `/home/filter=${filter}/page=${page + 1}`;
  //   }
  //   return `/home/page=${page + 1}`;
  // };
  
  const handleBack = () => {
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  }

  return (
    <div className="search-bar-container">
      {
        pages !== 0 && <>
          <div 
            className={`${page === 1 ? "disabled-link" : "link"} button-container`} 
            onClick={handleBack}
          >
            <div className="nav-buttons">{"<"}</div>
          </div>
          <div className={`${page === 1 ? "btn-placeholder" : ""}`}>
          </div>
          { 
            pages !== 1 &&
            <strong>{page}</strong>
          }
          <div  
            className={`${page >= pages ? "disabled-link" : "link"} button-container`} 
            onClick={handleNext}
          >
            <div className="nav-buttons">{">"}</div>
          </div>
          <div className={`${page >= pages ? "btn-placeholder" : ""}`}>
          </div>
        </>
      }
    </div>
  )
}

export default PageCarrousel
