import React, { useRef, useState } from 'react';
import type { BlockSimilarOffersProps } from './types';
import { Title } from '../../shared/ui/title/Title';
import { Button } from '../../shared/ui/button';
import { Card } from '../../shared/ui/card/card';
import scrollArrow from '../../../assets/icons/scrollArrow/scrollArrow.svg?url';
import style from './blockSimilarOffers.module.scss';

export const BlockSimilarOffers: React.FC<BlockSimilarOffersProps> = ({
  cards,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Функция для проверки видимости стрелок навигации
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Прокрутка контейнера
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === 'right'
          ? scrollContainerRef.current.scrollLeft + scrollAmount
          : scrollContainerRef.current.scrollLeft - scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <section className="block-similar-offers" style={{ padding: '60px 36px' }}>
      <div
        className="block-similar-offers__title"
        style={{ paddingTop: '32px' }}
      >
        <Title as="h2" align="left">
          Похожие предложения{' '}
        </Title>
      </div>
      <div>
        <Button
          className={`block-similar-offers__nav-arrow block-similar-offers__nav-arrow--left ${!showLeftArrow ? 'block-similar-offers__nav-arrow--hidden' : ''}`}
          onClick={() => scroll('left')}
        >
          <img src={scrollArrow} alt="Прокрутить влево" />
        </Button>
        <div
          className={style['block-similar-offers__container']}
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
        >
          <div className="block-similar-offers__scroll">
            {cards.map((card) => (
              <div key={card.id} className="block-similar-offers__card-wrapper">
                <Card
                  {...card}
                  avatarUrl={card.avatarUrl}
                  name={card.name}
                  location={card.location}
                  age={card.age}
                  description={card.description}
                  skillCanTeach={card.skillCanTeach}
                  subcategoriesWantToLearn={card.subcategoriesWantToLearn}
                  isLiked={card.isLiked}
                  hasRequested={card.hasRequested}
                  onToggleLike={card.onToggleLike}
                  onDetailsClick={card.onDetailsClick}
                  showLike={card.showLike}
                  showDetails={card.showDetails}
                  variant="list"
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          className={`block-similar-offers__nav-arrow block-similar-offers__nav-arrow--right ${!showRightArrow ? 'block-similar-offers__nav-arrow--hidden' : ''}`}
          onClick={() => scroll('right')}
        >
          <img src={scrollArrow} alt="Прокрутить вправо" />
        </Button>
      </div>
    </section>
  );
};
