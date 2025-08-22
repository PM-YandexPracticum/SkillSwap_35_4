import React from 'react';
import searchIcon from '../../../assets/icons/searchBar/search.svg?url';
import clearIcon from '../../../assets/icons/common/x.svg?url';
import { IconButton } from '../iconButton';
import style from './searchBar.module.scss';

type SearchBarProps = {
  placeholder: string;
  className?: string;
  onSearch: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, className }) => {

  const [searchTerm, setSearchTerm] = React.useState('');
  const input = document.getElementById('search-input') as HTMLInputElement;

  const clearInput = () => {
    setSearchTerm('');
    input.value = '';
  };

  const checkInput = () => {
    if (input) {
      setSearchTerm(input.value);
    }
  };

  return (
    <div className={`${style['search-bar']} ${className || ''}`}>
      <div style={{display: 'flex'}}>
      <IconButton id='search-button' onClick={onSearch} type='button' aria-label='Search'>
        <img src={searchIcon} alt="Search" />
      </IconButton>
      <form onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
        <input id='search-input' onInput={checkInput} type="text" placeholder={placeholder} />
      </form>
      </div>
      <IconButton disabled={searchTerm.length === 0} id='clear-button' onClick={clearInput} type='button' aria-label='Clear'>
        <img src={clearIcon} alt="Clear" />
      </IconButton>
    </div>
  );
};

