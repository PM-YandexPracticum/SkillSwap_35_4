import { useNavigate } from 'react-router-dom';
import { ProfileSection } from '../../features/profileSection';
import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';

//TODO заменить функции заглушки на реальные

// Пример данных пользователя
const userExample = {
  email: 'user@example.com',
  name: 'John Doe',
  birthday: new Date('1990-01-01'),
  gender: 'Мужской' as 'Мужской' | 'Женский' | 'Не указан',
  location: 'New York',
  description: 'Lorem ipsum dolor sit amet.',
  avatarUrl:
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
};

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        onLogoClick={() => navigate('/')}
        onAboutClick={() => navigate('/about')}
        onSearch={() => alert('Поиск выполнен')}
        isLoggedIn={true}
        username={userExample.name}
        avatarUrl={userExample.avatarUrl}
      />
      <ProfileSection {...userExample} />
      <Footer />
    </>
  );
};
