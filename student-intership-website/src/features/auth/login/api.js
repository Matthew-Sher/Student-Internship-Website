import { ENDPOINTS } from "../../../shared/api/endpoints";
import { httpClient } from "../../../shared/api/httpClien";

export async function loginUser(userData) {
  let options = {
    method: 'POST',
    body: userData,
  };
  let response = await httpClient(ENDPOINTS.AUTH.LOGIN, options);

  return response;
}