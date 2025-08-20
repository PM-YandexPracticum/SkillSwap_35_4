import React, { useEffect, useRef } from 'react';

export interface InfiniteScrollProps {
  children: React.ReactNode;
  loadMore: () => void | Promise<void>;
  hasMore: boolean;
  isLoading?: boolean;
  className?: string;
  rootMargin?: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  loadMore,
  hasMore,
  isLoading,
  className,
  rootMargin = '200px',
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;
    const element = triggerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, loadMore, rootMargin]);

  return (
    <div className={className}>
      {children}
      {hasMore && !isLoading && <div ref={triggerRef} style={{ height: 1 }} />}
      {isLoading && (
        <div style={{ padding: '16px', textAlign: 'center' }}>Загрузка...</div>
      )}
    </div>
  );
};

export default InfiniteScroll;
