import { Button } from '../../shared/ui/button/button';
import {
  Input,
  InputDate,
  InputEmail,
  InputName,
} from '../../shared/ui/input/Input';
import styles from './profileSection.module.scss';
import editPhoto from '../../shared/assets/icons/gallery-edit.svg?url';
import edit from '../../shared/assets/icons/edit.svg?url';
import React from 'react';
import type { UserProfile } from './type';
import { useDispatch } from '../../services/store';
import { updateUser } from '../../services/authSlice/authSlice';

export const ProfileSection: React.FC<UserProfile> = (
  userData: UserProfile,
) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = (values: Record<string, any>) => {
    // console.log('Submitted values:', values);
    dispatch(updateUser(values));
  };

  const [selectedTab, setSelectedTab] = React.useState<
    'applications' | 'myTrades' | 'favorites' | 'mySkills' | 'personalData'
  >('personalData');

  //TODO ожидаю фикс компонента input :(

  return (
    <div className={styles['profile-Section']}>
      <div className={styles.sidebar}>
        <Button
          className={`${styles.button} ${selectedTab === 'applications' ? styles.button_active : ''}`}
          onClick={() => setSelectedTab('applications')}
        >
          Заявки
        </Button>
        <Button
          className={`${styles.button} ${selectedTab === 'myTrades' ? styles.button_active : ''}`}
          onClick={() => setSelectedTab('myTrades')}
        >
          Мои обмены
        </Button>
        <Button
          className={`${styles.button} ${selectedTab === 'favorites' ? styles.button_active : ''}`}
          onClick={() => setSelectedTab('favorites')}
        >
          Избранное
        </Button>
        <Button
          className={`${styles.button} ${selectedTab === 'mySkills' ? styles.button_active : ''}`}
          onClick={() => setSelectedTab('mySkills')}
        >
          Мои навыки
        </Button>
        <Button
          className={`${styles.button} ${selectedTab === 'personalData' ? styles.button_active : ''}`}
          onClick={() => setSelectedTab('personalData')}
        >
          Личные данные
        </Button>
      </div>
      <div className={styles.content}>
        <form
          id="profileForm"
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as typeof e.currentTarget & {
              elements: {
                email: HTMLInputElement;
                name: HTMLInputElement;
                birthday: HTMLInputElement;
                gender: HTMLInputElement;
                location: HTMLInputElement;
                about: HTMLInputElement;
              };
            };
            submit({
              email: form.elements.email.value,
              name: form.elements.name.value,
              birthday: form.elements.birthday.value,
              gender: form.elements.gender.value,
              location: form.elements.location.value,
              about: form.elements.about.value,
            });
          }}
        >
          <div className={styles.credentials}>
            <InputEmail
              id="email"
              placeholder="email"
              label="Почта"
              defaultValue={userData.email}
              icon={<img src={edit} />}
            />
            <a className={styles['change-Password']} href="#">
              Изменить пароль
            </a>
          </div>
          <InputName
            id="name"
            placeholder="Имя"
            label="Имя"
            defaultValue={userData.name}
            icon={<img src={edit} />}
          />
          <div className={styles['input-Group']}>
            <InputDate
              id="birthday"
              placeholder="Дата рождения"
              label="Дата рождения"
              type="date"
              defaultValue={
                userData.birthday instanceof Date
                  ? userData.birthday.toISOString().split('T')[0]
                  : ''
              }
              icon={<img src={edit} />}
            />
            <Input
              id="gender"
              placeholder="Пол"
              label="Пол"
              type="text"
              defaultValue={userData.gender}
              icon={<img src={edit} />}
            />
          </div>
          <Input
            id="location"
            placeholder="Город"
            label="Город"
            type="text"
            defaultValue={userData.location}
            icon={<img src={edit} />}
          />
          <Input
            id="about"
            placeholder="О себе"
            label="О себе"
            type="textarea"
            defaultValue={userData.description}
            icon={<img src={edit} />}
          />
          <Button
            type="submit"
            form="profileForm"
            className={styles['save-Button']}
          >
            Сохранить
          </Button>
        </form>
        <button className={styles['avatar-Button']}>
          <img
            src={userData.avatarUrl}
            alt="Аватар"
            className={styles.avatar}
          />
          <img
            src={editPhoto}
            alt="Редактировать фото"
            className={styles['edit-Photo']}
          />
        </button>
      </div>
    </div>
  );
};
