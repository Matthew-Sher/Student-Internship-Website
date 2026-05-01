import { AuthButton } from '../../../shared/ui/AuthButton/AuthButton';
import styles from './Registration.module.css';
import { registerUser } from './api';
import { useState } from 'react';

export const Registration = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'ROLE_STUDENT',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
  };

  return (
    <div className={`hidden-overflow ${styles.loginFormContainer}`}>
      <form onSubmit={handleSubmit} className={`glass-effect ${styles.form}`}>
        <div className={styles.leftAlignmentContainer}>
          <label>Email</label>
          <input
            className={`input-box dark-radius-border`}
            type="email"
            name="email"
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

        <div className={`${styles.leftAlignmentContainer} ${styles.radioButtonsContainer}`}>
          <p>Укажите кем вы являетесь:</p>

          <label>
            <input
              type="radio"
              name="role"
              value="ROLE_STUDENT"
              checked={form.role === 'ROLE_STUDENT'}
              onChange={handleChange}
            />
            Студент
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="ROLE_EMPLOYER"
              checked={form.role === 'ROLE_EMPLOYER'}
              onChange={handleChange}
            />
            Работодатель
          </label>
        </div>

        <AuthButton text='Зарегистрироваться'/>
      </form>
    </div>
  );
};