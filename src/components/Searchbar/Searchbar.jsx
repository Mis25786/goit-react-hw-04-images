import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { ImSearch } from 'react-icons/im';

import css from './Searchbar.module.css';

const Searchbar = ({ handleFormSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast('Enter your request');
      return;
    }
    handleFormSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className={css['Searchbar']}>
      <form className={css['SearchForm']} onSubmit={handleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <ImSearch style={{ fontSize: 30 }}>Search</ImSearch>
        </button>

        <input
          className={css['SearchForm-input']}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
