import React, { useState } from 'react';
import css from './Filter.module.css';
export const Filter = ({ filterHandler }) => {
  const [filter, setFilter] = useState('');

  const handleInputChange = ({ target }) => {
    filterHandler(target.value.toLowerCase());
    setFilter(target.value);
  };
  return (
    <div className={css.container}>
      <p>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Filter;
