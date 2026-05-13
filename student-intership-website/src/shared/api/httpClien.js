import { API_BASE_URL, ENDPOINTS } from "./endpoints";
import { tokenService } from "./tokenService";

export async function makeRequest(url, options = {}, token) {
    let response = await fetch(API_BASE_URL + url, {
        method: options.method,
        headers: {
            ...options.headers,
            'Content-type': 'application/json',
            'Authorization': token? `Bearer ${token}` : undefined,
        },
        body: options.body? JSON.stringify(options.body) : undefined,
        credentials: 'include',
    });

    return response;
}

export async function refreshTokens() {
    const accessToken = tokenService.getAccess();
    const refreshToken = tokenService.getRefresh();

    let response = await fetch(API_BASE_URL + ENDPOINTS.AUTH.REFRESH, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-type": "application/json",
        }, 
        body: JSON.stringify({
            "refreshToken": refreshToken,
        }),
    });

    if (!response.ok) {
        throw new Error("Refresh failed!");
    }

    let data = await response.json();
    tokenService.setTokens(data);
}

export async function httpClient(url, options) {
    const token = tokenService.getAccess();
    let response = await makeRequest(url, options, token);

    if (response.status !== 401) {
        return response;
    }
    
    await refreshTokens();
    const newToken = tokenService.getAccess();
    response = await makeRequest(url, options, newToken);

    return response;
}