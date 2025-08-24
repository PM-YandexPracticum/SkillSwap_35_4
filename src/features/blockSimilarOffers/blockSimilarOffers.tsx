import React, { useRef, useState } from 'react';
import type { BlockSimilarOffersProps } from './types';
import { Title } from '../../shared/ui/title/title';
import { Button } from '../../shared/ui/button';
import { Card } from '../card/card';
import chevronRight from '../../shared/assets/icons/chevronRight.svg?url';
import chevronLeft from '../../shared/assets/icons/chevronLeft.svg?url';
import style from './blockSimilarOffers.module.scss';

export const BlockSimilarOffers: React.FC<BlockSimilarOffersProps> = ({
  cards,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

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
    <section className={style['block-similar-offers']}>
      <div className={style['block-similar-offers__title']}>
        <Title as="h2" align="left">
          Похожие предложения
        </Title>
      </div>

      <div className={style['block-similar-offers__content']}>
        <Button
          className={`${style['block-similar-offers__nav-arrow']} ${style['block-similar-offers__nav-arrow--left']} ${!showLeftArrow ? style['block-similar-offers__nav-arrow--hidden'] : ''}`}
          onClick={() => scroll('left')}
        >
          <img src={chevronLeft} alt="Прокрутить влево" />
        </Button>

        <div
          className={style['block-similar-offers__container']}
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
        >
          <div className={style['block-similar-offers__wrapper']}>
            {cards.map((card) => (
              <div
                key={card.id}
                className={style['block-similar-offers__card']}
              >
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
          className={`${style['block-similar-offers__nav-arrow']} ${style['block-similar-offers__nav-arrow--right']} ${!showRightArrow ? style['block-similar-offers__nav-arrow--hidden'] : ''}`}
          onClick={() => scroll('right')}
        >
          <img src={chevronRight} alt="Прокрутить вправо" />
        </Button>
      </div>
    </section>
  );
};
