import { KeychainKeyTypes } from './keychain.interface';

/**
 * This function is called to verify that the user has a certain authority over an account, by requesting to decode a message
 * @param {String} username Hive account to perform the request
 * @param {String} receiver Account that will decode the string
 * @param {String} message Message to be encrypted, i.e: "#To encrypt message"
 * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
 */
export interface EncodeMessageParams {
  username: string;
  receiver: string;
  message: string;
  key: KeychainKeyTypes;
}

export interface TransferParams {
  account: string;
  to: string;
  amount: string;
  memo: string;
  currency: string;
}
