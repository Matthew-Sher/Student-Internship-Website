import styles from './Button.module.css';

export const Button = ({buttonText, type, variant, onClick}) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}