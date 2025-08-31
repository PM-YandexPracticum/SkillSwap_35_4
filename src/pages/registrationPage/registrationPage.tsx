import { useState, useRef } from 'react';
import style from './registrationPage.module.scss';
import { LogoUI } from '../../shared/ui/logoUI/logoUI';
import { Button } from '../../shared/ui/button/button';
import {
  Input,
  InputEmail,
  InputPassword,
  InputName,
} from '../../shared/ui/input/Input';
import { IconButton } from '../../shared/ui/iconButton/iconButton';
import { BDayInput } from '../../features/calendar/Calendar';
import { DragDropArea } from '../../shared/ui/dragAndDrop/DragDropArea';
import { ModalUI } from '../../shared/ui/modalUI/modalUI';
import { Title } from '../../shared/ui/title/title';
import closeIcon from '../../shared/assets/icons/cross.svg?url';
import eyeIcon from '../../shared/assets/icons/eye.svg?url';
import eyeOffIcon from '../../shared/assets/icons/eye-slash.svg?url';
import mockData from '../../api/mok.json';
import type { RegistrationData, Step } from './types';
import appleIcon from '../../shared/assets/icons/apple.svg?url';
import googleIcon from '../../shared/assets/icons/google.svg?url';
import bulbIcon from '../../shared/assets/icons/lightBulb.svg?url';
import userIcon from '../../shared/assets/icons/userInfo.svg?url';
import boardIcon from '../../shared/assets/icons/school-board.svg?url';
import profileIcon from '../../shared/assets/icons/profileAdd.svg?url';

import { Select } from '../../shared/ui/select/select';
import {
  skillsConfig,
  SKILL_TYPES,
  type SkillType,
} from '../../shared/constants/skills/skills.config';

