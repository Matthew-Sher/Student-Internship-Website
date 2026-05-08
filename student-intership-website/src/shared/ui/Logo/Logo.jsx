import styles from './Logo.module.css';

export const Logo = ({text}) => {
    return (
        <h1 className={ styles.logoArea }> 
            {text}
        </h1>
    );
}