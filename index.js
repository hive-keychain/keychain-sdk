"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeychainSDK = void 0;
const utils_1 = __importDefault(require("./testing/src/utils/utils"));
class KeychainSDK {
    constructor(window, options) {
        /**
         *
         * Note: will check if window object set + keychain extension detected!
         */
        this.isKeyChainInstalled = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.window.hive_keychain) {
                    try {
                        this.window.hive_keychain.requestHandshake(function () {
                            resolve(true);
                        });
                    }
                    catch (error) {
                        throw error;
                    }
                }
                else {
                    resolve(false);
                }
            });
        });
        //TODO
        this.login = (params, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignBuffer(params.account, params.message ? params.message : utils_1.default.generateRandomString(), params.key, (response) => {
                        if (response.error) {
                            reject(Object.assign(Object.assign({}, response), { success: false, result: (options === null || options === void 0 ? void 0 : options.title)
                                    ? `Cannot login into: ${options === null || options === void 0 ? void 0 : options.title}`
                                    : null }));
                        }
                        else {
                            resolve(Object.assign(Object.assign({}, response), { success: false, result: (options === null || options === void 0 ? void 0 : options.title)
                                    ? `Login successful: ${options === null || options === void 0 ? void 0 : options.title}`
                                    : null }));
                        }
                    }, (_a = options === null || options === void 0 ? void 0 : options.rpc) !== null && _a !== void 0 ? _a : (_b = this.options) === null || _b === void 0 ? void 0 : _b.rpc, options === null || options === void 0 ? void 0 : options.title);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        //////END utils///////
        // /**
        //  * This function is called to verify that the user has a certain authority over an account, by requesting to decode a message
        //  * @param {String} username Hive account to perform the request
        //  * @param {String} receiver Account that will decode the string
        //  * @param {String} message Message to be encrypted, i.e: "#To encrypt message"
        //  * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
        //  */
        this.requestEncodeMessage = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestEncodeMessage(data.username, data.receiver, data.message, data.key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    });
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * This function is called to verify that the user has a certain authority over an account, by requesting to decode a message
         * @param {String} account Hive account to perform the request
         * @param {String} message Message to be decoded by the account
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         */
        this.requestVerifyKey = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestVerifyKey(data.account, data.message, data.key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    });
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        //TODO skipped waiting for structure for this
        /**
         * Requests a message to be signed with proper authority
         * @param {String| undefined} account Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} message Message to be signed by the account
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String| undefined} rpc Override user's RPC settings
         * @param {String | undefined} title Override "Sign message" title
         */
        // requestSignBuffer = async (
        //   params: {
        //     account: string | undefined;
        //     message: string;
        //     key: KeychainKeyTypes;
        //   },
        //   options?: {
        //     rpc?: string;
        //     title?: string;
        //   },
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestSignBuffer(
        //         params.account,
        //         params.message,
        //         params.key,
        //         (response: KeychainRequestResponse) => {
        //           if (response.error) {
        //             reject(response);
        //           } else {
        //             resolve(response);
        //           }
        //         },
        //         options?.rpc ?? this.options?.rpc,
        //         options?.title,
        //       );
        //     } catch (error) {
        //       throw error;
        //     }
        //   });
        // };
        //TODO skipped waiting for structure for this
        /**
         * Requests to add account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} account Hive account to perform the request
         * @param {String} authorizedUsername Authorized account
         * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {number} weight Weight of the authority
         * @param {String | undefined} rpc Override user's RPC settings
         */
        // requestAddAccountAuthority = async (
        //   params: {
        //     account: string;
        //     authorizedUsername: string;
        //     role: KeychainKeyTypes;
        //     weight: number;
        //   },
        //   options?: {
        //     rpc?: string;
        //   },
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestAddAccountAuthority(
        //         params.account,
        //         params.authorizedUsername,
        //         params.role,
        //         params.weight,
        //         (response: KeychainRequestResponse) => {
        //           if (response.error) {
        //             reject(response);
        //           } else {
        //             resolve(response);
        //           }
        //         },
        //         options?.rpc ?? this.options?.rpc,
        //       );
        //     } catch (error) {
        //       throw error;
        //     }
        //   });
        // };
        //TODO skipped waiting for structure for this
        /**
         * Requests to remove an account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} account Hive account to perform the request
         * @param {String} authorizedUsername Account to lose authority
         * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {String |  undefined} rpc Override user's RPC settings
         */
        // requestRemoveAccountAuthority = async (
        //   params: {
        //     account: string;
        //     authorizedUsername: string;
        //     role: KeychainKeyTypes;
        //   },
        //   options?: {
        //     rpc?: string;
        //   },
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestRemoveAccountAuthority(
        //         params.account,
        //         params.authorizedUsername,
        //         params.role,
        //         (response: KeychainRequestResponse) => {
        //           if (response.error) {
        //             reject(response);
        //           } else {
        //             resolve(response);
        //           }
        //         },
        //         options?.rpc ?? this.options?.rpc,
        //       );
        //     } catch (error) {
        //       throw error;
        //     }
        //   });
        // };
        //TODO skipped waiting for structure for this
        /**
         * Requests to add a new key authority to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} account Hive account to perform the request
         * @param {String} authorizedKey New public key to be associated with the account
         * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {number} weight Weight of the key authority
         * @param {String} rpc Override user's RPC settings
         */
        // requestAddKeyAuthority = async (
        //   params: {
        //     account: string;
        //     authorizedKey: string;
        //     role: KeychainKeyTypes;
        //     weight: Number;
        //   },
        //   options?: {
        //     rpc?: string;
        //   },
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestAddKeyAuthority(
        //         params.account,
        //         params.authorizedKey,
        //         params.role,
        //         params.weight,
        //         (response: KeychainRequestResponse) => {
        //           if (response.error) {
        //             reject(response);
        //           } else {
        //             resolve(response);
        //           }
        //         },
        //         options?.rpc ?? this.options?.rpc,
        //       );
        //     } catch (error) {
        //       throw error;
        //     }
        //   });
        // };
        /**
         * Requests to remove a key to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} account Hive account to perform the request
         * @param {String} authorizedKey Key to be removed (public key).
         * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'.
         * @param {String} rpc Override user's RPC settings
         */
        // requestRemoveKeyAuthority = async (
        //   params: {
        //     account: string;
        //     authorizedKey: string;
        //     role: KeychainKeyTypes;
        //   },
        //   options: { rpc?: string },
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestRemoveKeyAuthority(
        //         params.account,
        //         params.authorizedKey,
        //         params.role,
        //         (response: KeychainRequestResponse) => {
        //           if (response.error) {
        //             reject(response);
        //           } else {
        //             resolve(response);
        //           }
        //         },
        //         options?.rpc ?? this.options?.rpc,
        //       );
        //     } catch (error) {
        //       throw error;
        //     }
        //   });
        // };
        /**
         * Generic broadcast request
         * @param {String} account Hive account to perform the request
         * @param {Array} operations Array of operations to be broadcasted
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} rpc Override user's RPC settings
         */
        // requestBroadcast = async (
        //   params: {
        //     account: string;
        //     operations: Operation[];
        //     key: KeychainKeyTypes;
        //   },
        //   options: { rpc?: string },
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestBroadcast(
        //         params.account,
        //         params.operations,
        //         params.key,
        //         (response: KeychainRequestResponse) => {
        //           if (response.error) {
        //             reject(response);
        //           } else {
        //             resolve(response);
        //           }
        //         },
        //         options?.rpc ?? this.options?.rpc,
        //       );
        //     } catch (error) {
        //       throw error;
        //     }
        //   });
        // };
        /**
         * Requests to sign a transaction with a given authority
         * @param {String} account Hive account to perform the request
         * @param {Object} tx Unsigned transaction
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} rpc Override user's RPC settings
         */
        // requestSignTx = async (
        //   params: {
        //     account: string;
        //     tx: Transaction;
        //     key: KeychainKeyTypes;
        //   },
        //   options?: { rpc?: string },
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestSignTx(
        //         params.account,
        //         params.tx,
        //         params.key,
        //         (response: KeychainRequestResponse) => {
        //           if (response.error) {
        //             reject(response);
        //           } else {
        //             resolve(response);
        //           }
        //         },
        //         options?.rpc ?? this.options?.rpc,
        //       );
        //     } catch (error) {
        //       throw error;
        //     }
        //   });
        // };
        /**
         * Requests a signed call
         * @deprecated
         * @param {String} account Hive account to perform the request
         * @param {String} method Method of the call
         * @param {String} params Parameters of the call
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} rpc Override user's RPC settings
         */
        // requestSignedCall = async (
        //   params: {
        //     account: string;
        //     method: string;
        //     params: string;
        //     key: KeychainKeyTypes;
        //   },
        //   options?: { rpc?: string },
        // ): Promise<string> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       resolve('requestSignedCall has been deprecated.');
        //     } catch (error) {
        //       throw error;
        //     }
        //   });
        // };
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
        // requestPost = async (
        //   params: {
        //     account: string;
        //     title: string;
        //     body: string;
        //     parent_perm: string;
        //     parent_account: [] | undefined;
        //     json_metadata: object;
        //     permlink: string;
        //     comment_options: object;
        //   },
        //   options?: {
        //     rpc?: string;
        //   },
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestPost(
        //         params.account,
        //         params.title,
        //         params.body,
        //         params.parent_perm,
        //         params.parent_account,
        //         params.json_metadata,
        //         params.permlink,
        //         params.comment_options,
        //         (response: KeychainRequestResponse) => {
        //           if (response.error) {
        //             reject(response);
        //           } else {
        //             resolve(response);
        //           }
        //         },
        //         options?.rpc ?? this.options?.rpc,
        //       );
        //     } catch (error) {
        //       throw error;
        //     }
        //   });
        // };
        /**
         * @deprecated
         * Requests a vote
         */
        this.requestVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _c, _d;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestVote(data[1].voter, data[1].permlink, data[1].author, data[1].weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_c = options.rpc) !== null && _c !== void 0 ? _c : (_d = this.options) === null || _d === void 0 ? void 0 : _d.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        //TODO skipped waiting for structure for this
        /**
         * Requests a custom JSON broadcast
         * @param {String} account Hive account to perform the request. If null, user can choose the account from a dropdown
         * @param {String} id Type of custom_json to be broadcasted
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} json Stringified custom json
         * @param {String} display_msg Message to display to explain to the user what this broadcast is about
         * @param {String} rpc Override user's RPC settings
         */
        // requestCustomJson = async (
        //   // account: string | undefined,
        //   // id: string,
        //   // key: KeychainKeyTypes,
        //   // json: string,
        //   // display_msg: string,
        //   data: RequestCustomJSON,
        //   options: {
        //     rpc?: string,
        //   }
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestCustomJson(
        //         account: data[1].username,
        //         id,
        //         key,
        //         json,
        //         display_msg,
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
        this.requestTransfer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _e, _f, _g;
                try {
                    yield this.isKeyChainInstalled();
                    const amountData = utils_1.default.checkAndFormatAmount(data[1].amount);
                    this.window.hive_keychain.requestTransfer(data[1].from, data[1].to, amountData.amount, data[1].memo, amountData.currency, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_e = options.enforce) !== null && _e !== void 0 ? _e : false, (_f = options.rpc) !== null && _f !== void 0 ? _f : (_g = this.options) === null || _g === void 0 ? void 0 : _g.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
         * @param {String} username Hive account to perform the request. If null, user can choose the account from a dropdown
         * @param {String} delegatee Account to receive the delegation
         * @param {String} amount Amount to be transfered. Requires 3 decimals for HP, 6 for VESTS.
         * @param {String} unit HP or VESTS
         * @param {String} rpc Override user's RPC settings
         */
        // requestDelegation = async (
        //   data: {
        //     username: string | undefined;
        //     delegatee: string;
        //     amount: string;
        //     unit: 'HP' | 'VESTS';
        //   },
        //   options: { rpc?: string },
        // ): Promise<KeychainRequestResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       await this.isKeyChainInstalled();
        //       this.window.hive_keychain.requestDelegation(
        //         data.username,
        //         data.delegatee,
        //         data.amount,
        //         data.unit,
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
        this.requestWitnessVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _h, _j;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestWitnessVote(data[1].account, data[1].witness, data[1].approve, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_h = options.rpc) !== null && _h !== void 0 ? _h : (_j = this.options) === null || _j === void 0 ? void 0 : _j.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Select an account as proxy
         * @param {String | undefined } account Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} proxy Account to become the proxy. Empty string ('') to remove a proxy
         * @param {String | undefined} rpc Override user's RPC settings
         */
        this.requestProxy = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _k, _l;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestProxy(data[1].account, data[1].proxy, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_k = options.rpc) !== null && _k !== void 0 ? _k : (_l = this.options) === null || _l === void 0 ? void 0 : _l.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
        this.requestCreateClaimedAccount = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _m, _o;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateClaimedAccount(data[1].creator, data[1].new_account_name, data[1].owner, data[1].active, data[1].posting, data[1].memo_key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_m = options.rpc) !== null && _m !== void 0 ? _m : (_o = this.options) === null || _o === void 0 ? void 0 : _o.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
        this.requestCreateProposal = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _p, _q;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateProposal(data[1].creator, data[1].receiver, data[1].start_date, data[1].end_date, data[1].daily_pay, data[1].subject, data[1].permlink, data[1].extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_p = options.rpc) !== null && _p !== void 0 ? _p : (_q = this.options) === null || _q === void 0 ? void 0 : _q.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Request the removal of a DHF proposal
         * @param {String} username Hive account to perform the request
         * @param {String} proposal_ids Stringified Array of ids of the proposals to be removed
         * @param {String} extensions Stringified Array of extensions
         * @param {String} [rpc=null] Override user's RPC settings
         */
        this.requestRemoveProposal = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _r, _s;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveProposal(data[1].proposal_owner, data[1].proposal_ids, data[1].extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_r = options.rpc) !== null && _r !== void 0 ? _r : (_s = this.options) === null || _s === void 0 ? void 0 : _s.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Vote/Unvote a DHF proposal
         * @param {String} username Hive account to perform the request
         * @param {String} proposal_ids Stringified Array of Ids of the proposals to be voted
         * @param {boolean} approve Set to true to support the proposal, false to remove a vote
         * @param {String} extensions Stringified Array of extensions
         * @param {String} [rpc=null] Override user's RPC settings
         */
        this.requestUpdateProposalVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _t, _u;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestUpdateProposalVote(data[1].voter, data[1].proposal_ids, data[1].approve, data[1].extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_t = options.rpc) !== null && _t !== void 0 ? _t : (_u = this.options) === null || _u === void 0 ? void 0 : _u.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Add a new account to Keychain
         * @param {String} username username of the account to be added
         * @param {Object} keys private keys of the account : {active:'...',posting:'...',memo:'...'}. At least one must be specified.
         */
        this.requestAddAccount = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddAccount(data.username, data.keys, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    });
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
         * @param {String| undefined} username Hive account to perform the request
         * @param {String} to Hive account receiving the transfers.
         * @param {String} amount amount to be sent on each execution.
         * @param {String} currency HIVE or HBD on mainnet.
         * @param {String} memo transfer memo
         * @param {Number} recurrence How often will the payment be triggered (in hours) - minimum 24.
         * @param {Number} executions The times the recurrent payment will be executed - minimum 2.
         * @param {String| undefined} rpc Override user's RPC settings
         */
        this.requestRecurrentTransfer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _v, _w;
                try {
                    yield this.isKeyChainInstalled();
                    const amountData = utils_1.default.checkAndFormatAmount(data[1].amount);
                    this.window.hive_keychain.requestRecurrentTransfer(data[1].from, data[1].to, amountData.amount, amountData.currency, data[1].memo, data[1].recurrence, data[1].executions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_v = options.rpc) !== null && _v !== void 0 ? _v : (_w = this.options) === null || _w === void 0 ? void 0 : _w.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
}
exports.KeychainSDK = KeychainSDK;
