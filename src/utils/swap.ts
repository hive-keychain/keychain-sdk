export const SwapConf = {
  baseURL: 'https://swap.hive-keychain.com',
};

export const getConfig = async (): Promise<SwapConfig> => {
  return (
    await (await fetch(`${SwapConf.baseURL}/token-swap/public-config`)).json()
  ).result;
};

export const getServerStatus = async (): Promise<SwapServerStatus> => {
  return (await (await fetch(`${SwapConf.baseURL}/server/status`)).json())
    .result;
};

export interface SwapConfig {
  account: string;
  fee: SwapFeeConfig;
  slippage: SwapSlippageConfig;
}

export interface SwapServerStatus {
  isMaintenanceOn: boolean;
  isServerStopped: boolean;
  layerTwoDelayed: boolean;
}

interface SwapFeeConfig {
  account: string;
  amount: number;
}

interface SwapSlippageConfig {
  min: number;
  default: number;
}
