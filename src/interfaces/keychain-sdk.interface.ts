import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  KeychainRequestTypes,
  RequestSignBuffer,
} from 'hive-keychain-commons';

export type Login = {
  username?: string;
  message?: string;
  method: KeychainKeyTypes;
  title?: string;
};
export type SignBuffer = ExcludeCommonParams<RequestSignBuffer>;
