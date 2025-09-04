import React, { useEffect, useState, useMemo } from 'react';
import styles from './catalogPage.module.scss';
import { MainLayout } from '../../app/layouts/MainLayout';
import { Header } from '../../widgets/header/header';
import { Footer } from '../../widgets/footer';
import { Catalog } from '../../widgets/catalog/catalog';
import { InfiniteScroll } from '../../shared/ui/infiniteScroll';
import data from '../../api/mok.json';
import type { CatalogPageProps } from './types';
import { BusinessFilter } from '../../features/filter/filter';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../shared/hooks/useDebounce';

const PAGE_SIZE = 9;

export const CatalogPage: React.FC<CatalogPageProps> = ({
  title = 'Каталог',
}) => {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => setDarkTheme((p) => !p);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkTheme ? 'dark' : 'light',
    );
  }, [darkTheme]);

  const [filters, setFilters] = useState({
    activityType: 'all',
    skills: [] as string[],
    authorGender: 'any',
    cities: [] as string[],
  });

  const filteredData = useMemo(() => {
    return data.users.filter((user) => {
      if (
        filters.activityType === 'want-to-learn' &&
        user.subcategoriesWantToLearn.length === 0
      ) {
        return false;
      }
      if (
        filters.activityType === 'can-teach' &&
        user.skillCanTeach.length === 0
      ) {
        return false;
      }

      if (
        filters.authorGender !== 'any' &&
        user.gender !== filters.authorGender
      ) {
        return false;
      }

      if (filters.skills.length > 0) {
        const userSkills = [
          ...user.skillCanTeach.map((s) => s.id.toString()),
          ...user.subcategoriesWantToLearn.map((s) => s.id.toString()),
        ];
        if (!filters.skills.every((s) => userSkills.includes(s))) {
          return false;
        }
      }

      if (
        filters.cities.length > 0 &&
        !filters.cities.includes(user.location)
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const [items, setItems] = useState(() => filteredData.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = items.length < filteredData.length;

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const next = filteredData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    setItems((prev) => [...prev, ...next]);
    setPage((p) => p + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    setItems(filteredData.slice(0, PAGE_SIZE));
    setPage(1);
  }, [filteredData]);

  const [rawSearch, setRawSearch] = useState('');
  const debounced = useDebounce(rawSearch, 500);

  useEffect(() => {
    setFilters(prev => {
      if (debounced) {
        if (prev.skills.length === 1 && prev.skills[0] === debounced) {
          return prev;
        }
        return { ...prev, skills: [debounced] };
      } else {
        if (
          prev.skills.length === 0 &&
          prev.activityType === 'all' &&
          prev.authorGender === 'any' &&
          prev.cities.length === 0
        ) {
          return prev;
        }
        return {
          activityType: 'all',
          skills: [] as string[],
          authorGender: 'any',
          cities: [] as string[],
        };
      }
    });
  }, [debounced]);

  return (
    <MainLayout
      header={
        <Header
          onLogoClick={() => {navigate('/');}}
          onAboutClick={() => {navigate('/about');}}
          onSearch={(value) => {setRawSearch(value);}}
          onThemeToggle={toggleTheme}
          darkTheme={darkTheme}
          onLogin={() => {navigate('/login');}}
          onRegister={() => {navigate('/register');}}
        />
      }
      footer={<Footer />}
    >
      <div className={styles.main}>
        <aside className={styles.filters}>
          <BusinessFilter onFiltersChange={setFilters} />
        </aside>
        <section className={styles.content}>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoading}
          >
            <Catalog
              title={title}
              moreBtn={true}
              moreBtnType="sort"
              data={items}
            />
          </InfiniteScroll>
        </section>
      </div>
    </MainLayout>
  );
};

export default CatalogPage;
