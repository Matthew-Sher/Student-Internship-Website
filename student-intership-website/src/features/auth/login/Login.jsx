import { useState } from "react";
import styles from './Login.module.css';
import { AuthButton } from "../../../shared/ui/AuthButton/AuthButton";
import { loginUser } from "./api";
import { Link, useNavigate } from 'react-router-dom'; 

export const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    }); 
    let navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await loginUser(form);
        if (response.ok) {
            navigate('/');
        }
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

                <Link className={`${styles.link}`} to='/register'>Заргистрироваться</Link>
            </form>
        </div>
    );
};