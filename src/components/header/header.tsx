import { Button } from '../../shared/ui/button'
import { IconButton } from '../../shared/ui/iconButton'
import { LogoUI } from '../../shared/ui/LogoUI'
import { SearchBar } from '../../shared/ui/searchBar'
import { Title } from '../../shared/ui/title/Title'
import styles from './index.module.scss'
import MoonIcon from '../../assets/icons/themeType/moon.svg?url'
import SunIcon from '../../assets/icons/themeType/sun.svg?url'
import { useState } from 'react'


export const Header: React.FC = () => {
    const [theme, setTheme] = useState(true)
    const themeToggle = () => {
        setTheme(!theme)
    }
    return (
        <header className={styles.header}>
        <div style={{display: 'flex', gap: '12px'}}>
        <LogoUI/>
        <Title>SkillSwap</Title>
        </div>
        <div style={{display: 'flex', gap: '24px'}}>
            <p>О проекте</p>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><p>Все навыки</p><svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 7.93539C7.35391 7.93539 6.70782 7.68618 6.21863 7.197L0.20075 1.17912C-0.0669166 0.91145 -0.0669166 0.468416 0.20075 0.20075C0.468416 -0.0669166 0.911451 -0.0669166 1.17912 0.20075L7.197 6.21863C7.64003 6.66167 8.35997 6.66167 8.803 6.21863L14.8209 0.20075C15.0885 -0.0669166 15.5316 -0.0669166 15.7992 0.20075C16.0669 0.468416 16.0669 0.91145 15.7992 1.17912L9.78137 7.197C9.29218 7.68618 8.64609 7.93539 8 7.93539Z" fill="#253017"/>
</svg>
</div>
        </div>
       <SearchBar className={styles.search} onSearch={() => {}} placeholder='Искать навык'/>

<IconButton onClick={themeToggle}><img src={theme ? MoonIcon : SunIcon} alt='theme'/></IconButton>

<div style={{display: 'flex', gap: '8px'}}>
    <Button className={styles.btn_log}>Войти</Button>
    <Button className={styles.btn_reg}>Зарегестрироваться</Button>
</div>
        </header>
    )
}