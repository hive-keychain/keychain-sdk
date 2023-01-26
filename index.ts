import { Operation, Transaction } from '@hiveio/dhive';
import { KeychainKeyTypes } from './interfaces/keychain.interface';

//TODO move to types file
type KeychainOptions = { rpc?: string };

type KeychainRequestResponse = {
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
};

type KeychainRequestError = {
  keychainError: string;
  type: string;
};

// type PromiseOrError = Promise<KeychainRequestResponse | KeychainRequestError>;

//NOTE for testing the SDK for now:
// - There is a reactjs app within the folder: testing/

// type WindowKeychained = Window & typeof globalThis

//TODO move to utils/

const generateRandomString = () => {
  const randomString = Math.random() + 1;
  const dictionary: { [key: string]: string } = {
    '0': 'A',
    '1': 'Keychain-',
    '2': 'x',
    '3': 'E',
    '4': 'S',
    '5': 's',
    '6': 'l',
    '7': '#',
    '8': 'P',
    '9': '&',
    '.': 'SDK Login',
  };
  return randomString
    .toString()
    .split('')
    .map((char) => dictionary[char])
    .join('');
};
//TODO add same params/exit info on each method as hive_keychain.js
export class KeyChain {
  window: Window | undefined;
  options: KeychainOptions | undefined;

  constructor(window: Window, options?: KeychainOptions) {
    this.window = window;
    //TODO: a way to assign 'DEFAULT'
    //  - add keychain.ts, so when detect default, it can bring the defaultRPC
    //      from keychain EP.
    this.options = options;
  }

  //TODO may be good to split each method as:
  //  - utils:
  //    - getConfig()
  //    - isKeyChainInstalled()
  //    - login
  //    - generateRandomString
  //  - crypto:
  //    - encode
  //    - decode
  //    - signBuffer
  //    - signTx
  //  - requests:
  //    - currency requests?
  //    - token requests?
  //testing methods
  getConfig() {
    return {
      window: this.window,
      options: this.options,
    };
  }
  //end testing

  //basic methods.

  //reuse code
  checkKeyChain = async (): Promise<undefined | KeychainRequestError> => {
    const check = await this.isKeyChainInstalled();
    if (check !== true) {
      return Promise.reject({
        keychainError: 'Keychain not installed, please visit: www.www.com',
        type: 'Error_not_installed',
      } as KeychainRequestError);
    }
  };

