import { Outlet } from 'react-router-dom';
import style from './AuthLayout.module.scss';
type AuthLayoutProps = {
  children?: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={style.layout_wrapper}>
      {/* <AuthHeader/> добавить нужный компонент*/}
      <main>{children || <Outlet />}</main>
    </div>
  );
};
