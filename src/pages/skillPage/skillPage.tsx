import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '../../app/layouts/MainLayout';
import { Header } from '../../widgets/header/header';
import { Footer } from '../../widgets/footer/footer';
import { SkillBanner } from '../../features/sectionSkillBanner/skillBanner';
import { Card } from '../../features/card';
import { BlockSimilarOffers } from '../../features/sectionSimilarOffers/blockSimilarOffers';
import { getUserById, selectUser } from '../../services/usersSlice/usersSlice';
import {
  skillsConfig,
  SKILL_TYPES,
} from '../../shared/constants/skills/skills.config';
import type { Subcategory, User as UserApi } from '../../api/types';
import type { User as ModelUser, UserSkill } from '../../models/user/model';
import { useAppDispatch, useSelector } from '../../services/store';
import styles from './skillPage.module.scss';

export const SkillPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  // Пользователь из store
  const user = useSelector((state) => selectUser({ usersSlice: state.users }));

  // Скиллы
  const skills = useSelector((state) => state.skills);

  // Загрузка пользователя по id
  useEffect(() => {
    if (id) dispatch(getUserById(Number(id)));
  }, [dispatch, id]);

  // Функции-адаптеры
  const adaptSubcategoryToSkill = (sub: Subcategory): UserSkill => {
    const category: keyof typeof skillsConfig | 'Остальные категории' =
      SKILL_TYPES.find((type) => skillsConfig[type].items.includes(sub.name)) ||
      'Остальные категории';

    return {
      subcategoryId: String(sub.id),
      category,
      subcategory: sub.name,
      name: sub.name,
      images: [],
      description: '',
      customSkillId: String(sub.id),
      id: sub.id,
    };
  };

  const adaptUser = (apiUser: UserApi): ModelUser => {
    const birthdayDate = new Date(apiUser.birthDate || '2000-01-01');
    return {
      id: String(apiUser.id),
      login: apiUser.email,
      avatarUrl: apiUser.avatarUrl || '',
      name: apiUser.name,
      location: apiUser.location,
      age: new Date().getFullYear() - birthdayDate.getFullYear(),
      birthday: birthdayDate,
      gender:
        apiUser.gender === 'male'
          ? 'Мужской'
          : apiUser.gender === 'female'
            ? 'Женский'
            : 'Не указан',
      email: apiUser.email,
      description: '',
      skillCanTeach: apiUser.skillCanTeach.map(adaptSubcategoryToSkill),
      subcategoriesWantToLearn: apiUser.subcategoriesWantToLearn.map(
        adaptSubcategoryToSkill,
      ),
    };
  };

  // адаптированный пользователь из Api под ModelUser
  const modelUser: ModelUser | null = useMemo(
    () => (user ? adaptUser(user as UserApi) : null),
    [user],
  );

  const getCategoryForSkill = (skillName: string) =>
    SKILL_TYPES.find((type) => skillsConfig[type].items.includes(skillName)) ||
    'Остальные категории';

  return (
    <MainLayout
      header={
        <Header
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
      {modelUser && (
        <div className={styles.container}>
          <div className={styles.containerUserAndSkill}>
            <Card
              id={modelUser.id}
              login={modelUser.login}
              avatarUrl={modelUser.avatarUrl}
              name={modelUser.name}
              location={modelUser.location}
              age={modelUser.age}
              gender={modelUser.gender}
              birthday={modelUser.birthday}
              email={modelUser.email}
              description={modelUser.description}
              skillCanTeach={modelUser.skillCanTeach}
              subcategoriesWantToLearn={modelUser.subcategoriesWantToLearn}
              isLiked={false}
              hasRequested={false}
              onToggleLike={() => alert('toggleLike')}
              onDetailsClick={() => alert('onDetailsClick')}
              showLike={false}
              showDetails={false}
              showDescription={true}
            />

            {skills
              .filter((skill) => skill.skillCanTeach.name)
              .map((skill) => (
                <SkillBanner
                  key={skill.uid}
                  skillCategory={getCategoryForSkill(skill.skillCanTeach.name)}
                  title={skill.skillCanTeach.name}
                  description={skill.description}
                />
              ))}
          </div>

          <BlockSimilarOffers cards={[]} />
        </div>
      )}
    </MainLayout>
  );
};

export default SkillPage;
