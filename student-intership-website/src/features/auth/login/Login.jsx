import { useState } from "react";
import styles from './Login.module.css';
import { AuthButton } from "../../../shared/ui/AuthButton/AuthButton";
import { loginUser } from "./api";

export const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    }); 

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(form);
    }

    return (
        <div className={styles.loginFormContainer}>
            <form onSubmit={handleSubmit} className={`${styles.form} glass-effect`}>
                <div className={styles.leftAlignmentContainer}>
                    <label>Email</label>
                    <input
                     className={`input-box dark-radius-border`} 
                     type="email"
                     name="email"
                     autoComplete="on"
                     value={form.email}
                     onChange={handleChange}
                    />
                    <label>Password</label>
                    <input
                     className={`input-box dark-radius-border`}
                     type="password"
                     name="password" 
                     value={form.password}
                     onChange={handleChange}
                    />
                </div>
                
                <AuthButton text={`Войти`} />
            </form>
        </div>
    );
};