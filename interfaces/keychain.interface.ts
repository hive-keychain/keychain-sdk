export interface KeychainOptions {
  rpc?: string;
}

export interface KeychainRequestResponse {
  success: boolean;
  error: string;
  result: string | null;
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
