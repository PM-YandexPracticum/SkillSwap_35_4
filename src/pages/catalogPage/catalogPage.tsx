import React, { useEffect, useState } from 'react';
import styles from './catalogPage.module.scss';
import { MainLayout } from '../../app/layouts/MainLayout';
import { Header } from '../../widgets/header/header';
import { Footer } from '../../widgets/footer';
import { Catalog } from '../../widgets/catalog/catalog';
import { InfiniteScroll } from '../../shared/ui/infiniteScroll';
import data from '../../api/mok.json';
import type { CatalogPageProps } from './types';

const PAGE_SIZE = 9;

export const CatalogPage: React.FC<CatalogPageProps> = ({
  title = 'Каталог',
}) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => setDarkTheme((p) => !p);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkTheme ? 'dark' : 'light',
    );
  }, [darkTheme]);

  const [items, setItems] = useState(() => data.users.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = items.length < data.users.length;

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const next = data.users.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    setItems((prev) => [...prev, ...next]);
    setPage((p) => p + 1);
    setIsLoading(false);
  };

  return (
    <MainLayout
      header={
        <Header
          onLogoClick={() => {}}
          onAboutClick={() => {}}
          onSearch={(v) => console.log('search', v)}
          onThemeToggle={toggleTheme}
          darkTheme={darkTheme}
          onLogin={() => {}}
          onRegister={() => {}}
        />
      }
      footer={<Footer />}
    >
      <div className={styles.main}>
        <aside className={styles.filtersStub} />
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
