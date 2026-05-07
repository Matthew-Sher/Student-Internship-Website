import { Logo } from '../../ui/Logo/Logo';
import styles from './Header.module.css';

export const Header = () => {
    
    return (
        <header>
            <nav className={`${styles.navbar}`}>
                <Logo text={`CampusCareer`} />
                <div className={styles.navLinks}>
                    <button className={`${styles.navBtn} ${styles.active}`} id="mainPageBtn">Главная</button>
                    <button className={`${styles.navBtn} ${styles.accountBtn}`} id="accountPageBtn">Аккаунт</button>
                </div>
            </nav>
        </header>
    );
}