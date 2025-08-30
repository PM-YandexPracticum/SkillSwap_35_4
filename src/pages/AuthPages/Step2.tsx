import { LogoUI } from '../../shared/ui/LogoUI'
import styles from './index.module.scss'
import SkillSwap from '../../assets/icons/skillsTypes/SkillSwap.svg'
import Cross from '../../assets/icons/cross/cross.svg'
import { Button } from '../../shared/ui/button'
import { useNavigate } from 'react-router-dom'
import IconUser from '../../assets/icons/addPhoto/icon-user.svg'
import { InputName, InputSearch } from '../../shared/ui/input/Input'
import SelectPicker from '../../shared/ui/SelectPicker/SelectPicker'
import DatePicker from '../../shared/ui/InputDatePicker/DatePicker'
import { useEffect, useState } from 'react'
import UserIcon from '../../assets/icons/userIcon/user.svg'
import SkillsSelector from '../../shared/ui/SkillsSelector/SkillsSelector'

const cityList = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск', 'Омск', 'Самара', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Пермь', 'Воронеж']
export const Step2: React.FC = () => {
    const navigation = useNavigate()
    const onClose = () => {
        navigation(-1)
    }
    const nextStep = () => {
      navigation(`/step3`)
  }
  const [cityValue, setCityValue] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    if (!cityValue.trim()) {
      setFilteredCities([]);
      setShowCities(false);
      return;
    }

    const filtered = cityList.filter(city =>
      city.toLowerCase().startsWith(cityValue.toLowerCase())
    );

    setFilteredCities(filtered);
    setShowCities(filtered.length > 0);
  }, [cityValue]);


  const handleSelectCity = (city: string) => {
    setCityValue(city);
    setShowCities(false);
  };
    return (
        <div className={styles.wrapper}>
        <div className={styles.head}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <LogoUI/>
            <SkillSwap/>
            </div>
            <Button onClick={onClose} className={styles.btn__close}>Закрыть<Cross/></Button>
        </div>
        <div className={styles.steps}>
            <p>Шаг 2 из 3</p>
            <div style={{display: 'flex', gap: '16px'}}>
            <div className={styles.step}/>
            <div className={styles.step1}/>
            <div className={styles.step}/>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.registration__container}>
            <div style={{cursor: 'pointer'}} onClick={() => {}}><IconUser/></div>


            <div className={styles.inputs}>
            <InputName className={styles.input__name} label='Имя' placeholder='Введите ваше имя'/>
            <div style={{display: 'flex', gap: '24px'}}>
            <div>
            <span className={styles.label}>Дата рождения</span>
            <DatePicker />
            </div>
            <div>
            <span className={styles.label}>Пол</span> 
            <SelectPicker value='' options={['Не указан', 'Мужской', 'Женский']}/>
            </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', width: '100%'}}>
        <InputSearch value={cityValue}
        onChange={e => setCityValue(e.target.value)} className={styles.input} label='Город' placeholder='Не указан'/>
            {showCities && (
                <div className={styles.container__city}>
          {filteredCities.map(city => (
            <p
             
              key={city}
              onClick={() => handleSelectCity(city)}
              className={styles.cities}
              onMouseDown={e => e.preventDefault()} // Чтобы не потерять фокус при клике
            >
              {city}
            </p>
          ))}
          </div>
      )}</div>
     <SkillsSelector span1='Категория навыка, которому хотите научиться' span2='Подкатегория навыка, которому хотите научиться'/>
          <div style={{marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '20px'}}>
            <Button onClick={onClose} className={styles.button}>Назад</Button>
            <Button onClick={nextStep} className={styles.button}>Продолжить</Button>
          </div>
            </div>
        
            </div>

            <div className={styles.welcome}>
            <UserIcon/>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <h2>Расскажите немного о себе</h2>
                    <p>Это поможет другим людям лучше вас узнать,<br/> чтобы выбрать для обмена</p>
                </div>
            </div>

        </div>
    </div>
    )
}