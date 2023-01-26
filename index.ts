import { Authority, Operation, Transaction } from '@hiveio/dhive';
import { KeychainKeyTypes } from './interfaces/keychain.interface';
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

//TODO add same params/examples info on each method as hive_keychain.js
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
          rpc,
          title,
        );
      } catch (error) {
        throw error;
      }
    });
  };
  //////END utils///////

  requestEncodeMessage = async (
    username: string,
    receiver: string,
    message: string,
    key: KeychainKeyTypes,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestEncodeMessage(
          username,
          receiver,
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

  requestSignBuffer = async (
    account: string,
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
          rpc,
          title,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
    // if ((await this.isKeyChainInstalled()) === true) {
    //   const window: any = this.window;
    //   return new Promise((resolve, reject) => {
    //     window.hive_keychain.requestAddAccountAuthority(
    //       account,
    //       authorizedUsername,
    //       role,
    //       weight,
    //       (response: KeychainRequestResponse) => {
    //         if (response.error) {
    //           reject(response);
    //         } else {
    //           resolve(response);
    //         }
    //       },
    //       rpc,
    //     );
    //   });
    // } else {
    //   return Promise.reject({
    //     keychainError: 'Keychain not installed, please visit: www.www.com',
    //     type: 'Error_not_installed',
    //   } as KeychainRequestError);
    // }
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
    // if ((await this.isKeyChainInstalled()) === true) {
    //   const window: any = this.window;
    //   return new Promise((resolve, reject) => {
    //     window.hive_keychain.requestRemoveAccountAuthority(
    //       account,
    //       authorizedUsername,
    //       role,
    //       (response: KeychainRequestResponse) => {
    //         if (response.error) {
    //           reject(response);
    //         } else {
    //           resolve(response);
    //         }
    //       },
    //       rpc,
    //     );
    //   });
    // } else {
    //   return Promise.reject({
    //     keychainError: 'Keychain not installed, please visit: www.www.com',
    //     type: 'Error_not_installed',
    //   } as KeychainRequestError);
    // }
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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

  //TODO how to fix it???
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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  requestTransfer = async (
    account: string,
    to: string,
    amount: string,
    memo: string,
    currency: string,
    enforce: boolean = false,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestTransfer(
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
          enforce,
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  //HF21
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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

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
   * @example
   * import { KeychainSDK } from 'keychain-sdk';
   * const SDKConnector = new KeychainSDK(window, { rpc: 'DEFAULT' });
   * const conversionCollateralized = await SDKConnector.requestConversion(
   *   'keychain.tests',
   *   '0.001',
   *   true,
   * );
   * console.log({ conversionCollateralized });
   *
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
          rpc,
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
          rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };
}