export const RegistrationPage = () => {
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<RegistrationData>({
    email: '',
    password: '',
    name: '',
    birthDate: null,
    gender: '',
    city: '',
    learnCategory: '',
    learnSubCategory: '',
    skillTitle: '',
    skillCategory: '',
    skillSubCategory: '',
    skillDescription: '',
    skillImages: [],
  });

  const handleChange = (field: keyof RegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  const finish = () => setModalOpen(true);

  const cityOptions = mockData.filters.cities.map((city) => ({
    label: city.name,
    value: city.name,
  }));

  const categoryOptions = SKILL_TYPES.map((cat) => ({
    label: cat,
    value: cat,
  }));

  const filteredSubCategoryOptions =
    formData.learnCategory && skillsConfig[formData.learnCategory as SkillType]
      ? skillsConfig[formData.learnCategory as SkillType].items.map((sub) => ({
          label: sub,
          value: sub,
        }))
      : [];

  const filteredSkillSubCategoryOptions =
    formData.skillCategory && skillsConfig[formData.skillCategory as SkillType]
      ? skillsConfig[formData.skillCategory as SkillType].items.map((sub) => ({
          label: sub,
          value: sub,
        }))
      : [];

  const skillCategoryLabel = formData.skillCategory;
  const skillSubCategoryLabel = formData.skillSubCategory;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <div className={style.logoBlock}>
          <LogoUI variant="icon" size={40} />
          <LogoUI variant="title" size={24} className={style.logoTitle} />
        </div>
        <Button
          variant="secondary"
          size="md"
          className={style.closeBtn}
          onClick={() => (window.location.href = '/')}
        >
          Закрыть
          <img src={closeIcon} alt="Закрыть" />
        </Button>
      </header>

      <main className={style.content}>
        <div className={style.formBlock}>
          {step === 1 && (
            <>
              <Button variant="secondary" size="md">
                <img
                  src={appleIcon}
                  alt="apple icon"
                  className={style.socialIcon}
                />
                Продолжить с Apple
              </Button>
              <Button variant="secondary" size="md">
                <img
                  src={googleIcon}
                  alt="google icon"
                  className={style.socialIcon}
                />
                Продолжить с Google
              </Button>
              <div className={style.divider}>
                <span>или</span>
              </div>
              <div className={style.emailWrapper}>
                Email
                <InputEmail
                  placeholder="Введите Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
              <div className={style.passwordWrapper}>
                Пароль
                <InputPassword
                  placeholder="Придумайте надёжный пароль"
                  value={formData.password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={style.passwordInput}
                />
                <IconButton
                  className={style.passwordBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? eyeOffIcon : eyeIcon}
                    alt="toggle password"
                  />
                </IconButton>
              </div>

              <Button
                variant="primary"
                onClick={next}
                className={style.continueBtn}
              >
                Далее
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className={style.avatarBlock}>
                <div
                  className={style.avatarCircle}
                  onClick={() => avatarInputRef.current?.click()}
                  tabIndex={0}
                  role="button"
                >
                  <img
                    src={avatarUrl || profileIcon}
                    alt="avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                  <input
                    type="file"
                    ref={avatarInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
              <div className={style.nameWrapper}>
                Имя
                <InputName
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div className={style.bdayGenderWrapper}>
                <div className={style.bdayWrapper}>
                  Дата рождения
                  <BDayInput
                    onDateSelect={(date) => handleChange('birthDate', date)}
                  />
                </div>
                <div className={style.genderWrapper}>
                  Пол
                  <Select
                    options={[
                      { label: 'Не указан', value: 'other' },
                      { label: 'Мужской', value: 'male' },
                      { label: 'Женский', value: 'female' },
                    ]}
                    value={formData.gender}
                    onChange={(val) => handleChange('gender', val)}
                    placeholder="Выберите пол"
                  />
                </div>
              </div>
              <div className={style.cityWrapper}>
                Город
                <Select
                  options={cityOptions}
                  value={formData.city}
                  onChange={(val) => handleChange('city', val)}
                  placeholder="Не указан"
                />
              </div>
              <div className={style.categoryWrapper}>
                Категория навыка, которому хотите научиться
                <Select
                  options={categoryOptions}
                  value={formData.learnCategory}
                  onChange={(val) => {
                    handleChange('learnCategory', val);
                    handleChange('learnSubCategory', '');
                  }}
                  placeholder="Выберите категорию"
                />
              </div>
              <div className={style.subcategoryWrapper}>
                Подкатегория навыка, которому хотите научиться
                <Select
                  options={filteredSubCategoryOptions}
                  value={formData.learnSubCategory}
                  onChange={(val) => handleChange('learnSubCategory', val)}
                  placeholder={
                    filteredSubCategoryOptions.length
                      ? 'Выберите подкатегорию'
                      : 'Сначала выберите категорию'
                  }
                  disabled={!formData.learnCategory}
                />
              </div>
              <div className={style.actions}>
                <Button variant="secondary" onClick={back}>
                  Назад
                </Button>
                <Button variant="primary" onClick={next}>
                  Продолжить
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className={style.skillNameWrapper}>
                Название навыка
                <Input
                  placeholder="Введите название вашего навыка"
                  value={formData.skillTitle}
                  onChange={(e) => handleChange('skillTitle', e.target.value)}
                />
              </div>
              <div className={style.categoryWrapper}>
                Категория навыка
                <Select
                  options={categoryOptions}
                  value={formData.skillCategory}
                  onChange={(val) => {
                    handleChange('skillCategory', val);
                    handleChange('skillSubCategory', '');
                  }}
                  placeholder="Выберите категорию"
                />
              </div>
              <div className={style.subcategoryWrapper}>
                Подкатегория навыка
                <Select
                  options={filteredSkillSubCategoryOptions}
                  value={formData.skillSubCategory}
                  onChange={(val) => handleChange('skillSubCategory', val)}
                  placeholder={
                    filteredSkillSubCategoryOptions.length
                      ? 'Выберите подкатегорию'
                      : 'Сначала выберите категорию'
                  }
                  disabled={!formData.skillCategory}
                />
              </div>
              <div className={style.desriptionWrapper}>
                Описание
                <Input
                  placeholder="Коротко опишите, чему можете научить"
                  value={formData.skillDescription}
                  onChange={(e) =>
                    handleChange('skillDescription', e.target.value)
                  }
                />
              </div>
              <DragDropArea
                onFilesSelect={(files) => handleChange('skillImages', files)}
              />
              <div className={style.actions}>
                <Button variant="secondary" onClick={back}>
                  Назад
                </Button>
                <Button variant="primary" onClick={finish}>
                  Продолжить
                </Button>
              </div>
            </>
          )}
        </div>

        <div className={style.infoBlock}>
          {step === 1 && (
            <>
              <div className={style.infoWrapper}>
                <img
                  src={bulbIcon}
                  alt="idea icon"
                  className={style.infoIcon}
                />
                <div className={style.textWrapper}>
                  <Title as="h2">Добро пожаловать в SkillSwap!</Title>
                  <p>
                    Присоединяйтесь и обменивайтесь знаниями и навыками с
                    другими людьми
                  </p>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className={style.infoWrapper}>
                <img
                  src={userIcon}
                  alt="user icon"
                  className={style.infoIcon}
                />
                <div className={style.textWrapper}>
                  <Title as="h2">Расскажите немного о себе</Title>
                  <p>
                    Это поможет другим людям лучше вас узнать, чтобы выбрать для
                    обмена
                  </p>
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className={style.infoWrapper}>
                <img
                  src={boardIcon}
                  alt="board icon"
                  className={style.infoIcon}
                />
                <div className={style.textWrapper}>
                  <Title as="h2">Укажите, чем вы готовы поделиться</Title>
                  <p>
                    Так другие люди смогут увидеть ваши предложения и предложить
                    обмен
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      {/* TODO над доделать */}
      <ModalUI openModal={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={style.modalContent}>
          <Title as="h3">Ваше предложение</Title>
          <p>Пожалуйста, проверьте и подтвердите правильность данных</p>
          <div className={style.preview}>
            <h4>{formData.skillTitle}</h4>
            <p>
              {skillCategoryLabel || formData.skillCategory} /{' '}
              {skillSubCategoryLabel || formData.skillSubCategory}
            </p>
            <p>{formData.skillDescription}</p>
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="avatar preview"
                className={style.avatarPreview}
              />
            )}
          </div>
          <div className={style.actions}>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Редактировать
            </Button>
            <Button variant="primary" onClick={() => alert('Готово!')}>
              Готово
            </Button>
          </div>
        </div>
      </ModalUI>
    </div>
  );
};
