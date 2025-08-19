import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import style from './MainLayout.module.scss';
export type MainLayoutProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
};
export const MainLayout = ({
  header = null,
  footer = null,
  children = null,
}: MainLayoutProps) => {
  return (
    <div className={style.layout_wrapper}>
      {header}
      <main className={style.content}>{children || <Outlet />}</main>
      {footer}
    </div>
  );
};
