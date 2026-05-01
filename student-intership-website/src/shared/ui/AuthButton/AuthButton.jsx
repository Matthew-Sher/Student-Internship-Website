import React from 'react';
import styles from './AuthButton.module.css';

export const AuthButton = ({text}) => {
    return (
        <button className={ `dark-radius-border ${styles.AuthButton}` }>
            { text }
        </button>
    );
}