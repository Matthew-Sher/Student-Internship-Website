import { useEffect, useState } from 'react';
import { Button } from '../../shared/ui/Button/Button';
import styles from './StudentAcc.module.css';
import { confirmEdit, logout } from './api';
import { useNavigate } from 'react-router-dom';

export const StudentAcc = ({userData, reloadUser}) => {
    const currentYear = new Date().getFullYear();

    const [editInfoWindow, setEditInfoWindow] = useState(false);
    const [form, setForm] = useState({
        fullName: '',
        graduationYear: currentYear,
        resume: null,
        avatarUrl: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        let {name, value, type} = e.target;
        setForm({
            ...form,
            [name]: type === 'number'? (value === ''? currentYear : Number(value)) : value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await confirmEdit(form);
        await reloadUser();

        setEditInfoWindow(false);
    }

    const exit = async () => {
        let response = await logout();
        if (response.ok) {
            navigate("/");
        };
    }

    const login = () => {
        navigate("/login");
    }

    const profile = userData.studentProfileDTO ?? {};

    useEffect(() => {
        if (editInfoWindow) {
            setForm({
                fullName: profile.fullName || '',
                graduationYear: profile.graduationYear ?? currentYear,
                resume: profile.resume ?? null,
                avatarUrl: profile.avatarUrl ?? null,
            });
        }
    }, [editInfoWindow]);

    return (
        <div>
            <div className={`${styles.AccInformationContainer} glass-effect`}>
                <div className={`${styles.picture}`}></div>
                <span className={`${styles.infoLable}`}>Имя:</span>
                <h2 className={`${styles.userName}`}>
                    {profile.fullName || 'No Name'}
                </h2>
                <span className={`${styles.infoLable}`}>Email:</span>
                <span>
                    {userData.email || 'No email :/'}
                </span>
                <span className={`${styles.infoLable}`}>Год выпуска:</span>
                <span>
                    {profile.graduationYear || 'No graduation year o_o'}
                </span>
                <span className={`${styles.infoLable}`}>Резюме:</span>
                <span>
                    {profile.resume || 'No resue ._.'}
                </span>
                <Button
                    buttonText='Редактировать профиль'
                    variant={"default"}
                    onClick={() => {setEditInfoWindow(true)}} 
                />
                { userData.email? <></> :
                    <Button 
                        type="button"
                        buttonText='Войти'
                        variant={"primary"}
                        onClick={login}
                    />
                }
                <Button 
                    type="button"
                    variant={"danger"}
                    buttonText='Выйти'
                    onClick={exit}
                />
            </div>

            {editInfoWindow && (
                    <div className={`${styles.editWindowBack}`}>
                        <div className={`${styles.editWindow} glass-effect`}>
                            <div className={`${styles.rightTopCorner}`} >
                                <Button 
                                    buttonText='x' 
                                    variant={"default"}
                                    onClick={() => {setEditInfoWindow(false)}} 
                                />
                            </div>
                            <form onSubmit={handleSubmit} className={`${styles.editWindowContentForm}`}>
                                <label className={`${styles.infoLable}`}>Имя:</label>
                                <input 
                                    className={`input-box dark-radius-border`} 
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                />
                                <label className={`${styles.infoLable}`}>Год выпуска:</label>
                                <input
                                    className={`input-box dark-radius-border`} 
                                    type="number"
                                    name="graduationYear"
                                    value={form.graduationYear}
                                    onChange={handleChange}
                                />
                                <label className={`${styles.infoLable}`}>Резюме:</label>
                                {/* <input
                                    className={`input-box dark-radius-border`} 
                                    type="text"
                                    name="resume"
                                    value={form.resume}
                                    onChange={handleChange}
                                /> */}
                                <Button 
                                    buttonText='Подтвердить' 
                                    variant={"default"}
                                    type='submit'
                                />
                            </form>
                        </div>
                    </div>
            )}
        </div>
    );
}