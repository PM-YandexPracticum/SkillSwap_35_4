import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../app/layouts/MainLayout';
import { Header } from '../../widgets/header/header';
import { Footer } from '../../widgets/footer/footer';
import { SkillBanner } from '../../features/sectionSkillBanner/skillBanner';
import { Card } from '../../features/card';
import { BlockSimilarOffers } from '../../features/sectionSimilarOffers/blockSimilarOffers';
import styles from './skillPage.module.scss';

export const SkillPage = () => {
  const navigate = useNavigate();
  //@TODO подключить данные к странице
  return (
    <MainLayout
      header={
        <Header
          //@TODO проверить и заменить функции-заглушки
          onLogoClick={() => navigate('/')}
          onAboutClick={() => navigate('/about')}
          onSearch={() => alert('Поиск')}
          onThemeToggle={() => alert('Смена темы')}
          onLogin={() => navigate('/login')}
          onRegister={() => navigate('/register')}
        />
      }
      footer={<Footer />}
    >
      <div className={styles.container}>
        <div className={styles.containerUserAndSkill}>
          <Card
            //@TODO передать данные
            isLiked={false}
            hasRequested={false}
            onToggleLike={() => alert('toggleLike')}
            onDetailsClick={() => alert('onDetailsClick')}
            id={''}
            login={''}
            avatarUrl={
              'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww'
            }
            name={'Иван'}
            location={'Санкт-Петербург'}
            age={'34'}
            gender={'Не указан'}
            birthday={''}
            email={''}
            description={
              'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое'
            }
            skillCanTeach={[]}
            subcategoriesWantToLearn={[]}
            showLike={false}
            showDetails={false}
            showDescription={true}
          ></Card>
          <SkillBanner
            //@TODO передать данные
            skillCategory={'Бизнес и карьера'}
            title={'Игра на барабанах'}
            description={
              'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры'
            }
          ></SkillBanner>
        </div>
        <BlockSimilarOffers
          //@TODO передать данные
          cards={[]}
        ></BlockSimilarOffers>
      </div>
    </MainLayout>
  );
};

export default SkillPage;
