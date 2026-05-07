import styles from './Logo.module.css';

export const Logo = ({text}) => {
    return (
        <div className={ styles.logoArea }> 
            {text}
        </div>
    );
}