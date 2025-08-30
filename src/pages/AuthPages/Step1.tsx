import { LogoUI } from "../../shared/ui/LogoUI"
import SkillSwap from '../../assets/icons/skillsTypes/SkillSwap.svg'
import Cross from '../../assets/icons/cross/cross.svg'
import { Button } from "../../shared/ui/button"
import styles from './index.module.scss'
import { useNavigate } from "react-router-dom"
import Google from '../../assets/icons/company/Google.svg'
import Apple from '../../assets/icons/company/Apple.svg'
import { InputEmail, InputPassword } from "../../shared/ui/input/Input"
import Light from '../../assets/icons/notification/light-bulb.svg'
import { useState } from "react"

export const Step1: React.FC = () => {
    const navigation = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [err, setErr] = useState(false)
    const onClose = () => {
        navigation(-1)
    }

    const nextStep = () => {
        navigation(`/step2`)
    }

    const validateEmail = () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
      }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateEmail() || pass.length <= 8) {
            setErr(true);
          } else {
            setErr(false);
            nextStep()
          }
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
                <p>Шаг 1 из 3</p>
                <div style={{display: 'flex', gap: '16px'}}>
                <div className={styles.step}/>
                <div className={styles.step}/>
                <div className={styles.step}/>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.registration__container}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <div className={styles.company}><Google/>Продолжить с Google</div>
                    <div className={styles.company}><Apple/>Продолжить с Apple</div>
                </div>
                <div className={styles.or}>
                    <div className={styles.line}/>
                    <p>или</p>
                    <div className={styles.line}/>
                </div>
                <form className={styles.inputs} noValidate onSubmit={handleSubmit}>
                    <InputEmail error={err} errorMessage="Введите корректный email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="Введите email" label="Email"/>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0px'}}>
                    <InputPassword error={err} errorMessage="Пароль должен быть длиннее" value={pass} onChange={(e) => setPass(e.target.value)} className={styles.input} placeholder="Придумайте надёжный пароль" label="Пароль"/>
                    <p>{err ? '' : 'Пароль должен содержать не менее 8 знаков'}</p>
                    </div>
                    <Button type="submit" className={styles.btn__next}>Далее</Button>
                </form>
                </div>

                <div className={styles.welcome}>
                <Light/>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <h2>Добро пожаловать в SkillSwap!</h2>
                    <p>Присоединяйтесь к SkillSwap и обменивайтесь <br/> знаниями и навыками с другими людьми</p>
                </div>
                </div>


            </div>
        </div>
    )
}