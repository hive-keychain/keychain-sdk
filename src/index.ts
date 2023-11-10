import { Client } from '@hiveio/dhive';
import { ExcludeCommonParams, IStep } from 'hive-keychain-commons';
import { RequestSignedCall } from 'hive-keychain-commons/lib/interfaces/keychain';
import { v4 as uuidv4 } from 'uuid';
import {
  AddAccount,
  AddAccountAuthority,
  AddKeyAuthority,
  Broadcast,
  Convert,
  CreateClaimedAccount,
  CreateProposal,
  Custom,
  Decode,
  Delegation,
  Encode,
  EncodeWithKeys,
  Login,
  Post,
  PowerDown,
  PowerUp,
  Proxy,
  RecurrentTransfer,
  RemoveAccountAuthority,
  RemoveKeyAuthority,
  RemoveProposal,
  SendToken,
  SignBuffer,
  SignTx,
  Swap,
  Transfer,
  UpdateProposalVote,
  Vote,
  WitnessVote,
} from './interfaces/keychain-sdk.interface';
import {
  KeychainOptions,
  KeychainRequestResponse,
  KeychainSignTxRequestResponse,
} from './interfaces/keychain.interface';
import { getLoginError } from './utils/login';
import { SwapConf, SwapConfig, getConfig, getServerStatus } from './utils/swap';
const Dhive = require('@hiveio/dhive');

const client = new Client([
  'https://api.hive.blog',
  'https://api.openhive.network',
  'https://api.deathwing.me',
]);

/**
 * @description
 * KeychainSDK Class.
 * Contains utils methods & easy Keychain requests to perform operations/requests on HIVE network.
 * @example
 * //To create and use in a file.
 * import { KeychainSDK } from "keychain-sdk";
 *
 * const keychain = new KeychainSDK(window);
 * //After instantiated, is ready to use, for example in a login request
 *   try {
 *     const login = await keychain.login(
 *       {
 *         username: 'keychain.tests',
 *         message: '{"login":"123"}',
 *         method: 'posting',
 *         title: 'LOGIN',
 *       },
 *       {},
 *     );
 *     console.log({ login });
 *   } catch (error) {
 *     console.log({ error });
 *   }
 * @see KeychainSDK.login function documentation for details of this member method.
 * @export KeychainSDK class
 * @class KeychainSDK
 */
export class KeychainSDK {
  window: Window;
  options?: KeychainOptions;

  constructor(window: Window, options?: KeychainOptions) {
    this.window = window;
    this.options = options;
  }

  //////utils////////
  /**
   * @description
   * Keychain SDK utils functions.
   * Will return actual configuration of windows object + rpc options.
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const configObject = await keychain.getConfig();
   *     console.log({ configObject });
   *   } catch (error) {
   *     console.log({ configObject });
   *   }
   * @returns Object as {window,options}
   * @memberof KeychainSDK
   */
  getConfig() {
    return {
      window: this.window,
      options: this.options,
    };
  }

