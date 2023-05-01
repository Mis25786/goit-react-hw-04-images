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
    if (!inputValue) {
      return;
    }
    setLoading(true);

    makeRequest(inputValue, page)
      .then(data => {
        setLoading(false);
        if (data.hits.length === 0) {
          setSearchResult([]);
          // setTotalHits(0);
          toast.error(`Nothing was found for the query ${inputValue}`);
          return;
        }
        if (page === 1) {
          setSearchResult(data.hits);
          setTotalHits(data.totalHits);
        } else {
          setSearchResult(prevSearchResult => [
            ...prevSearchResult,
            ...data.hits,
          ]);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  }, [inputValue, page]);

  const handleFormSubmit = value => {
    setInputValue(value);
    setPage(1);
  };

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
