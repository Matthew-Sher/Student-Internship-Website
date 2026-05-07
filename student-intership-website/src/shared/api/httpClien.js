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
    let response = await fetch(API_BASE_URL + ENDPOINTS.AUTH.REFRESH, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-type": "application/json",
        }, 
    });

    if (!response.ok) {
        throw new Error("Refresh failed!");
    }

    let data = await response.json();
    tokenService.set(data.accessToken);
}

export async function httpClient(url, options) {
    const token = tokenService.get();
    let response = await makeRequest(url, options, token);

    if (response.ok) {
        return response;
    }
    
    await refreshTokens();
    const newToken = tokenService.get();
    response = await makeRequest(url, options, token);

    return response;
}