  /**
   * @description
   * Keychain SDK utils functions.
   * Will check if window object set & keychain extension installed/detected
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const installed = await keychain.isKeychainInstalled();
   *     console.log({ installed });
   *   } catch (error) {
   *     console.log({ installed });
   *   }
   * @memberof KeychainSDK
   * @returns Promise, true if installed/detected
   */
  isKeychainInstalled = async (): Promise<boolean> => {
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

  /**
   * @description
   * Keychain SDK utils functions.
   * Call this function to perform an easy login function doing a full signing/verification process.
   * @example
   * // Under the hood, this login request is:
   * // 1. Signing the message/buffer.
   * // 2. Checking if publicKey belongs to that user.
   * // 3. Verifying the signature.
   * // Note: Check the login method bellow to see the whole code process.
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const login = await keychain.login(
   *       {
   *         username: 'keychain.tests',
   *         message: '{"login":"123"}',
   *         method: 'posting',
   *         title: 'LOGIN',
   *       },
   *     );
   *     console.log({ login });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   *
   * @param {Login} data
   * @memberof KeychainSDK
   * @returns Promise<any>
   */
  login = async (data: Login): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestSignBuffer(
          data.username,
          data.message ?? uuidv4(),
          data.method,
          async (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              const accounts = (
                await client.keys.getKeyReferences([response.publicKey!])
              )?.accounts;
              if (accounts?.[0]?.includes(data.username!)) {
                const signature = Dhive.Signature.fromString(response.result);
                const key = Dhive.PublicKey.fromString(response.publicKey);
                const result = key.verify(
                  Dhive.cryptoUtils.sha256(response.data.message),
                  signature,
                );
                if (result) {
                  resolve(response);
                } else
                  reject(
                    getLoginError(
                      response,
                      'The signature could not be verified',
                    ),
                  );
              } else
                reject(
                  getLoginError(
                    response,
                    'The signature could not be verified',
                  ),
                );
            }
          },
          undefined,
          data.title,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  //////END utils///////

  /**
   * @description
   * This function is called to encode a message, using certain key
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const encodeMessage = await keychain.encode({
   *       username: 'keychain.tests',
   *       receiver: 'keychain.tests',
   *       message: '#Message to encode, # is required to encrypt',
   *       method: 'Memo',
   *     });
   *     console.log({ encodeMessage });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {Encode} data
   * @memberof KeychainSDK
   */
  encode = async (data: Encode): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestEncodeMessage(
          data.username,
          data.receiver,
          data.message,
          data.method,
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
   * This function is called to allow encoding a message with multiple receivers. This is used in the case of multisig
   *
   * @param {String} username Hive account to perform the request
   * @param {Array<String>} publicKeys Key that can decode the string
   * @param {String} message Message to be encrypted
   * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
   *
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const encodeMessages = await keychain.encodeWithKeys({
   *       username: 'keychain.tests',
   *       publicKeys: ['SMT1...', 'STM2...'],
   *       message: '#Message to encode, # is required to encrypt',
   *       method: 'Memo',
   *     });
   *     console.log({ encodeMessage });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {EncodeWithKeys} data
   * @memberof KeychainSDK
   */
  encodeWithKeys = async (
    data: EncodeWithKeys,
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestEncodeWithKeys(
          data.username,
          data.publicKeys,
          data.message,
          data.method,
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
   * @description
   * This function is called to verify that the user has a certain authority over an account, by requesting to decode a message
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const verifyKey = await keychain.decode({
   *       username: 'keychain.tests',
   *       message:
   *         '#JnyQbbpLdRBT8ev7SALsNru6c4bftPCf4c6AkTN42YTc52aDvcRqKVqK6yMhRAGhW8fbasR8xz14ofs63WXLP6nxDndKsBMkmg7UsAS9ucTDrKFoZkuJFCyvLmksyCYgD',
   *       method: 'memo',
   *     });
   *     console.log({ verifyKey });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {Decode} data
   * @memberof KeychainSDK
   */
  decode = async (data: Decode): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestVerifyKey(
          data.username,
          data.message,
          data.method,
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
   * @description
   * Requests a message to be signed with proper authority
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const signBuffer = await keychain.signBuffer(
   *       {
   *         username: 'keychain.tests',
   *         message: 'message!!',
   *         method: 'Active',
   *         title: 'Login in Into Saturnoman.com\nProceed?',
   *       },
   *     );
   *     console.log({ signBuffer });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {SignBuffer} data
   * @memberof KeychainSDK
   */
  signBuffer = async (data: SignBuffer): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestSignBuffer(
          data.username,
          data.message,
          data.method,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          undefined,
          data.title,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * @description
   * Requests to add account authority over another account. For more information about multisig
   * @see Website read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const addAccountAuthority = await keychain.addAccountAuthority(
   *       {
   *         username: 'keychain.tests',
   *         authorizedUsername: 'keychain.tests',
   *         role: 'posting',
   *         weight: 1,
   *       },
   *     );
   *     console.log({ addAccountAuthority });
   *   } catch (error) {
   *     console.log({ error });
   *
   *   }
   * @param {AddAccountAuthority} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  addAccountAuthority = async (
    data: AddAccountAuthority,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestAddAccountAuthority(
          data.username,
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
   * @description
   * Requests to remove an account authority over another account.
   * @see Website For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const removeAccountAuthority =
   *       await keychain.removeAccountAuthority(
   *         {
   *           username: 'keychain.tests',
   *           authorizedUsername: 'keychain.tests',
   *           role: 'posting',
   *         },
   *       );
   *     console.log({ removeAccountAuthority });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {RemoveAccountAuthority} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  removeAccountAuthority = async (
    data: RemoveAccountAuthority,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestRemoveAccountAuthority(
          data.username,
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
   * @description
   * Requests to add a new key authority to an account.
   * @see Website For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const addKeyAuthority = await keychain.addKeyAuthority(
   *       {
   *         username: 'keychain.tests',
   *         authorizedKey:
   *           'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
   *         role: 'posting',
   *         weight: 1,
   *       },
   *     );
   *     console.log({ addKeyAuthority });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {AddKeyAuthority} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  addKeyAuthority = async (
    data: AddKeyAuthority,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestAddKeyAuthority(
          data.username,
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
   * @description
   * Requests to remove a key to an account.
   * @see Website For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *   try {
   *     const removeKeyAuthority = await keychain.removeKeyAuthority(
   *       {
   *         username: 'keychain.tests',
   *         authorizedKey:
   *           'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
   *         role: 'posting',
   *       },
   *     );
   *     console.log({ removeKeyAuthority });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {RemoveKeyAuthority} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  removeKeyAuthority = async (
    data: RemoveKeyAuthority,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestRemoveKeyAuthority(
          data.username,
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
   * @description
   * Generic broadcast request
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const broadcast = await keychain.broadcast(
   *       {
   *         username: 'keychain.tests',
   *         operations: [
   *           [
   *             'transfer',
   *             {
   *               from: 'keychain.tests',
   *               to: 'keychain.tests',
   *               amount: '0.001 HIVE',
   *               memo: 'testing keychain SDK - requestBroadcast',
   *             },
   *           ],
   *         ],
   *         method: 'active',
   *       },
   *     );
   *     console.log({ broadcast });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {Broadcast} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  broadcast = async (
    data: Broadcast,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestBroadcast(
          data.username,
          typeof data.operations === 'string'
            ? JSON.parse(data.operations)
            : data.operations,
          data.method,
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
   * @description
   * Requests to sign a transaction with a given authority
   * @example
   * import dhive from '@hiveio/dhive';
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * const client = new dhive.Client(['https://api.hive.blog', 'https://api.openhive.network']);
   * const props = await client.database.getDynamicGlobalProperties();
   * const headBlockNumber = props.head_block_number;
   * const headBlockId = props.head_block_id;
   * const expireTime = 600000;
   * const op = {
   *  ref_block_num: headBlockNumber & 0xffff,
   *  ref_block_prefix: Buffer.from(headBlockId, 'hex').readUInt32LE(4),
   *  expiration: new Date(Date.now() + 600000).toISOString().slice(0, -5),
   *  operations: [
        [
          "transfer",
          {
            "from": "keychain.tests",
            "to": "keychain.tests",
            "amount": "0.001 HIVE",
            "memo": "Keychain SDK - requestSignTx & broadcast"
          }
        ]
      ]
   * };
   *  try {
   *     const signTx = await keychain.signTx(
   *       {
   *         username: 'keychain.tests',
   *         tx: op,
   *         method: 'Posting',
   *       }
   *     );
   *     console.log({ signTx });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {SignTx} data
   * @memberof KeychainSDK
   */
  signTx = async (data: SignTx): Promise<KeychainSignTxRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestSignTx(
          data.username,
          data.tx,
          data.method,
          (response: KeychainSignTxRequestResponse) => {
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
   * @description
   * Requests a signed call
   * @deprecated
   * @param {ExcludeCommonParams<RequestSignedCall>} data
   * @param {KeychainOptions} options
   * @memberof KeychainSDK
   */
  signedCall = async (
    data: ExcludeCommonParams<RequestSignedCall>,
    options: KeychainOptions,
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        resolve('requestSignedCall has been deprecated.');
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * @description
   * Requests to broadcast a blog post/comment
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *     const post = await keychain.post(
   *       {
   *         username: 'keychain.tests',
   *         title: 'Keychain SDK 2!',
   *         body: '## This is a blog post n And this is some text. Testing the brand new Keychain SDK v1.0',
   *         parent_perm: 'blog',
   *         parent_username: '',
   *         json_metadata: JSON.stringify({
   *           format: 'markdown',
   *           description: 'A blog post',
   *           tags: ['Blog'],
   *         }),
   *         permlink: 'a-post-by-keychaintests-fourth-part-post',
   *         comment_options: JSON.stringify({
   *           author: 'keychain.tests',
   *           permlink: 'a-post-by-keychaintests-fourth-part-post',
   *           max_accepted_payout: '10000.000 SBD',
   *           allow_votes: true,
   *           allow_curation_rewards: true,
   *           extensions: [],
   *           percent_hbd: 63,
   *         }),
   *       },
   *     );
   *     console.log({ post });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @see Website Consult Hive documentation at <https://developers.hive.io/apidefinitions/#broadcast_ops_comment_options> to learn more about comment_options
   * @param {Post} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  post = async (
    data: Post,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestPost(
          data.username,
          data.title,
          data.body,
          data.parent_perm,
          data.parent_username,
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
   * @description
   * Requests a vote
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *   try {
   *     const vote = await keychain.vote(
   *       {
   *         username: 'keychain.tests',
   *         author: 'keychain.tests',
   *         permlink: 'a-post-by-keychaintests-fifth-part-post',
   *         weight: 10000,
   *       },
   *     );
   *     console.log({ vote });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {Vote} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  vote = async (
    data: Vote,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestVote(
          data.username,
          data.permlink,
          data.author,
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
   * @description
   * Requests a custom JSON broadcast
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *    try {
   *     const custom_json = await keychain.custom(
   *       {
   *         username: 'keychain.tests',
   *         id: '1',
   *         method: 'Posting',
   *         json: JSON.stringify({
   *           items: ['9292cd44ccaef8b73a607949cc787f1679ede10b-93'],
   *           currency: 'DEC',
   *           days: 1,
   *         }),
   *         display_msg: 'rent a card man!',
   *       },
   *     );
   *     console.log({ custom_json });
   *   } catch (error) {
   *     console.log('error custom_json: ', error);
   *   }
   * @param {Custom} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  custom = async (
    data: Custom,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestCustomJson(
          data.username,
          data.id,
          data.method,
          data.json,
          data.display_msg,
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
   * @description
   * Requests a transfer
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *   const transfer = await keychain.transfer(
   *       {
   *          username: 'keychain.tests',
   *          to: 'keychain.tests',
   *          amount: '1.000',
   *          memo: 'Test Keychain SDK transfer',
   *          enforce: false,
   *          currency: 'HIVE',
   *       }
   *   );
   *  console.log({ transfer });
   * } catch (error) {
   *  console.log('error transfer: ', error);
   * }
   * @param {Transfer} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  transfer = async (
    data: Transfer,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestTransfer(
          data.username,
          data.to,
          data.amount,
          data.memo,
          data.currency,
          (response: KeychainRequestResponse) => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          },
          data.enforce,
          options.rpc ? options.rpc : this.options?.rpc,
        );
      } catch (error) {
        throw error;
      }
    });
  };

  /**
   * @description
   * Requests a token transfer
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *   try {
   *     const sendToken = await keychain.sendToken(
   *       {
   *         username: 'keychain.tests',
   *         to: 'keychain.tests',
   *         amount: '0.001',
   *         memo: 'frescos',
   *         currency: 'LEO',
   *       },
   *     );
   *     console.log({ sendToken });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {SendToken} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  sendToken = async (
    data: SendToken,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestSendToken(
          data.username,
          data.to,
          data.amount,
          data.memo,
          data.currency,
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
   * @description
   * Requests a delegation broadcast
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *   try {
   *     const delegation = await keychain.delegation(
   *       {
   *         username: 'keychain.tests',
   *         delegatee: 'keychain.tests',
   *         amount: '1.000',
   *         unit: 'HP',
   *       },
   *     );
   *     console.log({ delegation });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {Delegation} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  delegation = async (
    data: Delegation,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestDelegation(
          data.username,
          data.delegatee,
          data.amount,
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
   * @description
   * Requests a witness vote
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *  try {
   *     const witnessVote = await keychain.witnessVote(
   *       {
   *         username: 'keychain.tests',
   *         witness: 'keychain',
   *         vote: true,
   *       },
   *     );
   *     console.log({ witnessVote });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {WitnessVote} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  witnessVote = async (
    data: WitnessVote,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestWitnessVote(
          data.username,
          data.witness,
          data.vote,
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
   * @description
   * Select an account as proxy
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *  try {
   *     const proxy = await keychain.proxy(
   *       {
   *         username: 'keychain.tests',
   *         proxy: 'keychain',
   *       },
   *     );
   *     console.log({ proxy });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {Proxy} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  proxy = async (
    data: Proxy,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestProxy(
          data.username,
          data.proxy,
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
   * @description
   * Request a power up
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *  try {
   *     const powerUp = await keychain.powerUp(
   *       {
   *         username: 'keychain.tests',
   *         recipient: 'keychain.tests',
   *         hive: '0.001',
   *       },
   *     );
   *     console.log({ powerUp });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {PowerUp} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  powerUp = async (
    data: PowerUp,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestPowerUp(
          data.username,
          data.recipient,
          data.hive,
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
   * @description
   * Request a power down
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *  try {
   *     const powerDown = await keychain.powerDown(
   *       {
   *         username: 'keychain.tests',
   *         hive_power: '0.001',
   *       },
   *     );
   *     console.log({ powerDown });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {PowerDown} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  powerDown = async (
    data: PowerDown,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestPowerDown(
          data.username,
          data.hive_power,
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
   * @description
   * Request the creation of an account using claimed tokens
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   * // Note: as an example the same Authority object is being used, to real test, use real data that apply.
   * const DEFAULT_AUTHORITY = {
   *   weight_threshold: 1,
   *   account_auths: [],
   *   key_auths: [["STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF", 1]],
   * } as Authority;
   *  const createclaimedaccount = await keychain.createClaimedAccount(
   *    {
   *     "username": "keychain.tests",
   *     "new_account": "keychain.tests",
   *     "owner": JSON.stringify(DEFAULT_AUTHORITY),
   *     "active": JSON.stringify(DEFAULT_AUTHORITY),
   *     "posting": JSON.stringify(DEFAULT_AUTHORITY),
   *     "memo": "STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF"
   *     },
   * );
   *  console.log({ createclaimedaccount });
   * } catch (error) {
   *  console.log({ error });
   * }
   * @param {CreateClaimedAccount} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  createClaimedAccount = async (
    data: CreateClaimedAccount,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestCreateClaimedAccount(
          data.username,
          data.new_account,
          data.owner,
          data.active,
          data.posting,
          data.memo,
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
   * @description
   * Request the creation of a DHF proposal
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *   const createProposal = await keychain.createProposal(
   *     {
   *       username: "keychain.tests",
   *       receiver: "keychain.tests",
   *       subject: "The New proposal title",
   *       permlink: "proposal-keychain-dev-permlink",
   *       start: "2023-02-25T00:00:00",
   *       end: "2024-02-25T00:00:00",
   *       daily_pay: "390.000 HBD",
   *       extensions: "[]",
   *     },
   *   );
   *   console.log({ createProposal });
   * } catch (error) {
   *   console.log({ error });
   * }
   * @param {CreateProposal} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  createProposal = async (
    data: CreateProposal,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestCreateProposal(
          data.username,
          data.receiver,
          data.subject,
          data.permlink,
          data.daily_pay,
          data.start,
          data.end,
          data.extensions,
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
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *   const removeproposal = await keychain.removeProposal(
   *     {
   *       username: "keychain.tests",
   *       proposal_ids: "[1,2,3]",
   *       extensions: "[]",
   *     },
   *   );
   *   console.log({ removeproposal });
   * } catch (error) {
   *   console.log({ error });
   * }
   * @param {RemoveProposal} data
   * @param {KeychainOptions=} options
   */
  removeProposal = async (
    data: RemoveProposal,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestRemoveProposal(
          data.username,
          data.proposal_ids,
          data.extensions,
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
   * @description
   * Vote/Unvote a DHF proposal
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   * try {
   *   const updateproposalvote = await keychain.updateProposalVote(
   *     {
   *       username: "keychain.tests",
   *       proposal_ids: "[1,2,3]",
   *       approve: false,
   *       extensions: "[]",
   *     },
   *   );
   *   console.log({ updateproposalvote });
   * } catch (error) {
   *   console.log({ error });
   * }
   * @param {UpdateProposalVote} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  updateProposalVote = async (
    data: UpdateProposalVote,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestUpdateProposalVote(
          data.username,
          data.proposal_ids,
          data.approve,
          data.extensions,
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
   * @description
   * Add a new account to Keychain
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *  try {
   *     const addAccount = await keychain.addAccount(
   *       {
   *         username: 'keychain.tests',
   *         keys: {
   *           active: '5d...',
   *           posting: '5fg...',
   *           memo: '5rfD...',
   *         },
   *       },
   *     );
   *     console.log({ addAccount });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {AddAccount} data
   * @memberof KeychainSDK
   */
  addAccount = async (data: AddAccount): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
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

  /**
   * @description
   * Request currency conversion
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *  try {
   *     const conversionCollateralized = await keychain.convert(
   *       {
   *         username: 'keychain.tests',
   *         amount: '1.000',
   *         collaterized: true,
   *       },
   *     );
   *     console.log({ conversionCollateralized });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {Convert} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  convert = async (
    data: Convert,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestConversion(
          data.username,
          data.amount,
          data.collaterized,
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
   * @description
   * Request recurrent transfer
   * @example
   * import { KeychainSDK } from "keychain-sdk";
   * const keychain = new KeychainSDK(window);
   *  try {
   *     const recurrentTransfer = await keychain.recurrentTransfer(
   *       {
   *         username: 'keychain.tests',
   *         to: 'keychain.tests',
   *         amount: '1.000',
   *         currency: 'HIVE',
   *         memo: 'Keychain SDK tests rt',
   *         recurrence: 24,
   *         executions: 2,
   *         extensions: [],
   *       },
   *     );
   *     console.log({ recurrentTransfer });
   *   } catch (error) {
   *     console.log({ error});
   *   }
   * @param {RecurrentTransfer} data
   * @param {KeychainOptions=} options
   * @memberof KeychainSDK
   */
  recurrentTransfer = async (
    data: RecurrentTransfer,
    options: KeychainOptions = {},
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeychainInstalled();
        this.window.hive_keychain.requestRecurrentTransfer(
          data.username,
          data.to,
          data.amount,
          data.currency,
          data.memo,
          data.recurrence,
          data.executions,
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

  swap = {
    /**
     * @description
     * Request a swap estimation
     * @example
     * import { KeychainSDK } from "keychain-sdk";
     * const keychain = new KeychainSDK(window);
     *  try {
     *     const steps = await keychain.swaps.getEstimation(
     *       {
     *         username: 'keychain.tests',
     *         to: 'keychain.tests',
     *         amount: '1.000',
     *         currency: 'HIVE',
     *         memo: 'Keychain SDK tests rt',
     *         recurrence: 24,
     *         executions: 2,
     *         extensions: [],
     *       },
     *     );
     *     console.log({ recurrentTransfer });
     *   } catch (error) {
     *     console.log({ error});
     *   }
     * @param {RecurrentTransfer} data
     * @param {KeychainOptions=} options
     * @memberof KeychainSDK
     */
    getEstimation: async (
      amount: number,
      startToken: string,
      endToken: string,
      swapConfig: SwapConfig,
    ) => {
      const req = await (
        await fetch(
          `${SwapConf.baseURL}/token-swap/estimate/${startToken}/${endToken}/${
            amount + ''
          }`,
        )
      ).json();
      if (req.error) throw new Error(req.error.message);

      const steps: IStep[] = req.result;
      const estimationBeforeFee = steps[steps.length - 1].estimate;
      const feePct = swapConfig.fee.amount;

      return {
        steps,
        feePct,
        estimationBeforeFee,
        estimationAfterFee: estimationBeforeFee * (1 - feePct / 100),
      };
    },
    getConfig: getConfig,
    getServerStatus: getServerStatus,
    start: async (data: Swap, options: KeychainOptions = {}) => {
      return new Promise(async (resolve, reject) => {
        try {
          await this.isKeychainInstalled();
          this.window.hive_keychain.requestSwap(
            data.username,
            data.startToken,
            data.endToken,
            data.amount,
            data.slippage,
            data.steps,
            (response: KeychainRequestResponse) => {
              if (response.error) {
                reject(response);
              } else {
                resolve(response);
              }
            },
            options.rpc,
          );
        } catch (error) {
          throw error;
        }
      });
    },
  };
}
export * from './interfaces/keychain-sdk.interface';
export * from './interfaces/keychain.interface';
