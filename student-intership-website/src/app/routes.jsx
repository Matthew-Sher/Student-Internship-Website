import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegistrationPage } from '../pages/RegistrationPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
};