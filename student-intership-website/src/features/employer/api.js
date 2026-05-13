import { ENDPOINTS } from "../../shared/api/endpoints";
import { httpClient } from "../../shared/api/httpClien";
import { tokenService } from "../../shared/api/tokenService";

export async function confirmEdit(employerNewData) {
    console.log(employerNewData);
    let options = {
        method: 'PATCH',
        body: employerNewData,
    };
    let result = await httpClient(ENDPOINTS.PROFILE_CONTROLLER.EMPLOYER, options);
    let data = await result.json();
    console.log(data);
    return result;
}

export async function logout() {
    let options = {
        method: 'POST',
        body: {refreshToken: tokenService.getRefresh()},
    };
    let response = await httpClient(ENDPOINTS.AUTH.LOGOUT, options);
    if (response.ok) {tokenService.clear()};
    return response;
} 