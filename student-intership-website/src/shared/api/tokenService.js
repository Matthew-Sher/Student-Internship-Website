let accessToken = null;

export const tokenService = {
    get() {
        return accessToken;
    },
    set(token) {
        accessToken = token;
    },
    clesr() {
        accessToken = null;
    },
};