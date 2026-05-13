import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { UserPage } from '../pages/UserPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/me" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};