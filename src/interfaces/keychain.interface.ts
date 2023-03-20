import { SignedTransaction } from '@hiveio/dhive';

export interface KeychainOptions {
  rpc?: string;
}

export interface KeychainRequestResponse {
  success: boolean;
  error: string;
  result?: KeychainTransactionResult;
  data: {
    key: string;
    message: string;
    method: string;
    receiver: string;
    request_id: number;
    type: string;
    username: string;
  };
  message: string;
  request_id: number;
  publicKey?: string;
}

export interface KeychainSignTxRequestResponse
  extends Omit<KeychainRequestResponse, 'result'> {
  result: SignedTransaction;
}

export interface KeychainAddAccountRequestResponse
  extends Omit<KeychainRequestResponse, 'result'> {
  result: boolean;
}

export interface KeychainHiveEngineRequestResponse
  extends Omit<KeychainRequestResponse, 'result'> {
  result: HiveEngineTransactionResult;
}

export interface KeychainRequestStringResponse
  extends Omit<KeychainRequestResponse, 'result'> {
  result: string;
}

export interface KeychainConfig {
  window: Window;
  options?: KeychainOptions;
}

export interface KeychainTransactionResult {
  tx_id: string;
  id: string;
  // status: string;
  // block_num: number;
  confirmed?: boolean;
}

export interface HiveEngineTransactionResult {
  broadcasted: boolean;
  confirmed: boolean;
  tx_id: string;
}
