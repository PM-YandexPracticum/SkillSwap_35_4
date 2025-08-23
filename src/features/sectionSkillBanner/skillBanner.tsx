import React, { useRef, useState } from 'react';
import { Title } from '../../shared/ui/title/title';
import share from '../../assets/icons/share.svg?url';
import moreSquare from '../../assets/icons/moreSquare.svg?url';
import chevronRight from '../../assets/icons/chevronRight.svg?url';
import style from './skillBanner.module.scss';
import type { skillBannerProps } from './types';
import { LikeButton } from '../../shared/ui/likeButton/likeButton';
import { Button } from '../../shared/ui/button/button';

export const SkillBanner: React.FC<skillBannerProps> = ({
  skillCategory,
  title,
  description,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [isMore, setIsMore] = useState(false);

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

  const handleOpenModal = () => {
    // временная заглушка без диспатч
  };

  return (
    <section className="sectionSkillBanner">
      <div className="skillBanner__iconButtons">
        <LikeButton
          className="skillBanner__iconButtons-like"
          onClick={() => setIsLiked(!isLiked)}
          active={isLiked}
        ></LikeButton>
        <button
          className="skillBanner__iconButtons-share"
          onClick={() => setIsShare(!isShare)}
        >
          <img src={share} alt="Поделиться" />
        </button>
        <button
          className="skillBanner__iconButtons-more"
          onClick={() => setIsMore(!isMore)}
        >
          <img src={moreSquare} alt="Узнать больше" />
        </button>
      </div>
      <div className="skillBanner__infoSkill">
        <div className="skillBanner__infoSkill-caption">
          <div className="skillBanner__infoSkill-title">
            <Title as="h1" align="left">
              {title}
            </Title>
          </div>
          <div className="skillBanner__infoSkill-subtitle">
            <Title as="caption" align="left">
              {skillCategory}
            </Title>
          </div>
          <div className="skillBanner__infoSkill-skillCaption">
            <p>{description}</p>
          </div>
          <Button onClick={handleOpenModal} title="Предложить обмен" children />
        </div>
        <div className="skillBanner__infoSkill-gallery">
          {showLeftArrow && (
            <button
              className="skillBanner__infoSkill-gallery-chevron skillBanner__infoSkill-gallery-chevron--left"
              onClick={() => scroll('left')}
            >
              <img src={chevronRight} alt="Прокрутить влево" />
            </button>
          )}

          <div
            className={style['skillBanner__infoSkill-gallery__container']}
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
          >
            <div className="skillBanner__infoSkill-gallery__scroll"></div>
          </div>

          {showRightArrow && (
            <button
              className="skillBanner__infoSkill-gallery-chevron skillBanner__infoSkill-gallery-chevron--right"
              onClick={() => scroll('right')}
            >
              <img src={chevronRight} alt="Прокрутить вправо" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
