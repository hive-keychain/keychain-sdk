export type Key = string | null;

export interface Keys {
  active?: Key;
  activePubkey?: Key;
  posting?: Key;
  postingPubkey?: Key;
  memo?: Key;
  memoPubkey?: Key;
}

export interface LocalAccount {
  name: string;
  keys: Keys;
}