  requestHiveKeyChain = (args: any) => {
    //TODO how to add window type + added prop['hive_keychain']??
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestBroadcast(...args);
    });
  };

  cbPromise = (
    response: KeychainRequestResponse,
    reject: (reason?: any) => void,
    resolve: (
      value:
        | KeychainRequestError
        | KeychainRequestResponse
        | PromiseLike<KeychainRequestError | KeychainRequestResponse>,
    ) => void,
  ) => {
    if (response.error) {
      reject(response);
    } else {
      resolve(response);
    }
  };
  //end reuse
  /**
   *
   * Note: will check if window object set + keychain extension detected!
   */
  isKeyChainInstalled = async (): Promise<boolean | KeychainRequestError> => {
    if (this.window) {
      ///TODO how to add hive_keychain.js props into this new type?? WindowKeychained
      const window: any = this.window;
      return new Promise(function (resolve, reject) {
        if (window.hive_keychain) {
          try {
            window.hive_keychain.requestHandshake(function () {
              resolve(true);
            });
          } catch (error) {
            reject({
              keychainError:
                'Extension do not respond, please try reloading the extension!',
              type: 'Error_Hanshake',
            });
          }
        } else {
          resolve(false);
        }
      });
    } else {
      return new Promise(function (rejects) {
        rejects({
          keychainError:
            'Windows object not assigned, please follow SDK setup.',
          type: 'Error_Class_setup',
        });
      });
    }
  };
  //TODO refactor reusing
  login = async (
    account: string,
    message: string | undefined,
    key: KeychainKeyTypes,
    rpc?: string,
    title?: string,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    if (await this.isKeyChainInstalled()) {
      const window: any = this.window;
      return new Promise((resolve, reject) => {
        window.hive_keychain.requestSignBuffer(
          account,
          message ? message : generateRandomString(),
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
      });
    } else {
      return Promise.reject({
        keychainError: 'Keychain not installed, please visit: www.www.com',
        type: 'Error_not_installed',
      } as KeychainRequestError);
    }
  };
  //TODO refactor reusing
  requestEncodeMessage = async (
    username: string,
    receiver: string,
    message: string,
    key: KeychainKeyTypes,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    if ((await this.isKeyChainInstalled()) === true) {
      //TODO: validation
      ///TODO how to add hive_keychain.js props into this new type?? WindowKeychained
      const window: any = this.window;
      return new Promise((resolve, reject) => {
        window.hive_keychain.requestEncodeMessage(
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
      });
    } else {
      return Promise.reject({
        keychainError: 'Keychain not installed, please visit: www.www.com',
        type: 'Error_not_installed',
      } as KeychainRequestError);
    }
  };
  //TODO refactor reusing
  requestVerifyKey = async (
    account: string,
    message: string,
    key: KeychainKeyTypes,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    //test data:
    //'memo' "#JnyQbbpLdRBT8ev7SALsNru6c4bftPCf4c6AkTN42YTc52aDvcRqKVqK6yMhRAGhW8fbasR8xz14ofs63WXLP6nxDndKsBMkmg7UsAS9ucTDrKFoZkuJFCyvLmksyCYgD"
    if ((await this.isKeyChainInstalled()) === true) {
      const window: any = this.window;
      return new Promise((resolve, reject) => {
        window.hive_keychain.requestVerifyKey(
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
      });
    } else {
      return Promise.reject({
        keychainError: 'Keychain not installed, please visit: www.www.com',
        type: 'Error_not_installed',
      } as KeychainRequestError);
    }
  };
  //TODO refactor reusing
  requestSignBuffer = async (
    account: string,
    message: string,
    key: KeychainKeyTypes,
    rpc?: string,
    title?: string,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    if ((await this.isKeyChainInstalled()) === true) {
      const window: any = this.window;
      return new Promise((resolve, reject) => {
        window.hive_keychain.requestSignBuffer(
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
      });
    } else {
      return Promise.reject({
        keychainError: 'Keychain not installed, please visit: www.www.com',
        type: 'Error_not_installed',
      } as KeychainRequestError);
    }
  };
  //TODO refactor reusing
  requestAddAccountAuthority = async (
    account: string,
    authorizedUsername: string,
    role: KeychainKeyTypes,
    weight: number,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    if ((await this.isKeyChainInstalled()) === true) {
      const window: any = this.window;
      return new Promise((resolve, reject) => {
        window.hive_keychain.requestAddAccountAuthority(
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
      });
    } else {
      return Promise.reject({
        keychainError: 'Keychain not installed, please visit: www.www.com',
        type: 'Error_not_installed',
      } as KeychainRequestError);
    }
  };
  //TODO refactor reusing
  requestRemoveAccountAuthority = async (
    account: string,
    authorizedUsername: string,
    role: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    if ((await this.isKeyChainInstalled()) === true) {
      const window: any = this.window;
      return new Promise((resolve, reject) => {
        window.hive_keychain.requestRemoveAccountAuthority(
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
      });
    } else {
      return Promise.reject({
        keychainError: 'Keychain not installed, please visit: www.www.com',
        type: 'Error_not_installed',
      } as KeychainRequestError);
    }
  };

  requestAddKeyAuthority = async (
    account: string,
    authorizedKey: string,
    role: KeychainKeyTypes,
    weight: Number,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestAddKeyAuthority(
        account,
        authorizedKey,
        role,
        weight,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestRemoveKeyAuthority = async (
    account: string,
    authorizedKey: string,
    role: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestRemoveKeyAuthority(
        account,
        authorizedKey,
        role,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestBroadcast = async (
    account: string,
    operations: Operation[],
    key: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestBroadcast(
        account,
        operations,
        key,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestSignTx = async (
    account: string,
    tx: Transaction,
    key: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestSignTx(
        account,
        tx,
        key,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestSignedCall = async (
    account: string,
    method: string,
    params: string,
    key: KeychainKeyTypes,
    rpc: string | undefined,
  ): Promise<void> => {
    await this.checkKeyChain();
    return new Promise((resolve, reject) => {
      resolve(console.warn('requestSignedCall has been deprecated.'));
    });
  };

  //TODO
  // it looks like some params have changed??
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
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestPost(
        account,
        title,
        body,
        parent_perm,
        parent_account,
        json_metadata,
        permlink,
        comment_options,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestVote = async (
    account: string,
    permlink: string,
    author: string,
    weight: number,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestVote(
        account,
        permlink,
        author,
        weight,
        (response: KeychainRequestResponse) => {
          this.cbPromise(response, reject, resolve);
        },
        rpc,
      );
    });
  };

  requestCustomJson = async (
    account: string | undefined,
    id: string,
    key: KeychainKeyTypes,
    json: string,
    display_msg: string,
    rpc: string | undefined,
  ): Promise<KeychainRequestResponse | KeychainRequestError> => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestCustomJson(
        account,
        id,
        key,
        json,
        display_msg,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
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
  ) => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestTransfer(
        account,
        to,
        amount,
        memo,
        currency,
        (response: KeychainRequestResponse) => {
          this.cbPromise(response, reject, resolve);
        },
        enforce,
        rpc,
      );
    });
  };

  requestSendToken = async (
    account: string,
    to: string,
    amount: string,
    memo: string,
    currency: string,
    rpc: string | undefined,
  ) => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestSendToken(
        account,
        to,
        amount,
        memo,
        currency,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestDelegation = async (
    username: string | undefined,
    delegatee: string,
    amount: string,
    unit: string = 'HP' || 'VESTS',
    rpc: string | undefined,
  ) => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestDelegation(
        username,
        delegatee,
        amount,
        unit,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestWitnessVote = async (
    username: string | undefined,
    witness: string,
    vote: boolean,
    rpc: string | undefined,
  ) => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestWitnessVote(
        username,
        witness,
        vote,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestProxy = async (
    username: string | undefined,
    proxy: string,
    rpc: string | undefined,
  ) => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestProxy(
        username,
        proxy,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestPowerUp = async (
    username: string,
    recipient: string,
    hive: string,
    rpc: string | undefined,
  ) => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestPowerUp(
        username,
        recipient,
        hive,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };

  requestPowerDown = async (
    username: string,
    hive_power: string,
    rpc: string | undefined,
  ) => {
    await this.checkKeyChain();
    const window: any = this.window;
    return new Promise((resolve, reject) => {
      window.hive_keychain.requestPowerDown(
        username,
        hive_power,
        (response: KeychainRequestResponse) =>
          this.cbPromise(response, reject, resolve),
        rpc,
      );
    });
  };
}

// export default KeyChain ;
