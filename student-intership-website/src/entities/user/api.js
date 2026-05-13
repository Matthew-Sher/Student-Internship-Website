import { ENDPOINTS } from "../../shared/api/endpoints";
import { httpClient } from "../../shared/api/httpClien";

export async function getProfileData() {
    let options = {
        method: 'GET',
    };
    let response = await httpClient(ENDPOINTS.PROFILE_CONTROLLER.ME, options)

    return response;
}