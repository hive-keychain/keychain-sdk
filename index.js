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
const keychain_enums_1 = require("./reference-data/keychain.enums");
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
        this.login = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignBuffer(data.account, (_a = data.message) !== null && _a !== void 0 ? _a : utils_1.default.generateRandomString(), data.key, (response) => {
                        if (response.error) {
                            reject(Object.assign(Object.assign({}, response), { success: false, result: options.title
                                    ? `Cannot login into: ${options.title}`
                                    : null }));
                        }
                        else {
                            resolve(Object.assign(Object.assign({}, response), { success: true, result: options.title
                                    ? `Login successful: ${options.title}`
                                    : null }));
                        }
                    }, (_b = options.rpc) !== null && _b !== void 0 ? _b : (_c = this.options) === null || _c === void 0 ? void 0 : _c.rpc, options.title);
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
        /**
         * Requests a message to be signed with proper authority
         * @param {String| undefined} account Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} message Message to be signed by the account
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String| undefined} rpc Override user's RPC settings
         * @param {String | undefined} title Override "Sign message" title
         */
        this.requestSignBuffer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _d, _e;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignBuffer(data.account, data.message, data.key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_d = options.rpc) !== null && _d !== void 0 ? _d : (_e = this.options) === null || _e === void 0 ? void 0 : _e.rpc, options.title);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests to add account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} data.account Hive account to perform the request
         * @param {String} data.authorizedUsername Authorized account
         * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {number} data.weight Weight of the authority
         * @param {String | undefined} options.rpc Override user's RPC settings
         */
        this.requestAddAccountAuthority = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _f, _g;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddAccountAuthority(data.account, data.authorizedUsername, data.role, data.weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_f = options.rpc) !== null && _f !== void 0 ? _f : (_g = this.options) === null || _g === void 0 ? void 0 : _g.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests to remove an account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} data.account Hive account to perform the request
         * @param {String} data.authorizedUsername Account to lose authority
         * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {String |  undefined} options.rpc Override user's RPC settings
         */
        this.requestRemoveAccountAuthority = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _h, _j;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveAccountAuthority(data.account, data.authorizedUsername, data.role, (response) => {
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
         * Requests to add a new key authority to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} data.account Hive account to perform the request
         * @param {String} data.authorizedKey New public key to be associated with the account
         * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {number} data.weight Weight of the key authority
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestAddKeyAuthority = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _k, _l;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddKeyAuthority(data.account, data.authorizedKey, data.role, data.weight, (response) => {
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
        /**
         * Requests to remove a key to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} data.account Hive account to perform the request
         * @param {String} data.authorizedKey Key to be removed (public key).
         * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'.
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestRemoveKeyAuthority = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _m, _o;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveKeyAuthority(data.account, data.authorizedKey, data.role, (response) => {
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
        /**
         * Generic broadcast request
         * @param {String} data.account Hive account to perform the request
         * @param {Array} data.operations Array of operations to be broadcasted
         * @param {String} data.key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestBroadcast = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _p, _q;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestBroadcast(data.account, data.operations, data.key, (response) => {
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
         * Requests to sign a transaction with a given authority
         * @param {String} data.account Hive account to perform the request
         * @param {Object} data.tx Unsigned transaction
         * @param {String} data.key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestSignTx = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _r, _s;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignTx(data.account, data.tx, data.key, (response) => {
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
         * Requests a signed call
         * @deprecated
         * @param {String} data.account Hive account to perform the request
         * @param {String} data.method Method of the call
         * @param {String} data.params Parameters of the call
         * @param {String} data.key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestSignedCall = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    resolve('requestSignedCall has been deprecated.');
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
        this.requestPost = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _t, _u;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPost(data.account, data.title, data.body, data.parent_perm, data.parent_account, data.json_metadata, data.permlink, data.comment_options, (response) => {
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
         * @deprecated
         * Requests a vote
         */
        this.requestVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _v, _w;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestVote(data[1].voter, data[1].permlink, data[1].author, data[1].weight, (response) => {
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
        /**
         * Requests a custom JSON broadcast
         * @param {String} data[1].account Hive account to perform the request. If null, user can choose the account from a dropdown
         * @param {String} data[1].id Type of custom_json to be broadcasted
         * @param {String} data[1].key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} data[1].json Stringified custom json
         * @param {String} data[1].display_msg Message to display to explain to the user what this broadcast is about
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestCustomJson = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _x, _y;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCustomJson(data[1].account, data[1].id, data[1].key, data[1].json, data[1].display_msg, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_x = options.rpc) !== null && _x !== void 0 ? _x : (_y = this.options) === null || _y === void 0 ? void 0 : _y.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestTransfer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _z, _0, _1;
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
                    }, (_z = options.enforce) !== null && _z !== void 0 ? _z : false, (_0 = options.rpc) !== null && _0 !== void 0 ? _0 : (_1 = this.options) === null || _1 === void 0 ? void 0 : _1.rpc);
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
         * @param {String} username Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} delegatee Account to receive the delegation
         * @param {String} amount Amount to be transfered. Requires 3 decimals for HP, 6 for VESTS.
         * @param {String} unit HP or VESTS
         * @param {String} rpc Override user's RPC settings
         */
        this.requestDelegation = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _2, _3;
                try {
                    yield this.isKeyChainInstalled();
                    const amountData = data.unit === keychain_enums_1.DelegationUnit.VESTS
                        ? utils_1.default.checkAndFormatAmount(data.amount, 6)
                        : utils_1.default.checkAndFormatAmount(data.amount);
                    this.window.hive_keychain.requestDelegation(data.account, data.delegatee, amountData.amount, data.unit, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_2 = options.rpc) !== null && _2 !== void 0 ? _2 : (_3 = this.options) === null || _3 === void 0 ? void 0 : _3.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a delegation broadcast
         * @param {String} data.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.witness Account to receive the witness vote
         * @param {boolean} data.approve Set to true to vote for the witness, false to unvote
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestWitnessVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _4, _5;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestWitnessVote(data[1].account, data[1].witness, data[1].approve, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_4 = options.rpc) !== null && _4 !== void 0 ? _4 : (_5 = this.options) === null || _5 === void 0 ? void 0 : _5.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Select an account as proxy
         * @param {String | undefined } data.account Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.proxy Account to become the proxy. Empty string ('') to remove a proxy
         * @param {String | undefined} options.rpc Override user's RPC settings
         */
        this.requestProxy = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _6, _7;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestProxy(data[1].account, data[1].proxy, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_6 = options.rpc) !== null && _6 !== void 0 ? _6 : (_7 = this.options) === null || _7 === void 0 ? void 0 : _7.rpc);
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
                var _8, _9;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateClaimedAccount(data[1].creator, data[1].new_account_name, data[1].owner, data[1].active, data[1].posting, data[1].memo_key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_8 = options.rpc) !== null && _8 !== void 0 ? _8 : (_9 = this.options) === null || _9 === void 0 ? void 0 : _9.rpc);
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
                var _10, _11;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateProposal(data[1].creator, data[1].receiver, data[1].start_date, data[1].end_date, data[1].daily_pay, data[1].subject, data[1].permlink, data[1].extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_10 = options.rpc) !== null && _10 !== void 0 ? _10 : (_11 = this.options) === null || _11 === void 0 ? void 0 : _11.rpc);
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
                var _12, _13;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveProposal(data[1].proposal_owner, data[1].proposal_ids, data[1].extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_12 = options.rpc) !== null && _12 !== void 0 ? _12 : (_13 = this.options) === null || _13 === void 0 ? void 0 : _13.rpc);
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
                var _14, _15;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestUpdateProposalVote(data[1].voter, data[1].proposal_ids, data[1].approve, data[1].extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_14 = options.rpc) !== null && _14 !== void 0 ? _14 : (_15 = this.options) === null || _15 === void 0 ? void 0 : _15.rpc);
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
         * @param {String| undefined} data[1].from Hive account to perform the request
         * @param {String} data[1].to Hive account receiving the transfers.
         * @param {String} data[1].amount amount to be sent on each execution. Will be automatically formatted to 3 decimals.
         * @param {String} data[1].currency HIVE or HBD on mainnet.
         * @param {String} data[1].memo transfer memo
         * @param {Number} data[1].recurrence How often will the payment be triggered (in hours) - minimum 24.
         * @param {Number} data[1].executions The times the recurrent payment will be executed - minimum 2.
         * @param {String| undefined} options.rpc Override user's RPC settings
         */
        this.requestRecurrentTransfer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _16, _17;
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
                    }, (_16 = options.rpc) !== null && _16 !== void 0 ? _16 : (_17 = this.options) === null || _17 === void 0 ? void 0 : _17.rpc);
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
