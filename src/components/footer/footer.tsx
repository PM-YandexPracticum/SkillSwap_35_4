// import LogoUI from '../../shared/ui/LogoUI/LogoUI'
import styles from './index.module.scss'

// TODO: изменить часть с лого когда починят компонент LogoUi

export const Footer: React.FC = () => {
  return (
      <footer className={styles['footer-container']}>
        <div className={styles.logo}>
          SkillSwap
          {/* <LogoUI variant='icon'></LogoUI>
          <LogoUI variant='title'></LogoUI> */}
        </div>
        <div className={styles.links}>
          <a className={styles.link} href="#">О проекте</a>
          <a className={styles.link} href="#">Контакты</a>
          <a className={styles.link} href="#">Политика конфиденциальности</a>
          <a className={styles.link} href="#">Все навыки</a>
          <a className={styles.link} href="#">Блог</a>
          <a className={styles.link} href="#">Пользовательское соглашение</a>
        </div>
        <p className={styles.caption}>SkillSwap - 2025</p>
      </footer>
  )
}