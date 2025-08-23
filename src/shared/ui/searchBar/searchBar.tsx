import React from 'react';
import searchIcon from '../../assets/icons/search.svg?url';
import clearIcon from '../../assets/icons/cross.svg?url';
import { IconButton } from '../iconButton';
import style from './searchBar.module.scss';
import type { SearchBarProps } from './types';

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Поиск...',
  className,
  onSearch,
  defaultValue = '',
}) => {
  const [searchTerm, setSearchTerm] = React.useState(defaultValue);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const clearInput: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div className={[style['search-bar'], className].filter(Boolean).join(' ')}>
      <form
        className={style['search-form']}
        onSubmit={handleSubmit}
      >
      <IconButton
        className={style['search-button']}
        id="search-button"
        onClick={handleSearchClick}
        type="button"
        aria-label="Search"
      >
        <img src={searchIcon} alt="Search" />
      </IconButton>
        <input
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder={placeholder}
          aria-label="Search input"
        />
      {searchTerm && (
        <IconButton
          className={style['clear-button']}
          id="clear-button"
          onClick={clearInput}
          type="button"
          aria-label="Clear"
        >
          <img src={clearIcon} alt="Clear" />
        </IconButton>
      )}
      </form>
    </div>
  );
};
