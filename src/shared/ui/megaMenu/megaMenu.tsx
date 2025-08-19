import style from './megaMenu.module.scss';
import businessIcon from '../../../assets/icons/skillsTypes/briefcase.svg?url';
import creativityIcon from '../../../assets/icons/skillsTypes/palette.svg?url';
import languageIcon from '../../../assets/icons/skillsTypes/global.svg?url';
import educationIcon from '../../../assets/icons/skillsTypes/book.svg?url';
import houseIcon from '../../../assets/icons/skillsTypes/home.svg?url';
import lifestyleIcon from '../../../assets/icons/skillsTypes/lifestyle.svg?url';

export const MegaMenu: React.FC = () => {
  return (
    <div className={style['mega-menu']}>
      <div className={style['menu-section']}>
        <img src={businessIcon} alt='Бизнес и карьера' />
        <div className={style['menu-section_items']}>
          <h3 className={style['menu-section_title']}>Бизнес и карьера</h3>
          <button className={style['menu-section_item']} type='button'>Управление командой</button>
          <button className={style['menu-section_item']} type='button'>Маркетинг и реклама</button>
          <button className={style['menu-section_item']} type='button'>Продажи и переговоры</button>
          <button className={style['menu-section_item']} type='button'>Личный бренд</button>
          <button className={style['menu-section_item']} type='button'>Резюме и собеседование</button>
          <button className={style['menu-section_item']} type='button'>Тайм-менеджмент</button>
          <button className={style['menu-section_item']} type='button'>Проектное управление</button>
          <button className={style['menu-section_item']} type='button'>Предпринимательство</button>
        </div>
      </div>
      <div className={style['menu-section']}>
        <img src={creativityIcon} alt='Творчество и искусство' />
        <div className={style['menu-section_items']}>
          <h3 className={style['menu-section_title']}>Творчество и искусство</h3>
          <button className={style['menu-section_item']} type='button'>Рисование и иллюстрация</button>
          <button className={style['menu-section_item']} type='button'>Фотография</button>
          <button className={style['menu-section_item']} type='button'>Видеомонтаж</button>
          <button className={style['menu-section_item']} type='button'>Актёрское мастерство</button>
          <button className={style['menu-section_item']} type='button'>Креативное письмо</button>
          <button className={style['menu-section_item']} type='button'>Арт-терапия</button>
          <button className={style['menu-section_item']} type='button'>Декор и DIY</button>

        </div>
      </div>
      <div className={style['menu-section']}>
        <img src={languageIcon} alt='Иностранные языки' />
        <div className={style['menu-section_items']}>
          <h3 className={style['menu-section_title']}>Иностранные языки</h3>
          <button className={style['menu-section_item']} type='button'>Английский</button>
          <button className={style['menu-section_item']} type='button'>Французский</button>
          <button className={style['menu-section_item']} type='button'>Испанский</button>
          <button className={style['menu-section_item']} type='button'>Немецкий</button>
          <button className={style['menu-section_item']} type='button'>Китайский</button>
          <button className={style['menu-section_item']} type='button'>Японский</button>
          <button className={style['menu-section_item']} type='button'>Подготовка к экзаменам (IELTS, TOEFL)</button>
        </div>
      </div>
      <div className={style['menu-section']}>
        <img src={educationIcon} alt='Образование и развитие' />
        <div className={style['menu-section_items']}>
          <h3 className={style['menu-section_title']}>Образование и развитие</h3>
          <button className={style['menu-section_item']} type='button'>Личностное развитие</button>
          <button className={style['menu-section_item']} type='button'>Навыки обучения</button>
          <button className={style['menu-section_item']} type='button'>Когнитивные техники</button>
          <button className={style['menu-section_item']} type='button'>Скорочтение</button>
          <button className={style['menu-section_item']} type='button'>Навыки преподавания</button>
          <button className={style['menu-section_item']} type='button'>Коучинг</button>
        </div>
      </div>
      <div className={style['menu-section']}>
        <img src={houseIcon} alt='Дом и уют' />
        <div className={style['menu-section_items']}>
          <h3 className={style['menu-section_title']}>Дом и уют</h3>
          <button className={style['menu-section_item']} type='button'>Уборка и организация</button>
          <button className={style['menu-section_item']} type='button'>Домашние финансы</button>
          <button className={style['menu-section_item']} type='button'>Приготовление еды</button>
          <button className={style['menu-section_item']} type='button'>Домашние растения</button>
          <button className={style['menu-section_item']} type='button'>Ремонт</button>
          <button className={style['menu-section_item']} type='button'>Хранение вещей</button>
        </div>
      </div>
      <div className={style['menu-section']}>
        <img src={lifestyleIcon} alt='Здоровье и лайфстайл' />
        <div className={style['menu-section_items']}>
          <h3 className={style['menu-section_title']}>Здоровье и лайфстайл</h3>
          <button className={style['menu-section_item']} type='button'>Йога и медитация</button>
          <button className={style['menu-section_item']} type='button'>Питание и ЗОЖ</button>
          <button className={style['menu-section_item']} type='button'>Ментальное здоровье</button>
          <button className={style['menu-section_item']} type='button'>Осознанность</button>
          <button className={style['menu-section_item']} type='button'>Физические тренировки</button>
          <button className={style['menu-section_item']} type='button'>Сон и восстановление</button>
          <button className={style['menu-section_item']} type='button'>Баланс жизни и работы</button>
        </div>
      </div>
    </div>
  );
};
