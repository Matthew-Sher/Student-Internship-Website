export const API_BASE_URL = "http://localhost:8080";

export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register', 
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refersh',
    },
    PROFILE_CONTROLLER: {
        ME: '/profiles/me',
        STUDENT: '/profiles/student',
        EMPLOYER: '/profiles/employer',
    }
};