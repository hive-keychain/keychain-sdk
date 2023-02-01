import {
  AccountWitnessProxyOperation,
  AccountWitnessVoteOperation,
  Asset,
  Authority,
  Comment,
  CommentOperation,
  CommentOptionsOperation,
  ConvertOperation,
  CreateClaimedAccountOperation,
  CreateProposalOperation,
  CustomJsonOperation,
  CustomOperation,
  DelegateVestingSharesOperation,
  Operation,
  RecurrentTransferOperation,
  RemoveProposalOperation,
  Transaction,
  TransferOperation,
  TransferToVestingOperation,
  UpdateProposalVotesOperation,
  VoteOperation,
  WithdrawVestingOperation,
  WitnessUpdateOperation,
} from '@hiveio/dhive';
import {
  KeychainKeyTypes,
  RequestCustomJSON,
} from './interfaces/keychain.interface';
import { Keys } from './interfaces/local-account.interface';
import { DelegationUnit } from './reference-data/keychain.enums';
import utils from './utils/utils';

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
  /**
   *
   * Note: Will return actual configuration of windows object.
   */
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

  /**
   * Keychain SDK utils functions.
   * Call this function to perform an easy login function by trying to sign a message.
   * @example
   * try {
   *     const login = await KeyChainSDK.login(
   *       {
   *         account: undefined,
   *         message: undefined,
   *         key: 'posting',
   *       },
   *       {
   *         rpc: undefined,
   *         title: 'Saturnoman.com',
   *       },
   *     );
   *     console.log({ login });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {String | undefined} data.account Hive account to perform the login, if undefined, Keychain extension will show a dropdown to choose an account.
   * @param {String | undefined} data.message Message to sign, if undefined, random message will be generated.
   * @param {KeychainKeyTypes} data.key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String | undefined} options.rpc Override user's RPC settings
   * @param {String | undefined} options.title Title to be shown on popup
   */
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

  /**
   * This function is called to verify that the user has a certain authority over an account, by requesting to decode a message
   * @example
   * try {
   *     const encodeMessage = await KeyChainSDK.requestEncodeMessage(
   *       'keychain.tests',
   *       'theghost1980',
   *       '#Hi there man!',
   *       'memo',
   *     );
   *     console.log({ encodeMessage });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {String} data.username Hive account to perform the request
   * @param {String} data.receiver Account that will decode the string
   * @param {String} data.message Message to be encrypted, i.e: "#To encrypt message"
   * @param {String} data.key Type of key. Can be 'Posting','Active' or 'Memo'
   */
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
   * @example
   *try {
   *     const verifyKey = await KeyChainSDK.requestVerifyKey(
   *       'keychain.tests',
   *       '#JnyQbbpLdRBT8ev7SALsNru6c4bftPCf4c6AkTN42YTc52aDvcRqKVqK6yMhRAGhW8fbasR8xz14ofs63WXLP6nxDndKsBMkmg7UsAS9ucTDrKFoZkuJFCyvLmksyCYgD',
   *       'memo',
   *     );
   *     console.log({ verifyKey });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.message Message to be decoded by the account
   * @param {String} data.key Type of key. Can be 'Posting','Active' or 'Memo'
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
   * @example
   * try {
   *     const signBuffer = await KeyChainSDK.requestSignBuffer(
   *       {
   *         account: undefined,
   *         message: 'message!!',
   *         key: 'active',
   *       },
   *       {
   *         rpc: undefined,
   *         title: 'Login in Into Saturnoman.com\nProceed?',
   *       },
   *     );
   *     console.log({ signBuffer });
   *   } catch (error) {
   *     console.log({ error });
   *   }
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
   * @example
   * try {
   *     const addAccountAuthority = await KeyChainSDK.requestAddAccountAuthority(
   *       {
   *         account: 'keychain.tests',
   *         authorizedUsername: 'sexosentido',
   *         role: 'posting',
   *         weight: 1,
   *       },
   *       {},
   *     );
   *     console.log({ addAccountAuthority });
   *   } catch (error) {
   *     console.log({ error });
   *
   *   }
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
   * @example
   * try {
   *     const removeAccountAuthority =
   *       await KeyChainSDK.requestRemoveAccountAuthority(
   *         {
   *           account: 'keychain.tests',
   *           authorizedUsername: 'sexosentido',
   *           role: 'posting',
   *         },
   *         {},
   *       );
   *     console.log({ removeAccountAuthority });
   *   } catch (error) {
   *     console.log({ error });
   *   }
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
   * @example
   * try {
   *     const addKeyAuthority = await KeyChainSDK.requestAddKeyAuthority(
   *       {
   *         account: 'keychain.tests',
   *         authorizedKey:
   *           'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
   *         role: 'posting',
   *         weight: 1,
   *       },
   *       {},
   *     );
   *     console.log({ addKeyAuthority });
   *   } catch (error) {
   *     console.log({ error });
   *   }
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
   * @example
   *   try {
   *     const removeKeyAuthority = await KeyChainSDK.requestRemoveKeyAuthority(
   *       {
   *         account: 'keychain.tests',
   *         authorizedKey:
   *           'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
   *         role: 'posting',
   *       },
   *       {},
   *     );
   *     console.log({ removeKeyAuthority });
   *   } catch (error) {
   *     console.log({ error });
   *   }
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
   * @example
   * try {
   *     const broadcast = await KeyChainSDK.requestBroadcast(
   *       {
   *         account: 'keychain.tests',
   *         operations: [
   *           [
   *             'transfer',
   *             {
   *               from: 'keychain.tests',
   *               to: 'theghost1980',
   *               amount: '0.001 HIVE',
   *               memo: 'testing keychain SDK - requestBroadcast',
   *             },
   *           ],
   *         ],
   *         key: 'active',
   *       },
   *       {},
   *     );
   *     console.log({ broadcast });
   *   } catch (error) {
   *     console.log({ error });
   *   }
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
   * @example
   *  try {
   *     const signTx = await KeyChainSDK.requestSignTx(
   *       {
   *         account: 'keychain.tests',
   *         tx: {
   *           ref_block_num: 11000,
   *           ref_block_prefix: 112233,
   *           expiration: new Date().toISOString(),
   *           extensions: [],
   *           operations: [
   *             [
   *               'transfer',
   *               {
   *                 from: 'keychain.tests',
   *                 to: 'theghost1980',
   *                 amount: '0.001 HIVE',
   *                 memo: 'testing keychain SDK - requestBroadcast',
   *               },
   *             ],
   *           ],
   *         },
   *         key: 'active',
   *       },
   *       {},
   *     );
   *     console.log({ signTx });
   *   } catch (error) {
   *     console.log({ error });
   *   }
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
   * @example
   * try {
   *     const post = await KeyChainSDK.requestPost(
   *       {
   *         comment: {
   *           parent_author: '',
   *           parent_permlink: 'blog',
   *           author: 'keychain.tests',
   *           permlink: 'a-post-by-keychaintests-second-part-post-lude',
   *           title: 'Keychain SDK 1!',
   *           body: '## This is a blog post n And this is some text. Testing the brand new Keychain SDK v1.0',
   *           json_metadata: JSON.stringify({
   *             format: 'markdown',
   *             description: 'A blog post',
   *             tags: ['Blog'],
   *           }),
   *         },
   *         comment_options: {
   *           author: 'keychain.tests',
   *           permlink: 'a-post-by-keychaintests-second-part-post-lude',
   *           max_accepted_payout: '10000.000 SBD',
   *           allow_votes: true,
   *           allow_curation_rewards: true,
   *           extensions: [],
   *           percent_hbd: 63,
   *         },
   *       },
   *       {},
   *     );
   *     console.log({ post });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {String} data.comment.account Hive account to perform the request
   * @param {String} data.comment.title Title of the blog post
   * @param {String} data.comment.body Content of the blog post
   * @param {String} data.comment.parent_perm Permlink of the parent post. Main tag for a root post
   * @param {String} data.comment.parent_account Author of the parent post. Pass null for root post
   * @param {Object} data.comment.json_metadata Parameters of the call, will be automatically stringyfied.
   * @param {String} data.comment.permlink Permlink of the blog post. Note: must be same as in comment_options if is a HIVE Post.
   * @param {CommentOptionsOperation | undefined} data.comment_options Options attached to the blog post. Consult Hive documentation at <https://developers.hive.io/apidefinitions/#broadcast_ops_comment_options> to learn more about it. Note: Must be the same as data.permlink if is a Post.
   * @param {String} options.rpc Override user's RPC settings
   */
  requestPost = async (
    data: {
      comment: CommentOperation[1];
      comment_options?: CommentOptionsOperation[1];
    },
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestPost(
          data.comment.author,
          data.comment.title,
          data.comment.body,
          data.comment.parent_permlink,
          data.comment.parent_author,
          data.comment.json_metadata,
          data.comment.permlink,
          data.comment_options
            ? JSON.stringify(data.comment_options)
            : undefined,
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
   * Requests a vote
   * @example
   *   try {
   *     const vote = await KeyChainSDK.requestVote(
   *       {
   *         voter: 'keychain.tests',
   *         author: 'missdeli',
   *         permlink: 'family-of-three-some-of-our-food-this-week-week-4',
   *         weight: 10000,
   *       },
   *       {},
   *     );
   *     console.log({ vote });
   *   } catch (error) {
   *     console.log({ error });
   *   }
   * @param {String} data.voter Hive account to perform the request
   * @param {String} data.permlink Permlink of the blog post
   * @param {String} data.author Author of the blog post
   * @param {Number} data.weight Weight of the vote, comprised between -10,000 (-100%) and 10,000 (100%)
   * @param {String} options.rpc Override user's RPC settings
   */
  requestVote = async (
    data: VoteOperation[1],
    options: { rpc?: string },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestVote(
          data.voter,
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
   * Requests a custom JSON broadcast
   * @example
   *    try {
   *     const custom_json = await KeyChainSDK.requestCustomJson(
   *       {
   *         account: undefined,
   *         id: '1',
   *         key: 'Posting',
   *         json: JSON.stringify({
   *           items: ['9292cd44ccaef8b73a607949cc787f1679ede10b-93'],
   *           currency: 'DEC',
   *           days: 1,
   *         }),
   *         display_msg: 'rent a card man!',
   *       },
   *       {},
   *     );
   *     console.log({ custom_json });
   *   } catch (error) {
   *     console.log('error custom_json: ', error);
   *   }
   * @param {String} data.account Hive account to perform the request. If undefined, user can choose the account from a dropdown
   * @param {String} data.id Type of custom_json to be broadcasted
   * @param {String} data.key Type of key. Can be 'Posting','Active' or 'Memo'
   * @param {String} data.json Stringified custom json
   * @param {String} data.display_msg Message to display to explain to the user what this broadcast is about
   * @param {String} options.rpc Override user's RPC settings
   */
  requestCustomJson = async (
    data: CustomJsonOperation[1] & {
      account: string | undefined;
      key: KeychainKeyTypes;
      display_msg: string;
    },
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestCustomJson(
          data.account,
          data.id,
          data.key,
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
   * Requests a transfer
   * @example
   * try {
   *   const transfer = await KeyChainSDK.requestTransfer({
   *         from: 'keychain.tests',
   *         amount: new Asset(10, 'HBD'),
   *         to: 'theghost1980',
   *         memo: 'Test Keychain SDK transfer',
   *       },
   *    {});
   *  console.log({ transfer });
   * } catch (error) {
   *  console.log('error transfer: ', error);
   * }
   *
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.to Hive account to receive the transfer
   * @param {String} data.amount Amount to be transfered. Requires 3 decimals. Can be Asset or string. i.e: '1 HIVE' or new Asset(1, 'HIVE).
   * @param {String} data.memo The memo will be automatically encrypted if starting by '#' and the memo key is available on Keychain. It will also overrule the account to be enforced, regardless of the 'enforce' parameter
   * @param {boolean} options.enforce If set to true, user cannot chose to make the transfer from another account
   * @param {String} options.rpc Override user's RPC settings
   */
  requestTransfer = async (
    data: TransferOperation[1],
    options: {
      enforce: boolean | undefined;
      rpc: string | undefined;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        const amountData = utils.checkAndFormatAmount(data.amount);
        this.window.hive_keychain.requestTransfer(
          data.from,
          data.to,
          amountData.amount,
          data.memo,
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

  /**
   * Requests a token transfer
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.to Hive account to receive the transfer
   * @param {String} data.amount Amount to be transferred. Requires 3 decimals.
   * @param {String} data.memo Memo attached to the transfer
   * @param {String} data.currency Token symbol to be sent
   * @param {String} options.rpc Override user's RPC settings
   */
  requestSendToken = async (
    data: {
      account: string;
      to: string;
      amount: string;
      memo: string;
      currency: string;
    },
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestSendToken(
          data.account,
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
   * Requests a delegation broadcast
   * @param {String} data.delegation.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
   * @param {String} data.delegation.delegatee Account to receive the delegation
   * @param {String} data.delegation.vesting_shares Use when passing vesting_power.(VESTS)
   * @param {String} data.delegation.hp Use when passing hive power.(HP)
   * @param {String} options.rpc Override user's RPC settings
   */
  requestDelegation = async (
    data: {
      delegation: DelegateVestingSharesOperation[1] & {
        vesting_shares?: string;
        hp?: string;
      };
    },
    options: { rpc?: string },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        let unit: DelegationUnit;
        if (data.delegation.vesting_shares) {
          unit = DelegationUnit.VESTS;
        } else if (data.delegation.hp) {
          unit = DelegationUnit.HP;
        } else throw Error('Please define hp or vesting_shares');

        this.window.hive_keychain.requestDelegation(
          data.delegation.delegator,
          data.delegation.delegatee,
          unit === DelegationUnit.HP
            ? data.delegation.hp
            : data.delegation.vesting_shares,
          unit,
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
    data: AccountWitnessVoteOperation[1],
    options: { rpc?: string },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestWitnessVote(
          data.account,
          data.witness,
          data.approve,
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
    data: AccountWitnessProxyOperation[1],
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestProxy(
          data.account,
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
   * Request a power up
   * @param {String} data[1].from Hive account to perform the request
   * @param {String} data[1].to Account to receive the power up
   * @param {String | Asset} data[1].amount Amount of HIVE to be powered up. string or Asset.
   * @param {String} options.rpc Override user's RPC settings
   */
  requestPowerUp = async (
    data: TransferToVestingOperation[1],
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestPowerUp(
          data.from,
          data.to,
          data.amount,
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
   * Request a power down
   * @param {String} data.account Hive account to perform the request
   * @param {String} data.hive_power Amount of HIVE to be powered down
   * @param {String} options.rpc Override user's RPC settings
   */
  requestPowerDown = async (
    data: WithdrawVestingOperation[1] & { hive_power: string },
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestPowerDown(
          data.account,
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
    data: CreateClaimedAccountOperation[1],
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestCreateClaimedAccount(
          data.creator,
          data.new_account_name,
          data.owner,
          data.active,
          data.posting,
          data.memo_key,
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
   * @param {String} data.username Hive account to perform the request
   * @param {String} data.receiver Account receiving the funding if the proposal is voted
   * @param {String} data.subject Title of the DAO
   * @param {String} data.permlink Permlink to the proposal description
   * @param {String} data.daily_pay Daily amount to be received by `receiver`
   * @param {String} data.start Starting date
   * @param {String} data.end Ending date
   * @param {String} data.extensions Stringified Array of extensions
   * @param {String} options.rpc Override user's RPC settings
   */
  requestCreateProposal = async (
    data: CreateProposalOperation[1],
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestCreateProposal(
          data.creator,
          data.receiver,
          data.start_date,
          data.end_date,
          data.daily_pay,
          data.subject,
          data.permlink,
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
   * @param {String} data.username Hive account to perform the request
   * @param {String} data.proposal_ids Stringified Array of ids of the proposals to be removed
   * @param {String} data.extensions Stringified Array of extensions
   * @param {String} options.rpc Override user's RPC settings
   */
  requestRemoveProposal = async (
    data: RemoveProposalOperation[1],
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestRemoveProposal(
          data.proposal_owner,
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
   * Vote/Unvote a DHF proposal
   * @param {String} data.username Hive account to perform the request
   * @param {String} data.proposal_ids Stringified Array of Ids of the proposals to be voted
   * @param {boolean} data.approve Set to true to support the proposal, false to remove a vote
   * @param {String} data.extensions Stringified Array of extensions
   * @param {String} options.rpc Override user's RPC settings
   */
  requestUpdateProposalVote = async (
    data: UpdateProposalVotesOperation[1],
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        this.window.hive_keychain.requestUpdateProposalVote(
          data.voter,
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
   * Add a new account to Keychain
   * @param {String} data.username username of the account to be added
   * @param {Object} data.keys private keys of the account : {active:'...',posting:'...',memo:'...'}. At least one must be specified.
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

  /**
   * Request currency conversion
   * @param {String} data.owner Hive account to perform the request
   * @param {String | Asset} data.amount amount to be converted. Collateralized: '1 HIVE'(will convert to  HBD). Non Collateralized: '1 HBD'(will convert to HIVE).
   * @param {String | undefined} optins.rpc  Override user's RPC settings
   */
  requestConversion = async (
    data: ConvertOperation[1],
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        const amountData = utils.checkAndFormatAmount(data.amount);
        this.window.hive_keychain.requestConversion(
          data.owner,
          amountData.amount,
          amountData.currency === 'HIVE' ? true : false,
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
   * Request recurrent transfer
   * @example
   * try {
   *   const recurrentTransfer = await KeyChainSDK.requestRecurrentTransfer(
   *    {
   *      from: 'keychain.tests',
   *      to: 'theghost1980',
   *      amount: new Asset(0.1, 'HIVE'),
   *      memo: 'Keychain SDK tests rt',
   *      recurrence: 24,
   *      executions: 2,
   *      extensions: [],
   *    },{});
   *   console.log({ recurrentTransfer });
   *    } catch (error) {
   *   console.log('error, recurrentTransfer: ', error);
   * }
   * @param {String| undefined} data.from Hive account to perform the request
   * @param {String} data.to Hive account receiving the transfers.
   * @param {String} data.amount amount to be sent on each execution. Will be automatically formatted to 3 decimals.
   * @param {String} data.currency HIVE or HBD on mainnet.
   * @param {String} data.memo transfer memo
   * @param {Number} data.recurrence How often will the payment be triggered (in hours) - minimum 24.
   * @param {Number} data.executions The times the recurrent payment will be executed - minimum 2.
   * @param {String| undefined} options.rpc Override user's RPC settings
   */
  requestRecurrentTransfer = async (
    data: RecurrentTransferOperation[1],
    options: {
      rpc?: string;
    },
  ): Promise<KeychainRequestResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.isKeyChainInstalled();
        const amountData = utils.checkAndFormatAmount(data.amount);
        this.window.hive_keychain.requestRecurrentTransfer(
          data.from,
          data.to,
          amountData.amount,
          amountData.currency,
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
}
