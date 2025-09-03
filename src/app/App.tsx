import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import style from './App.module.scss';
// import { TestPage } from '../pages/testPage/TestPage';
// import { MainLayout } from './layouts/MainLayout';
// import { AuthLayout } from './layouts/AuthLayout';
import { ErrorPage404 } from '../pages/errorPage404';
import { CatalogPage } from '../pages/catalogPage';
import { RegistrationPage } from '../pages/registrationPage';
import { Profile } from '../pages/profilePage';
import { ProtectedRoute } from '../shared/ui/protectedRoute/protectedRoute';
import { SkillPage } from '../pages/skillPage/skillPage';
import { useDispatch } from '../services/store';
// import { useEffect } from 'react';
import { init } from '../services/authSlice/authSlice';
import { useEffect } from 'react';
import { SuccessModal } from '../widgets/successModal';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
   const backgroundLocation =
    (location.state as { backgroundLocation?: Location })?.backgroundLocation;

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={style.app}>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/skill/:id" element={<SkillPage />} />

        {/* в макете нет этапа авторизации поэтому временно оба роутера ведут на страницу регистрации */}
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<ErrorPage404 />} />
      </Routes>

      {/** Модалки */}
      {backgroundLocation && (
        <Routes>
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <SuccessModal onClose={onCloseModal} />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
