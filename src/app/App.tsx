import { Route, Routes, useLocation } from 'react-router-dom';
import { TestPage } from '../pages/testPage/TestPage';
import style from './App.module.scss';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  return (
    <div className={style.app}>
      <Routes location={backgroundLocation || location}>
        <Route element={<MainLayout header={null} footer={null} />}>
          {' '}
          {/* Добавить нужные элементы header/footer (основные пути)*/}
          <Route index element={<TestPage />} />
          <Route path="*" element={<div> Error 404 </div>} />{' '}
          {/* Страница ошибок 404/500 */}
        </Route>
        <Route element={<AuthLayout />}>
          {' '}
          {/* Для путей '/auth/*'; Внуть AuthLayout добавить нужный Header)*/}
        </Route>
      </Routes>

      {/** Модалки */}
      {backgroundLocation && <Routes></Routes>}
    </div>
  );
}

export default App;
