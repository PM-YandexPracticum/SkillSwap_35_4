import { useState, useRef, useEffect, use } from 'react';
import style from './registrationPage.module.scss';
import { LogoUI } from '../../shared/ui/logoUI/logoUI';
import { Button } from '../../shared/ui/button/button';
import {
  Input,
  InputEmail,
  InputPassword,
  InputName,
  Textarea,
} from '../../shared/ui/input';
import { IconButton } from '../../shared/ui/iconButton/iconButton';
import { BDayInput } from '../../features/calendar/Calendar';
import { DragDropArea } from '../../shared/ui/dragAndDrop/DragDropArea';
import { ModalUI } from '../../shared/ui/modalUI/modalUI';
import { Title } from '../../shared/ui/title/title';
import closeIcon from '../../shared/assets/icons/cross.svg?url';
import eyeIcon from '../../shared/assets/icons/eye.svg?url';
import eyeOffIcon from '../../shared/assets/icons/eye-slash.svg?url';
import mockData from '../../api/mok.json';
import appleIcon from '../../shared/assets/icons/apple.svg?url';
import googleIcon from '../../shared/assets/icons/google.svg?url';
import bulbIcon from '../../shared/assets/icons/lightBulb.svg?url';
import userIcon from '../../shared/assets/icons/userInfo.svg?url';
import boardIcon from '../../shared/assets/icons/school-board.svg?url';
import profileIcon from '../../shared/assets/icons/profileAdd.svg?url';
import xIcon from '../../shared/assets/icons/cross.svg?url';
import { type RegisterUserData } from '../../api/types';
import { Select } from '../../shared/ui/select/select';
import {
  skillsConfig,
  SKILL_TYPES,
  type SkillType,
} from '../../shared/constants/skills/skills.config';
import type { RegistrationFormState, Step } from './types';

// redux
import { useAppDispatch, useSelector } from '../../services/store';
import { registerUser, clearError } from '../../services/authSlice/authSlice';

