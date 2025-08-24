import React, { useState } from 'react';
import { Title } from '../../shared/ui/title/title';
import share from '../../shared/assets/icons/share.svg?url';
import gallery1 from '../../shared/assets/png/3aaa87619f4111f05c60657e37b8861a7166ae17.jpg';
import gallery2 from '../../shared/assets/png/3e8d0addaae98c17be1d91d67274a84cc1b373a1.jpg';
import gallery3 from '../../shared/assets/png/305a772fe7cac4584b8cbd96023ce7d60d64954d.jpg';
import gallery4 from '../../shared/assets/png/706f87d20b14825dacb3f1b32ca9fb7be905f467.jpg';
import moreSquare from '../../shared/assets/icons/moreSquare.svg?url';
import chevronRight from '../../shared/assets/icons/chevronRight.svg?url';
import chevronLeft from '../../shared/assets/icons/chevronLeft.svg?url';
import style from './skillBanner.module.scss';
import type { skillBannerProps } from './types';
import { LikeButton } from '../../shared/ui/likeButton/likeButton';
import { Button } from '../../shared/ui/button/button';

export const SkillBanner: React.FC<skillBannerProps> = ({
  skillCategory,
  title,
  description,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [isMore, setIsMore] = useState(false);

  const allGallerySlides = [
    [
      { id: 1, image: gallery1, title: 'Фото 1', type: 'large' as const },
      { id: 2, image: gallery2, title: 'Фото 2', type: 'small' as const },
      { id: 3, image: gallery3, title: 'Фото 3', type: 'small' as const },
      { id: 4, image: gallery4, title: 'Фото 4', type: 'small' as const },
    ],
    [
      { id: 5, image: gallery2, title: 'Другое фото', type: 'large' as const },
      { id: 6, image: gallery1, title: 'Фото 5', type: 'small' as const },
      { id: 7, image: gallery3, title: 'Фото 6', type: 'small' as const },
      { id: 8, image: gallery4, title: 'Фото 7', type: 'small' as const },
    ],
    [
      { id: 9, image: gallery3, title: 'Еще фото', type: 'large' as const },
      { id: 10, image: gallery1, title: 'Фото 8', type: 'small' as const },
      { id: 11, image: gallery2, title: 'Фото 9', type: 'small' as const },
      { id: 12, image: gallery4, title: 'Фото 10', type: 'small' as const },
    ],
  ];

  const totalSlides = allGallerySlides.length;

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentSlideItems = allGallerySlides[currentSlideIndex];
  const largeImage = currentSlideItems.find((item) => item.type === 'large');
  const smallImages = currentSlideItems.filter((item) => item.type === 'small');

  const handleOpenModal = () => {
    // временная заглушка без диспатч
  };

  return (
    <section className={style['sectionSkillBanner']}>
      <div className={style['skillBanner__iconButtons']}>
        <LikeButton
          className={style['skillBanner__iconButtons--like']}
          onClick={() => setIsLiked(!isLiked)}
          active={isLiked}
        ></LikeButton>
        <button
          className={style['skillBanner__iconButtons--share']}
          onClick={() => setIsShare(!isShare)}
        >
          <img src={share} alt="Поделиться" />
        </button>
        <button
          className={style['skillBanner__iconButtons--more']}
          onClick={() => setIsMore(!isMore)}
        >
          <img src={moreSquare} alt="Узнать больше" />
        </button>
      </div>

      <div className={style['skillBanner__infoSkill']}>
        <div className={style['skillBanner__infoSkill-caption']}>
          <div className={style['skillBanner__infoSkill-title']}>
            <Title as="h1" align="left">
              {title}
            </Title>
          </div>
          <div className={style['skillBanner__infoSkill-subtitle']}>
            <p>{skillCategory}</p>
          </div>
          <div className={style['skillBanner__infoSkill-skillCaption']}>
            <p>{description}</p>
          </div>
          <Button
            className={style['skillBanner__infoSkill-button']}
            variant="primary"
            size="md"
            onClick={handleOpenModal}
          >
            Предложить обмен
          </Button>
        </div>

        <div className={style['skillBanner__infoSkill-gallery']}>
          <button
            className={style['skillBanner__infoSkill-gallery-chevron']}
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
          >
            <img src={chevronLeft} alt="Предыдущий слайд" />
          </button>
          <div className={style['gallery-grid']}>
            {largeImage && (
              <div className={style['gallery-item-large']}>
                <img src={largeImage.image} alt={largeImage.title} />
              </div>
            )}
            <div className={style['gallery-items-small']}>
              {smallImages.map((item) => (
                <div key={item.id} className={style['gallery-item-small']}>
                  <img src={item.image} alt={item.title} />
                </div>
              ))}
            </div>
          </div>
          <button
            className={style['skillBanner__infoSkill-gallery-chevron']}
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
          >
            <img src={chevronRight} alt="Следующий слайд" />
          </button>
        </div>
      </div>
    </section>
  );
};
