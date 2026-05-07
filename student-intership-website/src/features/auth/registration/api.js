import { ENDPOINTS } from "../../../shared/api/endpoints";
import { httpClient } from "../../../shared/api/httpClien";


export async function registerUser(userData) {
  let options = {
    method: 'POST',
    body: userData,
  };
  let response = await httpClient(ENDPOINTS.AUTH.REGISTER, options);

  return response;
}