// validation
import { createValidator } from '../../shared/utils/validation/createValidator';
import {
  required,
  minLength,
  maxLength,
  email as isEmail,
} from '../../shared/utils/validation/rule';
import type { Errors, Schema } from '../../shared/utils/validation/type';
import { useLocation, useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isLoggedIn } = useSelector((s) => s.auth);

  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<RegistrationFormState>({
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
    skillCanTeach: [],
    subcategoriesWantToLearn: [],
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (field: keyof RegistrationFormState, value: any) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const stepSchemas: Record<Step, Schema> = {
    1: {
      email: [required(), isEmail()],
      password: [required(), minLength(6)],
    },
    2: {
      name: [required(), minLength(2)],
      birthDate: required(),
      gender: required(),
      city: required(),
      learnCategory: required(),
      learnSubCategory: required(),
    },
    3: {
      skillTitle: [required(), minLength(2), maxLength(50)],
      skillCategory: required(),
      skillSubCategory: required(),
      skillDescription: [required(), minLength(10)],
    },
  };

  const validateStep = (s: Step) => {
    const validator = createValidator(stepSchemas[s]);
    const errs = validator(formData);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  };
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  const finish = () => {
    if (validateStep(3)) {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn && !isLoading && modalOpen) {
      setModalOpen(false);
      navigate('/success', {
        state: {
          backgroundLocation: location,
        },
      });
    }
  }, [isLoggedIn, isLoading, modalOpen, navigate, location]);

  const handleConfirm = () => {
    const payload: RegisterUserData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      gender: formData.gender,
      birthDate: formData.birthDate,
      location: formData.city,
      skillImages: formData.skillImages,
      skillCanTeach: formData.skillCanTeach,
      subcategoriesWantToLearn: formData.subcategoriesWantToLearn,
    };
    dispatch(registerUser(payload));
  };

  const cityOptions = mockData.filters.cities.map((c) => ({
    label: c.name,
    value: c.name,
  }));

  const categoryOptions = SKILL_TYPES.map((t) => ({
    label: t,
    value: t,
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
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
        {/* левая колонка: форма */}
        <div className={style.formBlock}>
          {step === 1 && (
            <>
              <Button variant="secondary" size="md">
                <img src={appleIcon} alt="apple" className={style.socialIcon} />
                Продолжить с Apple
              </Button>
              <Button variant="secondary" size="md">
                <img
                  src={googleIcon}
                  alt="google"
                  className={style.socialIcon}
                />
                Продолжить с Google
              </Button>
              <div className={style.divider}>
                <span>или</span>
              </div>

              <div className={style.emailWrapper}>
                <InputEmail
                  placeholder="Введите Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={errors.email}
                />
              </div>

              <div className={style.passwordWrapper}>
                <InputPassword
                  placeholder="Придумайте надёжный пароль"
                  value={formData.password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => handleChange('password', e.target.value)}
                  error={errors.password}
                />
                <IconButton
                  className={style.passwordBtn}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <img src={showPassword ? eyeOffIcon : eyeIcon} alt="toggle" />
                </IconButton>
              </div>

              <div className={style.continueBtn}>
                <Button variant="primary" onClick={next}>
                  Далее
                </Button>
              </div>
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
                    accept="image/*"
                    ref={avatarInputRef}
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
                  error={errors.name}
                />
              </div>

              <div className={style.bdayGenderWrapper}>
                <div className={style.bdayWrapper}>
                  Дата рождения
                  <BDayInput
                    value={formData.birthDate}
                    onDateSelect={(date) => handleChange('birthDate', date)}
                    error={errors.birthDate}
                  />
                </div>
                <div className={style.genderWrapper}>
                  Пол
                  <Select
                    placeholder={'Не указан'}
                    options={[
                      { label: 'Не указан', value: 'other' },
                      { label: 'Мужской', value: 'male' },
                      { label: 'Женский', value: 'female' },
                    ]}
                    value={formData.gender}
                    onChange={(v) => handleChange('gender', v)}
                    error={errors.gender}
                  />
                </div>
              </div>

              <div className={style.cityWrapper}>
                Город
                <Select
                  placeholder={'Не указан'}
                  options={cityOptions}
                  value={formData.city}
                  onChange={(v) => handleChange('city', v)}
                  error={errors.city}
                />
              </div>

              <div className={style.categoryWrapper}>
                Категория навыка, которому хотите научиться
                <Select
                  placeholder={'Выберите категорию'}
                  options={categoryOptions}
                  value={formData.learnCategory}
                  onChange={(v) => {
                    handleChange('learnCategory', v);
                    handleChange('learnSubCategory', '');
                  }}
                  error={errors.learnCategory}
                />
              </div>

              <div className={style.subcategoryWrapper}>
                Подкатегория навыка, которому хотите научиться
                <Select
                  placeholder={'Выберите подкатегорию'}
                  options={filteredSubCategoryOptions}
                  value={formData.learnSubCategory}
                  onChange={(v) => handleChange('learnSubCategory', v)}
                  error={errors.learnSubCategory}
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
                  error={errors.skillTitle}
                />
              </div>

              <div className={style.categoryWrapper}>
                Категория навыка
                <Select
                  placeholder={'Выберите категорию навыка'}
                  options={categoryOptions}
                  value={formData.skillCategory}
                  onChange={(v) => {
                    handleChange('skillCategory', v);
                    handleChange('skillSubCategory', '');
                  }}
                  error={errors.skillCategory}
                />
              </div>

              <div className={style.subcategoryWrapper}>
                Подкатегория навыка
                <Select
                  placeholder={'Выберите подкатегорию навыка'}
                  options={filteredSkillSubCategoryOptions}
                  value={formData.skillSubCategory}
                  onChange={(v) => handleChange('skillSubCategory', v)}
                  error={errors.skillSubCategory}
                  disabled={!formData.skillCategory}
                />
              </div>

              <div className={style.desriptionWrapper}>
                Описание
                <Textarea
                  placeholder="Коротко опишите, чему можете научить"
                  value={formData.skillDescription}
                  onChange={(e) =>
                    handleChange('skillDescription', e.target.value)
                  }
                  error={errors.skillDescription}
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

        {/* правая колонка: инфо */}
        <div className={style.infoBlock}>
          {step === 1 && (
            <div className={style.infoWrapper}>
              <img src={bulbIcon} alt="idea" className={style.infoIcon} />
              <div className={style.textWrapper}>
                <Title as="h2">Добро пожаловать в SkillSwap!</Title>
                <p>
                  Присоединяйтесь и обменивайтесь знаниями и навыками с другими
                  людьми
                </p>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className={style.infoWrapper}>
              <img src={userIcon} alt="user" className={style.infoIcon} />
              <div className={style.textWrapper}>
                <Title as="h2">Расскажите немного о себе</Title>
                <p>
                  Это поможет другим людям лучше вас узнать, чтобы выбрать для
                  обмена
                </p>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className={style.infoWrapper}>
              <img src={boardIcon} alt="board" className={style.infoIcon} />
              <div className={style.textWrapper}>
                <Title as="h2">Укажите, чем вы готовы поделиться</Title>
                <p>
                  Так другие люди смогут увидеть ваши предложения и предложить
                  обмен
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* модалка */}
      <ModalUI openModal={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={style.modalContent}>
          <Title as="h3">Ваше предложение</Title>
          <p>Пожалуйста, проверьте и подтвердите правильность данных</p>
          <div className={style.preview}>
            <h4>{formData.skillTitle}</h4>
            <p>
              {formData.skillCategory} / {formData.skillSubCategory}
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
          <div className={style.errorWrapper}>
            {error && (
              <p className={style.error}>
                {error}{' '}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => dispatch(clearError())}
                  className={style.errorBtn}
                  style={{ border: 'none' }}
                >
                  <img src={xIcon} alt="close icon" />
                </Button>
              </p>
            )}
          </div>

          <div className={style.actions}>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Редактировать
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Отправка...' : 'Подтвердить'}
            </Button>
          </div>
        </div>
      </ModalUI>
    </div>
  );
};
