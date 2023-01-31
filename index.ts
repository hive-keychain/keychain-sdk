import {
  AccountWitnessProxyOperation,
  AccountWitnessVoteOperation,
  Asset,
  Authority,
  CreateClaimedAccountOperation,
  CreateProposalOperation,
  CustomJsonOperation,
  CustomOperation,
  Operation,
  RecurrentTransferOperation,
  RemoveProposalOperation,
  Transaction,
  TransferOperation,
  UpdateProposalVotesOperation,
  VoteOperation,
  WitnessUpdateOperation,
} from '@hiveio/dhive';
import {
  KeychainKeyTypes,
  RequestCustomJSON,
} from './interfaces/keychain.interface';
import { Keys } from './interfaces/local-account.interface';
import { DelegationUnit } from './reference-data/keychain.enums';
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
    data: {
      account: string | undefined;
      message: string | undefined;
      key: KeychainKeyTypes;
    },
    options: {
      rpc?: string;
      title?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestSignBuffer(
          data.account,
          data.message ?? utils.generateRandomString(),
          data.key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject({
                ...response,
                success: false,
                result: options.title
                  ? `Cannot login into: ${options.title}`
                  : null,
              });
            } else {
              resolve({
                ...response,
                success: true,
                result: options.title
                  ? `Login successful: ${options.title}`
                  : null,
              });
            }
          },
          options.rpc ?? this.options?.rpc,
          options.title,
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
  requestEncodeMessage = async (data: {
    username: string;
    receiver: string;
    message: string;
    key: KeychainKeyTypes;
  }): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestEncodeMessage(
          data.username,
          data.receiver,
          data.message,
          data.key,
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
  requestVerifyKey = async (data: {
    account: string;
    message: string;
    key: KeychainKeyTypes;
  }): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestVerifyKey(
          data.account,
          data.message,
          data.key,
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
    data: {
      account: string | undefined;
      message: string;
      key: KeychainKeyTypes;
    },
    options: {
      rpc?: string;
      title?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestSignBuffer(
          data.account,
          data.message,
          data.key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
          options.title,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to add account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.authorizedUsername Authorized account
   * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'
   * @param {number} data.weight Weight of the authority
   * @param {String | undefined} options.rpc Override user's RPC settings
   */
  requestAddAccountAuthority = async (
    data: {
      account: string;
      authorizedUsername: string;
      role: KeychainKeyTypes;
      weight: number;
    },
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestAddAccountAuthority(
          data.account,
          data.authorizedUsername,
          data.role,
          data.weight,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to remove an account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.authorizedUsername Account to lose authority
   * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'
   * @param {String |  undefined} options.rpc Override user's RPC settings
   */
  requestRemoveAccountAuthority = async (
    data: {
      account: string;
      authorizedUsername: string;
      role: KeychainKeyTypes;
    },
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestRemoveAccountAuthority(
          data.account,
          data.authorizedUsername,
          data.role,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to add a new key authority to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.authorizedKey New public key to be associated with the account
   * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'
   * @param {number} data.weight Weight of the key authority
   * @param {String} options.rpc Override user's RPC settings
   */
  requestAddKeyAuthority = async (
    data: {
      account: string;
      authorizedKey: string;
      role: KeychainKeyTypes;
      weight: Number;
    },
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestAddKeyAuthority(
          data.account,
          data.authorizedKey,
          data.role,
          data.weight,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to remove a key to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.authorizedKey Key to be removed (public key).
   * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'.
   * @param {String} options.rpc Override user's RPC settings
   */
  requestRemoveKeyAuthority = async (
    data: {
      account: string;
      authorizedKey: string;
      role: KeychainKeyTypes;
    },
    options: { rpc?: string },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestRemoveKeyAuthority(
          data.account,
          data.authorizedKey,
          data.role,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Generic broadcast request
   * @param {String} data.account Hive account to perform the request
   * @param {Array} data.operations Array of operations to be broadcasted
   * @param {String} data.key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String} options.rpc Override user's RPC settings
   */
  requestBroadcast = async (
    data: {
      account: string;
      operations: Operation[];
      key: KeychainKeyTypes;
    },
    options: { rpc?: string },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestBroadcast(
          data.account,
          data.operations,
          data.key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests to sign a transaction with a given authority
   * @param {String} data.account Hive account to perform the request
   * @param {Object} data.tx Unsigned transaction
   * @param {String} data.key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String} options.rpc Override user's RPC settings
   */
  requestSignTx = async (
    data: {
      account: string;
      tx: Transaction;
      key: KeychainKeyTypes;
    },
    options: { rpc?: string },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestSignTx(
          data.account,
          data.tx,
          data.key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a signed call
   * @deprecated
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.method Method of the call
   * @param {String} data.params Parameters of the call
   * @param {String} data.key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String} options.rpc Override user's RPC settings
   */
  requestSignedCall = async (
    data: {
      account: string;
      method: string;
      params: string;
      key: KeychainKeyTypes;
    },
    options: { rpc?: string },
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
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.title Title of the blog post
   * @param {String} data.body Content of the blog post
   * @param {String} data.parent_perm Permlink of the parent post. Main tag for a root post
   * @param {String} data.parent_account Author of the parent post. Pass null for root post
   * @param {Object} data.json_metadata Parameters of the call
   * @param {String} data.permlink Permlink of the blog post
   * @param {Object} data.comment_options Options attached to the blog post. Consult Hive documentation at <https://developers.hive.io/apidefinitions/#broadcast_ops_comment_options> to learn more about it
   * @param {String} options.rpc Override user's RPC settings
   */
  requestPost = async (
    data: {
      account: string;
      title: string;
      body: string;
      parent_perm: string;
      parent_account: [] | undefined;
      json_metadata: object;
      permlink: string;
      comment_options: object;
    },
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestPost(
          data.account,
          data.title,
          data.body,
          data.parent_perm,
          data.parent_account,
          data.json_metadata,
          data.permlink,
          data.comment_options,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * @deprecated
   * Requests a vote
   */
  requestVote = async (
    data: VoteOperation,
    options: { rpc?: string },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestVote(
          data[1].voter,
          data[1].permlink,
          data[1].author,
          data[1].weight,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a custom JSON broadcast
   * @param {String} data[1].account Hive account to perform the request. If null, user can choose the account from a dropdown
   * @param {String} data[1].id Type of custom_json to be broadcasted
   * @param {String} data[1].key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String} data[1].json Stringified custom json
   * @param {String} data[1].display_msg Message to display to explain to the user what this broadcast is about
   * @param {String} options.rpc Override user's RPC settings
   */
  requestCustomJson = async (
    data: CustomJsonOperation & Operation,
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestCustomJson(
          data[1].account,
          data[1].id,
          data[1].key,
          data[1].json,
          data[1].display_msg,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  requestTransfer = async (
    data: TransferOperation,
    options: {
      enforce: boolean | undefined;
      rpc: string | undefined;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        const amountData = utils.checkAndFormatAmount(data[1].amount);
        this.window.hive_keychain.requestTransfer(
          data[1].from,
          data[1].to,
          amountData.amount,
          data[1].memo,
          amountData.currency,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.enforce ?? false,
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  //TODO skipped waiting for structure for this
  /**
   * Requests a token transfer
   * @param {String} account Hive account to perform the request
   * @param {String} to Hive account to receive the transfer
   * @param {String} amount Amount to be transferred. Requires 3 decimals.
   * @param {String} memo Memo attached to the transfer
   * @param {String} currency Token symbol to be sent
   * @param {String} rpc Override user's RPC settings
   */
  // requestSendToken = async (
  //   data: {
  //     account: string;
  //     to: string;
  //     amount: string;
  //     memo: string;
  //     currency: string;
  //   },
  //   options: {
  //     rpc?: string;
  //   },
  // ): Promise<KeychainRequestResponse> => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await this.isKeyChainInstalled();
  //       this.window.hive_keychain.requestSendToken(
  //         data.account,
  //         data.to,
  //         data.amount,
  //         data.memo,
  //         data.currency,
  //         (response: KeychainRequestResponse) => {
  //           if (response.error) {
  //             reject(response);
  //           } else {
  //             resolve(response);
  //           }
  //         },
  //         options.rpc ?? this.options?.rpc,
  //       );
  //     } catch (error) {
  //       throw error;
  //     }
  //   });
  // };

  //TODO skipped waiting for structure for this
  /**
   * Requests a delegation broadcast
   * @param {String} username Hive account to perform the request. If undefined, user can choose the account from a dropdown
   * @param {String} delegatee Account to receive the delegation
   * @param {String} amount Amount to be transfered. Requires 3 decimals for HP, 6 for VESTS.
   * @param {String} unit HP or VESTS
   * @param {String} rpc Override user's RPC settings
   */
  requestDelegation = async (
    data: {
      account: string | undefined;
      delegatee: string;
      amount: string | Asset;
      unit: DelegationUnit.HP | DelegationUnit.VESTS;
    },
    options: { rpc?: string },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        const amountData =
          data.unit === DelegationUnit.VESTS
            ? utils.checkAndFormatAmount(data.amount, 6)
            : utils.checkAndFormatAmount(data.amount);
        this.window.hive_keychain.requestDelegation(
          data.account,
          data.delegatee,
          amountData.amount,
          data.unit,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Requests a delegation broadcast
   * @param {String} data.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
   * @param {String} data.witness Account to receive the witness vote
   * @param {boolean} data.approve Set to true to vote for the witness, false to unvote
   * @param {String} options.rpc Override user's RPC settings
   */
  requestWitnessVote = async (
    data: AccountWitnessVoteOperation,
    options: { rpc?: string },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestWitnessVote(
          data[1].account,
          data[1].witness,
          data[1].approve,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * Select an account as proxy
   * @param {String | undefined } data.account Hive account to perform the request. If undefined, user can choose the account from a dropdown
   * @param {String} data.proxy Account to become the proxy. Empty string ('') to remove a proxy
   * @param {String | undefined} options.rpc Override user's RPC settings
   */
  requestProxy = async (
    data: AccountWitnessProxyOperation,
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestProxy(
          data[1].account,
          data[1].proxy,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  //TODO skipped waiting for structure for this
  /**
   * Request a power up
   * @param {String} username Hive account to perform the request
   * @param {String} recipient Account to receive the power up
   * @param {String} hive Amount of HIVE to be powered up
   * @param {String} [rpc=null] Override user's RPC settings
   */
  // requestPowerUp = async (
  //   data: {
  //     username: string;
  //     recipient: string;
  //     hive: string;
  //   },
  //   options: {
  //     rpc?: string;
  //   },
  // ): Promise<KeychainRequestResponse> => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await this.isKeyChainInstalled();
  //       this.window.hive_keychain.requestPowerUp(
  //         data.username,
  //         data.recipient,
  //         data.hive,
  //         (response: KeychainRequestResponse) => {
  //           if (response.error) {
  //             reject(response);
  //           } else {
  //             resolve(response);
  //           }
  //         },
  //         options.rpc ?? this.options?.rpc,
  //       );
  //     } catch (error) {
  //       throw error;
  //     }
  //   });
  // };
  //TODO skipped waiting for structure for this
  /**
   * Request a power down
   * @param {String} username Hive account to perform the request
   * @param {String} hive_power Amount of HIVE to be powered down
   * @param {String} [rpc=null] Override user's RPC settings
   */
  // requestPowerDown = async (
  //   data: {
  //     username: string;
  //     hive_power: string;
  //   },
  //   options: {
  //     rpc?: string;
  //   },
  // ): Promise<KeychainRequestResponse> => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await this.isKeyChainInstalled();
  //       this.window.hive_keychain.requestPowerDown(
  //         data.username,
  //         data.hive_power,
  //         (response: KeychainRequestResponse) => {
  //           if (response.error) {
  //             reject(response);
  //           } else {
  //             resolve(response);
  //           }
  //         },
  //         options.rpc ?? this.options?.rpc,
  //       );
  //     } catch (error) {
  //       throw error;
  //     }
  //   });
  // };

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
    data: CreateClaimedAccountOperation,
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestCreateClaimedAccount(
          data[1].creator,
          data[1].new_account_name,
          data[1].owner,
          data[1].active,
          data[1].posting,
          data[1].memo_key,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
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
    data: CreateProposalOperation,
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestCreateProposal(
          data[1].creator,
          data[1].receiver,
          data[1].start_date,
          data[1].end_date,
          data[1].daily_pay,
          data[1].subject,
          data[1].permlink,
          data[1].extensions,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
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
    data: RemoveProposalOperation,
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestRemoveProposal(
          data[1].proposal_owner,
          data[1].proposal_ids,
          data[1].extensions,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
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
    data: UpdateProposalVotesOperation,
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestUpdateProposalVote(
          data[1].voter,
          data[1].proposal_ids,
          data[1].approve,
          data[1].extensions,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
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
  requestAddAccount = async (data: {
    username: string;
    keys: Keys;
  }): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestAddAccount(
          data.username,
          data.keys,
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

  //TODO skipped waiting for structure for this
  /**
   * @param {String} username Hive account to perform the request
   * @param {String} amount amount to be converted.
   * @param {Boolean} collaterized true to convert HIVE to HBD. false to convert HBD to HIVE.
   * @param {String | undefined} rpc  Override user's RPC settings
   */
  // requestConversion = async (
  //   data: {
  //     username: string;
  //     amount: string;
  //     collaterized: boolean;
  //   },
  //   options: {
  //     rpc?: string;
  //   },
  // ): Promise<KeychainRequestResponse> => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await this.isKeyChainInstalled();
  //       this.window.hive_keychain.requestConversion(
  //         data.username,
  //         data.amount,
  //         data.collaterized,
  //         (response: KeychainRequestResponse) => {
  //           if (response.error) {
  //             reject(response);
  //           } else {
  //             resolve(response);
  //           }
  //         },
  //         options.rpc ?? this.options?.rpc,
  //       );
  //     } catch (error) {
  //       throw error;
  //     }
  //   });
  // };

  /**
   * @param {String| undefined} data[1].from Hive account to perform the request
   * @param {String} data[1].to Hive account receiving the transfers.
   * @param {String} data[1].amount amount to be sent on each execution. Will be automatically formatted to 3 decimals.
   * @param {String} data[1].currency HIVE or HBD on mainnet.
   * @param {String} data[1].memo transfer memo
   * @param {Number} data[1].recurrence How often will the payment be triggered (in hours) - minimum 24.
   * @param {Number} data[1].executions The times the recurrent payment will be executed - minimum 2.
   * @param {String| undefined} options.rpc Override user's RPC settings
   */
  requestRecurrentTransfer = async (
    data: RecurrentTransferOperation,
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        const amountData = utils.checkAndFormatAmount(data[1].amount);
        this.window.hive_keychain.requestRecurrentTransfer(
          data[1].from,
          data[1].to,
          amountData.amount,
          amountData.currency,
          data[1].memo,
          data[1].recurrence,
          data[1].executions,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          options.rpc ?? this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };
}
