export interface KeychainOptions {
  rpc?: string;
}

export interface KeychainRequestResponse {
  success: boolean;
  error: string;
  result?: HiveTxConfirmationResult | string | HiveEngineTransactionStatus;
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

export interface KeychainConfig {
  window: Window;
  options?: KeychainOptions;
}

export interface HiveTxConfirmationResult {
  confirmed: boolean;
  tx_id: string;
  status: string;
}

export interface HiveEngineTransactionStatus {
  broadcasted: boolean;
  confirmed: boolean;
  tx_id: string;
}
