import { LogoUI } from '../../shared/ui/LogoUI'
import styles from './index.module.scss'
import SkillSwap from '../../assets/icons/skillsTypes/SkillSwap.svg'
import Cross from '../../assets/icons/cross/cross.svg'
import { Button } from '../../shared/ui/button'
import { useNavigate } from 'react-router-dom'
import {  InputName } from '../../shared/ui/input/Input'
import BoardIcon from '../../assets/icons/BoardIcon/school-board.svg'
import SkillsSelector from '../../shared/ui/SkillsSelector/SkillsSelector'
import { FilePicker } from '../../shared/ui/FilePicker/FilePicker'

export const Step3: React.FC = () => {
    const navigation = useNavigate()
    const onClose = () => {
        navigation(-1)
    }
    const nextStep = () => {
      navigation(`/step4`)
  }
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
            <p>Шаг 3 из 3</p>
            <div style={{display: 'flex', gap: '16px'}}>
            <div className={styles.step}/>
            <div className={styles.step1}/>
            <div className={styles.step1}/>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.registration__container}>
           
            <div className={styles.inputs}>
            <InputName className={styles.input__name} label='Название навыка' placeholder='Введите название вашего навыка'/>
            
           <SkillsSelector span1='Категория навыка' span2='Подкатегория навыка'/>

          <div style={{marginTop: 20}}>
            <span className={styles.label}>Описание</span>
            <textarea className={styles.input__textarea} placeholder='Коротко опишите, чему можете научить'></textarea>
          </div>
         <div style={{marginTop: 20}}>
         <FilePicker/>
         </div>
          <div style={{marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '20px'}}>
            <Button onClick={onClose} className={styles.button}>Назад</Button>
            <Button onClick={nextStep} className={styles.button}>Продолжить</Button>
          </div>
            </div>
        
            </div>

            <div className={styles.welcome}>
            <BoardIcon/>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <h2>Укажите, чем вы готовы поделиться</h2>
                    <p>Так другие люди смогут увидеть ваши предложения<br/> и предложить вам обмен!</p>
                </div>
            </div>

        </div>
    </div>
    )
}