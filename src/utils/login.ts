import { KeychainRequestResponse } from '../interfaces/keychain.interface';

export const getLoginError = (
  response: KeychainRequestResponse,
  errorMessage: string,
) => {
  response.success = false;
  response.error = errorMessage;
  response.message = errorMessage;
  return response;
};
