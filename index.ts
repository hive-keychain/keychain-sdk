import { Authority, Operation, Transaction } from '@hiveio/dhive';
import { KeychainKeyTypes } from './interfaces/keychain.interface';
import {
  EncodeMessageParams,
  TransferParams,
} from './interfaces/keychain.request-params';
import { TransferOptionalParams } from './interfaces/keychain.request.optional-params';
import { Keys } from './interfaces/local-account.interface';
import utils from './testing/src/utils/utils';
interface KeychainOptions {
  rpc?: string;
}
interface KeychainRequestResponse {
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
}
interface KeychainRequestError {
  keychainError: string;
  type: string;
}
declare global {
  interface Window {
    hive_keychain: any;
  }
}

export class KeychainSDK {
  window: Window;
  options: KeychainOptions | undefined;

  constructor(window: Window, options?: KeychainOptions) {
    this.window = window;
    this.options = options;
  }
  //////utils////////
  getConfig() {
    return {
      window: this.window,
      options: this.options,
    };
  }

  /**
   *
   * Note: will check if window object set + keychain extension detected!
   */
  isKeyChainInstalled = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (this.window.hive_keychain) {
        try {
          this.window.hive_keychain.requestHandshake(function () {
            resolve(true);
          });
        } catch (error) {
          throw error;
        }
      } else {
        resolve(false);
      }
    });
  };

  login = async (
    account: string,
    message: string | undefined,
    key: KeychainKeyTypes,
    rpc?: string,
    title?: string,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestSignBuffer(
          account,
          message ? message : utils.generateRandomString(),
          key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject({
                ...response,
                success: false,
                result: title ? `Cannot login into: ${title}` : null,
              });
            } else {
              resolve({
                ...response,
                success: false,
                result: title ? `Login successful: ${title}` : null,
              });
            }
          },
          rpc ?? this.options?.rpc,
          title,
        );
      } catch (error) {
        throw error;
      }
    });
  };
  //////END utils///////

  // /**
  //  * This function is called to verify that the user has a certain authority over an account, by requesting to decode a message
  //  * @param {String} username Hive account to perform the request
  //  * @param {String} receiver Account that will decode the string
  //  * @param {String} message Message to be encrypted, i.e: "#To encrypt message"
  //  * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
  //  */
  requestEncodeMessage = async (
    params: EncodeMessageParams,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestEncodeMessage(
          params.username,
          params.receiver,
          params.message,
          params.key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * This function is called to verify that the user has a certain authority over an account, by requesting to decode a message
   * @param {String} account Hive account to perform the request
   * @param {String} message Message to be decoded by the account
   * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
   */
  requestVerifyKey = async (
    account: string,
    message: string,
    key: KeychainKeyTypes,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestVerifyKey(
          account,
          message,
          key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a message to be signed with proper authority
   * @param {String| undefined} account Hive account to perform the request. If undefined, user can choose the account from a dropdown
   * @param {String} message Message to be signed by the account
   * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String| undefined} rpc Override user's RPC settings
   * @param {String | undefined} title Override "Sign message" title
   */
  requestSignBuffer = async (
    account: string | undefined,
    message: string,
    key: KeychainKeyTypes,
    rpc?: string,
    title?: string,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestSignBuffer(
          account,
          message,
          key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
          title,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to add account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @param {String} account Hive account to perform the request
   * @param {String} authorizedUsername Authorized account
   * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'
   * @param {number} weight Weight of the authority
   * @param {String | undefined} rpc Override user's RPC settings
   */
  requestAddAccountAuthority = async (
    account: string,
    authorizedUsername: string,
    role: KeychainKeyTypes,
    weight: number,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestAddAccountAuthority(
          account,
          authorizedUsername,
          role,
          weight,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to remove an account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @param {String} account Hive account to perform the request
   * @param {String} authorizedUsername Account to lose authority
   * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'
   * @param {String |  undefined} rpc Override user's RPC settings
   */
  requestRemoveAccountAuthority = async (
    account: string,
    authorizedUsername: string,
    role: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestRemoveAccountAuthority(
          account,
          authorizedUsername,
          role,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to add a new key authority to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @param {String} account Hive account to perform the request
   * @param {String} authorizedKey New public key to be associated with the account
   * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'
   * @param {number} weight Weight of the key authority
   * @param {String} rpc Override user's RPC settings
   */
  requestAddKeyAuthority = async (
    account: string,
    authorizedKey: string,
    role: KeychainKeyTypes,
    weight: Number,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestAddKeyAuthority(
          account,
          authorizedKey,
          role,
          weight,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to remove a key to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @param {String} account Hive account to perform the request
   * @param {String} authorizedKey Key to be removed (public key).
   * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'.
   * @param {String} rpc Override user's RPC settings
   */
  requestRemoveKeyAuthority = async (
    account: string,
    authorizedKey: string,
    role: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestRemoveKeyAuthority(
          account,
          authorizedKey,
          role,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Generic broadcast request
   * @param {String} account Hive account to perform the request
   * @param {Array} operations Array of operations to be broadcasted
   * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String} rpc Override user's RPC settings
   */
  requestBroadcast = async (
    account: string,
    operations: Operation[],
    key: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestBroadcast(
          account,
          operations,
          key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to sign a transaction with a given authority
   * @param {String} account Hive account to perform the request
   * @param {Object} tx Unsigned transaction
   * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String} rpc Override user's RPC settings
   */
  requestSignTx = async (
    account: string,
    tx: Transaction,
    key: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestSignTx(
          account,
          tx,
          key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a signed call
   * @deprecated
   * @param {String} account Hive account to perform the request
   * @param {String} method Method of the call
   * @param {String} params Parameters of the call
   * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String} rpc Override user's RPC settings
   */
  requestSignedCall = async (
    account: string,
    method: string,
    params: string,
    key: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        resolve('requestSignedCall has been deprecated.');
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to broadcast a blog post/comment
   * @param {String} account Hive account to perform the request
   * @param {String} title Title of the blog post
   * @param {String} body Content of the blog post
   * @param {String} parent_perm Permlink of the parent post. Main tag for a root post
   * @param {String} parent_account Author of the parent post. Pass null for root post
   * @param {Object} json_metadata Parameters of the call
   * @param {String} permlink Permlink of the blog post
   * @param {Object} comment_options Options attached to the blog post. Consult Hive documentation at <https://developers.hive.io/apidefinitions/#broadcast_ops_comment_options> to learn more about it
   * @param {String} rpc Override user's RPC settings
   */
  requestPost = async (
    account: string,
    title: string,
    body: string,
    parent_perm: string,
    parent_account: [] | undefined,
    json_metadata: object,
    permlink: string,
    comment_options: object,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestPost(
          account,
          title,
          body,
          parent_perm,
          parent_account,
          json_metadata,
          permlink,
          comment_options,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a vote
   * @param {String} account Hive account to perform the request
   * @param {String} permlink Permlink of the blog post
   * @param {String} author Author of the blog post
   * @param {Number} weight Weight of the vote, comprised between -10,000 (-100%) and 10,000 (100%)
   * @param {String} rpc Override user's RPC settings
   */
  requestVote = async (
    account: string,
    permlink: string,
    author: string,
    weight: number,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestVote(
          account,
          permlink,
          author,
          weight,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a custom JSON broadcast
   * @param {String} account Hive account to perform the request. If null, user can choose the account from a dropdown
   * @param {String} id Type of custom_json to be broadcasted
   * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String} json Stringified custom json
   * @param {String} display_msg Message to display to explain to the user what this broadcast is about
   * @param {String} rpc Override user's RPC settings
   */
  requestCustomJson = async (
    account: string | undefined,
    id: string,
    key: KeychainKeyTypes,
    json: string,
    display_msg: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestCustomJson(
          account,
          id,
          key,
          json,
          display_msg,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  requestTransfer = async (
    params: TransferParams,
    optional?: TransferOptionalParams,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        //TODO add amount check & formatting
        this.window.hive_keychain.requestTransfer(
          params.account,
          params.to,
          params.amount,
          params.memo,
          params.currency,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          optional?.enforce ?? false,
          optional?.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a token transfer
   * @param {String} account Hive account to perform the request
   * @param {String} to Hive account to receive the transfer
   * @param {String} amount Amount to be transferred. Requires 3 decimals.
   * @param {String} memo Memo attached to the transfer
   * @param {String} currency Token symbol to be sent
   * @param {String} rpc Override user's RPC settings
   */
  requestSendToken = async (
    account: string,
    to: string,
    amount: string,
    memo: string,
    currency: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestSendToken(
          account,
          to,
          amount,
          memo,
          currency,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a delegation broadcast
   * @param {String} username Hive account to perform the request. If null, user can choose the account from a dropdown
   * @param {String} delegatee Account to receive the delegation
   * @param {String} amount Amount to be transfered. Requires 3 decimals for HP, 6 for VESTS.
   * @param {String} unit HP or VESTS
   * @param {String} rpc Override user's RPC settings
   */
  requestDelegation = async (
    username: string | undefined,
    delegatee: string,
    amount: string,
    unit: string = 'HP' || 'VESTS',
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestDelegation(
          username,
          delegatee,
          amount,
          unit,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a witness vote broadcast
   * @param {String} [username=null] Hive account to perform the request. If null, user can choose the account from a dropdown
   * @param {String} witness Account to receive the witness vote
   * @param {boolean} vote Set to true to vote for the witness, false to unvote
   * @param {String} [rpc=null] Override user's RPC settings
   */
  requestWitnessVote = async (
    username: string | undefined,
    witness: string,
    vote: boolean,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestWitnessVote(
          username,
          witness,
          vote,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Select an account as proxy
   * @param {String} [username=null] Hive account to perform the request. If null, user can choose the account from a dropdown
   * @param {String} proxy Account to become the proxy. Empty string ('') to remove a proxy
   * @param {String} [rpc=null] Override user's RPC settings
   */
  requestProxy = async (
    username: string | undefined,
    proxy: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestProxy(
          username,
          proxy,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Request a power up
   * @param {String} username Hive account to perform the request
   * @param {String} recipient Account to receive the power up
   * @param {String} hive Amount of HIVE to be powered up
   * @param {String} [rpc=null] Override user's RPC settings
   */
  requestPowerUp = async (
    username: string,
    recipient: string,
    hive: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestPowerUp(
          username,
          recipient,
          hive,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Request a power down
   * @param {String} username Hive account to perform the request
   * @param {String} hive_power Amount of HIVE to be powered down
   * @param {String} [rpc=null] Override user's RPC settings
   */
  requestPowerDown = async (
    username: string,
    hive_power: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestPowerDown(
          username,
          hive_power,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Request the creation of an account using claimed tokens
   * @param {String} username Hive account to perform the request
   * @param {String} new_account New account to be created
   * @param {object} owner owner authority object
   * @param {object} active active authority object
   * @param {object} posting posting authority object
   * @param {String} memo public memo key
   * @param {String} [rpc=null] Override user's RPC settings
   */
  requestCreateClaimedAccount = async (
    username: string,
    new_account: string,
    owner: Authority,
    active: Authority,
    posting: Authority,
    memo: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestCreateClaimedAccount(
          username,
          new_account,
          owner,
          active,
          posting,
          memo,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  //HF21
  /**
   * Request the creation of a DHF proposal
   * @param {String} username Hive account to perform the request
   * @param {String} receiver Account receiving the funding if the proposal is voted
   * @param {String} subject Title of the DAO
   * @param {String} permlink Permlink to the proposal description
   * @param {String} daily_pay Daily amount to be received by `receiver`
   * @param {String} start Starting date
   * @param {String} end Ending date
   * @param {String} extensions Stringified Array of extensions
   * @param {String} [rpc=null] Override user's RPC settings
   */
  requestCreateProposal = async (
    username: string,
    receiver: string,
    subject: string,
    permlink: string,
    daily_pay: string,
    start: string,
    end: string,
    extensions: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestCreateProposal(
          username,
          receiver,
          subject,
          permlink,
          daily_pay,
          start,
          end,
          extensions,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Request the removal of a DHF proposal
   * @param {String} username Hive account to perform the request
   * @param {String} proposal_ids Stringified Array of ids of the proposals to be removed
   * @param {String} extensions Stringified Array of extensions
   * @param {String} [rpc=null] Override user's RPC settings
   */
  requestRemoveProposal = async (
    username: string,
    proposal_ids: string,
    extensions: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestRemoveProposal(
          username,
          proposal_ids,
          extensions,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Vote/Unvote a DHF proposal
   * @param {String} username Hive account to perform the request
   * @param {String} proposal_ids Stringified Array of Ids of the proposals to be voted
   * @param {boolean} approve Set to true to support the proposal, false to remove a vote
   * @param {String} extensions Stringified Array of extensions
   * @param {String} [rpc=null] Override user's RPC settings
   */
  requestUpdateProposalVote = async (
    username: string,
    proposal_ids: string,
    approve: boolean,
    extensions: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestUpdateProposalVote(
          username,
          proposal_ids,
          approve,
          extensions,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Add a new account to Keychain
   * @param {String} username username of the account to be added
   * @param {Object} keys private keys of the account : {active:'...',posting:'...',memo:'...'}. At least one must be specified.
   */
  requestAddAccount = async (
    username: string,
    keys: Keys,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestAddAccount(
          username,
          keys,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * @param {String} username Hive account to perform the request
   * @param {String} amount amount to be converted.
   * @param {Boolean} collaterized true to convert HIVE to HBD. false to convert HBD to HIVE.
   * @param {String | undefined} rpc  Override user's RPC settings
   */
  requestConversion = async (
    username: string,
    amount: string,
    collaterized: boolean,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestConversion(
          username,
          amount,
          collaterized,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * @param {String| undefined} username Hive account to perform the request
   * @param {String} to Hive account receiving the transfers.
   * @param {String} amount amount to be sent on each execution.
   * @param {String} currency HIVE or HBD on mainnet.
   * @param {String} memo transfer memo
   * @param {Number} recurrence How often will the payment be triggered (in hours) - minimum 24.
   * @param {Number} executions The times the recurrent payment will be executed - minimum 2.
   * @param {String| undefined} rpc Override user's RPC settings
   */
  requestRecurrentTransfer = async (
    username: string | undefined,
    to: string,
    amount: string,
    currency: string,
    memo: string,
    recurrence: number,
    executions: number,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestRecurrentTransfer(
          username,
          to,
          amount,
          currency,
          memo,
          recurrence,
          executions,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };
}
