import { useEffect, useState } from 'react';
import { Button } from '../../shared/ui/Button/Button';
import styles from './EmployerAcc.module.css';
import { confirmEdit, logout } from './api';
import { httpClient } from '../../shared/api/httpClien';
import { ENDPOINTS } from '../../shared/api/endpoints';
import { tokenService } from '../../shared/api/tokenService';
import { useNavigate } from 'react-router-dom';

export const EmployerAcc = ({userData, reloadUser}) => {
    const [editInfoWindow, setEditInfoWindow] = useState(false);
    const [form, setForm] = useState({
        companyName: '',
        description: '',
        websiteLink: '',
        logo: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
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

    const profile = userData.employerProfileDTO ?? {};

    useEffect(() => {
        if (editInfoWindow) {
            setForm({
                companyName: profile.companyName || '',
                description: profile.description || '',
                websiteLink: profile.websiteLink || '',
                logo: profile.logo ?? null,
            });
        }
    }, [editInfoWindow]);

    return (
        <div>
            <div className={`${styles.AccInformationContainer} glass-effect`}>
                <div className={`${styles.picture}`}></div>
                <span className={`${styles.infoLable}`}>Компания:</span>
                <h2 className={`${styles.userName}`}>
                    {profile.companyName || 'Company Name'}
                </h2>
                <span className={`${styles.infoLable}`}>Email:</span>
                <span>
                    {userData.email || 'No email :/'}
                </span>
                <span className={`${styles.infoLable}`}>Описание:</span>
                <span>
                    {profile.description || 'No description o_o'}
                </span>
                <span className={`${styles.infoLable}`}>Сайт:</span>
                <span>
                    {profile.websiteLink || 'No site ._.'}
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
                    buttonText='Выйти'
                    variant={"danger"}
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
                                <label className={`${styles.infoLable}`}>Компания:</label>
                                <input 
                                    className={`input-box dark-radius-border`} 
                                    type="text"
                                    name="companyName"
                                    value={form.companyName}
                                    onChange={handleChange}
                                />
                                <label className={`${styles.infoLable}`}>Описание:</label>
                                <input
                                    className={`input-box dark-radius-border`} 
                                    type="text"
                                    name="description"
                                    autoComplete="on"
                                    value={form.description}
                                    onChange={handleChange}
                                />
                                <label className={`${styles.infoLable}`}>Сайт:</label>
                                <input
                                    className={`input-box dark-radius-border`} 
                                    type="text"
                                    name="websiteLink"
                                    value={form.websiteLink}
                                    onChange={handleChange}
                                />
                                <Button 
                                    type="submit"
                                    variant={"default"}
                                    buttonText='Подтвердить' 
                                />
                            </form>
                        </div>
                    </div>
            )}
        </div>
    );
}