import React from 'react';
import styles from './header.module.scss';
import { LogoUI } from '../../shared/ui/logoUI';
import { MegaMenu } from '../../shared/ui/megaMenu';
import { SearchBar } from '../../shared/ui/searchBar';
import { IconButton } from '../../shared/ui/iconButton';
import { Button } from '../../shared/ui/button';
import type { HeaderProps } from './types';

import MoonIcon from '../../shared/assets/icons/moon.svg';
import SunIcon from '../../shared/assets/icons/sun.svg';
import ArrowIcon from '../../shared/assets/icons/chevron-down.svg';

export const Header: React.FC<HeaderProps> = ({
  onLogoClick,
  onAboutClick,
  onSearch,
  onThemeToggle,
  onLogin,
  onRegister,
  darkTheme = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logoBlock} onClick={onLogoClick}>
        <LogoUI variant="icon" size={40} />
        <LogoUI variant="title" size={24} className={styles.logoTitle} />
      </div>

      <div className={styles.links}>
        <a className={styles.link} onClick={onAboutClick}>
          О проекте
        </a>

        <div
          className={styles.megaMenuWrapper}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <a className={styles.link}>
            Все навыки
            <div className={styles.arrowIconWrapper}>
              <ArrowIcon />
            </div>
          </a>
          {isMenuOpen && (
            <div className={styles.megaMenuDropdown}>
              <MegaMenu />
            </div>
          )}
        </div>
      </div>
      <div className={styles.search}>
        <SearchBar placeholder="Поиск..." onSearch={onSearch} />
      </div>
      <div className={styles.themeButton}>
        <IconButton onClick={onThemeToggle} aria-label="Сменить тему">
          {darkTheme ? <MoonIcon /> : <SunIcon />}
        </IconButton>
      </div>
      <div className={styles.buttons}>
        <Button variant="secondary" onClick={onLogin}>
          Войти
        </Button>
        <Button variant="primary" onClick={onRegister}>
          Зарегистрироваться
        </Button>
      </div>
    </header>
  );
};

export default Header;
