import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestAddAccount,
  RequestAddAccountAuthority,
  RequestAddKeyAuthority,
  RequestBroadcast,
  RequestConvert,
  RequestCreateClaimedAccount,
  RequestCreateProposal,
  RequestCustomJSON,
  RequestDecode,
  RequestDelegation,
  RequestEncode,
  RequestEncodeWithKeys,
  RequestPost,
  RequestPowerDown,
  RequestPowerUp,
  RequestProxy,
  RequestRecurrentTransfer,
  RequestRemoveAccountAuthority,
  RequestRemoveKeyAuthority,
  RequestRemoveProposal,
  RequestSendToken,
  RequestSignBuffer,
  RequestSignTx,
  RequestSwap,
  RequestTransfer,
  RequestUpdateProposalVote,
  RequestVote,
  RequestWitnessVote,
} from 'hive-keychain-commons';

export type Login = {
  username?: string;
  message?: string;
  method: KeychainKeyTypes;
  title?: string;
};
export type Encode = ExcludeCommonParams<RequestEncode>;
export type EncodeWithKeys = ExcludeCommonParams<RequestEncodeWithKeys>;
export type Decode = ExcludeCommonParams<RequestDecode>;
export type SignBuffer = ExcludeCommonParams<RequestSignBuffer>;
export type AddAccountAuthority =
  ExcludeCommonParams<RequestAddAccountAuthority>;
export type RemoveAccountAuthority =
  ExcludeCommonParams<RequestRemoveAccountAuthority>;
export type AddKeyAuthority = ExcludeCommonParams<RequestAddKeyAuthority>;
export type RemoveKeyAuthority = ExcludeCommonParams<RequestRemoveKeyAuthority>;
export type Broadcast = ExcludeCommonParams<RequestBroadcast>;
export type SignTx = ExcludeCommonParams<RequestSignTx>;
export type Post = ExcludeCommonParams<RequestPost>;
export type Vote = ExcludeCommonParams<RequestVote>;
export type Custom = ExcludeCommonParams<RequestCustomJSON>;
export type Transfer = ExcludeCommonParams<RequestTransfer>;
export type SendToken = ExcludeCommonParams<RequestSendToken>;
export type Delegation = ExcludeCommonParams<RequestDelegation>;
export type WitnessVote = ExcludeCommonParams<RequestWitnessVote>;
export type Proxy = ExcludeCommonParams<RequestProxy>;
export type PowerUp = ExcludeCommonParams<RequestPowerUp>;
export type PowerDown = ExcludeCommonParams<RequestPowerDown>;
export type CreateClaimedAccount =
  ExcludeCommonParams<RequestCreateClaimedAccount>;
export type CreateProposal = ExcludeCommonParams<RequestCreateProposal>;
export type RemoveProposal = ExcludeCommonParams<RequestRemoveProposal>;
export type UpdateProposalVote = ExcludeCommonParams<RequestUpdateProposalVote>;
export type AddAccount = ExcludeCommonParams<RequestAddAccount>;
export type Convert = ExcludeCommonParams<RequestConvert>;
export type RecurrentTransfer = ExcludeCommonParams<RequestRecurrentTransfer>;
export type Swap = ExcludeCommonParams<RequestSwap>;
export {
  KeychainKeyTypes,
  KeychainRequestTypes,
  RequestAddAccountKeys,
} from 'hive-keychain-commons';
