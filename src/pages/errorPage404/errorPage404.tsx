import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../app/layouts/MainLayout';
import { ErrorPageContent } from '../../widgets/errorPageContent';
import Error404Icon from '../../shared/assets/icons/error 404.svg?url';
import Header from '../../widgets/header/header';
import { Footer } from '../../widgets/footer/footer';

export const ErrorPage404 = () => {
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
        image={Error404Icon}
        alt="Ошибка 404"
        title="Страница не найдена"
        description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже"
        onReportClick={() => alert('Сообщение об ошибке отправлено')}
        onMainPageClick={() => navigate('/')}
      />
    </MainLayout>
  );
};

export default ErrorPage404;
