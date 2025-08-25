import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../app/layouts/MainLayout';
import { ErrorPageContent } from '../../widgets/errorPageContent';
import Error500Icon from '../../shared/assets/icons/error 500.svg?url';
import Header from '../../widgets/header/header';
import { Footer } from '../../widgets/footer/footer';

export const ErrorPage500 = () => {
  const navigate = useNavigate();
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
      <ErrorPageContent
        image={Error500Icon}
        alt="Ошибка 500"
        title="На сервере произошла ошибка"
        description="Попробуйте позже или вернитесь на главную страницу"
        onReportClick={() => alert('Сообщение об ошибке отправлено')}
        onMainPageClick={() => navigate('/')}
      />
    </MainLayout>
  );
};

export default ErrorPage500;
