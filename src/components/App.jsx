import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { makeRequest } from '../service/api';

import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Button from 'components/Button';

export const App = () => {
  const [inputValue, setInputValue] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (inputValue || page) {
      setLoading(true);

      makeRequest(inputValue, page)
        .then(data => {
          if (data.hits.length === 0) {
            setLoading(false);
            setSearchResult([]);
            toast.error(`Nothing was found for the query ${inputValue}`);
            return;
          }

          if (inputValue) {
            return (
              setSearchResult(data.hits),
              setTotalHits(data.totalHits),
              setLoading(false),
              setPage(1)
            );
          }

          if (page) {
            return setSearchResult(prevState => {
              [...prevState, ...data.hits];
            });
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [inputValue, page]);

  const handleFormSubmit = value => setInputValue(value);

  const incrementPage = () =>
    setPage(prevState => {
      return prevState + 1;
    });

  return (
    <div>
      <Searchbar handleFormSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {error && toast.error(`Sorry, there was an error. Please try again.`)}
      {searchResult.length > 0 && <ImageGallery searchResult={searchResult} />}
      {searchResult.length > 0 && searchResult.length < totalHits && (
        <Button incrementPage={incrementPage} />
      )}

      <ToastContainer autoClose={2000} />
    </div>
  );
};

//==========================================================================

// import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { makeRequest } from '../service/api';

// import ImageGallery from './ImageGallery';
// import Searchbar from './Searchbar';
// import Loader from './Loader';
// import Button from 'components/Button';

// export class App extends Component {
//   state = {
//     inputValue: null,
//     searchResult: [],
//     error: null,
//     loading: false,
//     totalHits: 0,
//     page: 1,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevState.inputValue;
//     const nextName = this.state.inputValue;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevName !== nextName || prevPage < nextPage) {
//       this.setState({ loading: true });

//       makeRequest(nextName, nextPage)
//         .then(data => {
//           if (data.hits.length === 0) {
//             this.setState({ loading: false, searchResult: [] });
//             toast.error(`Nothing was found for the query ${nextName}`);
//             return;
//           }
//           this.setState(prevState => {
//             if (prevName !== nextName) {
//               return {
//                 ...prevState,
//                 searchResult: data.hits,
//                 totalHits: data.totalHits,
//                 loading: false,
//                 page: 1,
//               };
//             }

//             if (prevPage < nextPage) {
//               return {
//                 searchResult: [...prevState.searchResult, ...data.hits],
//               };
//             }
//           });
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   handleFormSubmit = value => {
//     this.setState({ inputValue: value });
//   };

//   incrementPage = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   render() {
//     const { loading, error, searchResult, totalHits } = this.state;

//     return (
//       <div>
//         <Searchbar handleFormSubmit={this.handleFormSubmit} />
//         {loading && <Loader />}
//         {error && toast.error(`Sorry, there was an error. Please try again.`)}
//         {searchResult.length > 0 && (
//           <ImageGallery searchResult={searchResult} />
//         )}
//         {searchResult.length > 0 && searchResult.length < totalHits && (
//           <Button incrementPage={this.incrementPage} />
//         )}

//         <ToastContainer autoClose={2000} />
//       </div>
//     );
//   }
// }
