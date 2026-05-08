import { ENDPOINTS } from "../../../shared/api/endpoints";
import { httpClient } from "../../../shared/api/httpClien";
import { tokenService } from "../../../shared/api/tokenService";

export async function loginUser(userData) {
  let options = {
    method: 'POST',
    body: userData,
  };
  let response = await httpClient(ENDPOINTS.AUTH.LOGIN, options);

  const data = await response.json();
  tokenService.setTokens(data);

  return response;
}