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
        this.login = (account, message, key, rpc, title) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignBuffer(account, message ? message : utils_1.default.generateRandomString(), key, (response) => {
                        if (response.error) {
                            reject(Object.assign(Object.assign({}, response), { success: false, result: title ? `Cannot login into: ${title}` : null }));
                        }
                        else {
                            resolve(Object.assign(Object.assign({}, response), { success: false, result: title ? `Login successful: ${title}` : null }));
                        }
                    }, rpc, title);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        //////END utils///////
        /**
         * This function is called to verify that the user has a certain authority over an account, by requesting to decode a message
         * @param {String} username Hive account to perform the request
         * @param {String} receiver Account that will decode the string
         * @param {String} message Message to be encrypted, i.e: "#To encrypt message"
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         */
        this.requestEncodeMessage = (username, receiver, message, key) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestEncodeMessage(username, receiver, message, key, (response) => {
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
        this.requestVerifyKey = (account, message, key) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestVerifyKey(account, message, key, (response) => {
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
        this.requestSignBuffer = (account, message, key, rpc, title) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignBuffer(account, message, key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_a = this.options) === null || _a === void 0 ? void 0 : _a.rpc, title);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests to add account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} account Hive account to perform the request
         * @param {String} authorizedUsername Authorized account
         * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {number} weight Weight of the authority
         * @param {String | undefined} rpc Override user's RPC settings
         */
        this.requestAddAccountAuthority = (account, authorizedUsername, role, weight, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _b;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddAccountAuthority(account, authorizedUsername, role, weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_b = this.options) === null || _b === void 0 ? void 0 : _b.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests to remove an account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} account Hive account to perform the request
         * @param {String} authorizedUsername Account to lose authority
         * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {String |  undefined} rpc Override user's RPC settings
         */
        this.requestRemoveAccountAuthority = (account, authorizedUsername, role, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _c;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveAccountAuthority(account, authorizedUsername, role, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_c = this.options) === null || _c === void 0 ? void 0 : _c.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests to add a new key authority to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} account Hive account to perform the request
         * @param {String} authorizedKey New public key to be associated with the account
         * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {number} weight Weight of the key authority
         * @param {String} rpc Override user's RPC settings
         */
        this.requestAddKeyAuthority = (account, authorizedKey, role, weight, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _d;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddKeyAuthority(account, authorizedKey, role, weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_d = this.options) === null || _d === void 0 ? void 0 : _d.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests to remove a key to an account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @param {String} account Hive account to perform the request
         * @param {String} authorizedKey Key to be removed (public key).
         * @param {String} role Type of authority. Can be 'Posting','Active' or 'Memo'.
         * @param {String} rpc Override user's RPC settings
         */
        this.requestRemoveKeyAuthority = (account, authorizedKey, role, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _e;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveKeyAuthority(account, authorizedKey, role, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_e = this.options) === null || _e === void 0 ? void 0 : _e.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Generic broadcast request
         * @param {String} account Hive account to perform the request
         * @param {Array} operations Array of operations to be broadcasted
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} rpc Override user's RPC settings
         */
        this.requestBroadcast = (account, operations, key, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _f;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestBroadcast(account, operations, key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_f = this.options) === null || _f === void 0 ? void 0 : _f.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests to sign a transaction with a given authority
         * @param {String} account Hive account to perform the request
         * @param {Object} tx Unsigned transaction
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} rpc Override user's RPC settings
         */
        this.requestSignTx = (account, tx, key, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _g;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignTx(account, tx, key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_g = this.options) === null || _g === void 0 ? void 0 : _g.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a signed call
         * @deprecated
         * @param {String} account Hive account to perform the request
         * @param {String} method Method of the call
         * @param {String} params Parameters of the call
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} rpc Override user's RPC settings
         */
        this.requestSignedCall = (account, method, params, key, rpc) => __awaiter(this, void 0, void 0, function* () {
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
        this.requestPost = (account, title, body, parent_perm, parent_account, json_metadata, permlink, comment_options, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _h;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPost(account, title, body, parent_perm, parent_account, json_metadata, permlink, comment_options, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_h = this.options) === null || _h === void 0 ? void 0 : _h.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a vote
         * @param {String} account Hive account to perform the request
         * @param {String} permlink Permlink of the blog post
         * @param {String} author Author of the blog post
         * @param {Number} weight Weight of the vote, comprised between -10,000 (-100%) and 10,000 (100%)
         * @param {String} rpc Override user's RPC settings
         */
        this.requestVote = (account, permlink, author, weight, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _j;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestVote(account, permlink, author, weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_j = this.options) === null || _j === void 0 ? void 0 : _j.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a custom JSON broadcast
         * @param {String} account Hive account to perform the request. If null, user can choose the account from a dropdown
         * @param {String} id Type of custom_json to be broadcasted
         * @param {String} key Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} json Stringified custom json
         * @param {String} display_msg Message to display to explain to the user what this broadcast is about
         * @param {String} rpc Override user's RPC settings
         */
        this.requestCustomJson = (account, id, key, json, display_msg, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _k;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCustomJson(account, id, key, json, display_msg, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_k = this.options) === null || _k === void 0 ? void 0 : _k.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a transfer
         * @param {String} account Hive account to perform the request
         * @param {String} to Hive account to receive the transfer
         * @param {String} amount Amount to be transfered. Requires 3 decimals.
         * @param {String} memo The memo will be automatically encrypted if starting by '#' and the memo key is available on Keychain. It will also overrule the account to be enforced, regardless of the 'enforce' parameter
         * @param {String} currency 'HIVE' or 'HBD'
         * @param {boolean} enforce If set to true, user cannot chose to make the transfer from another account
         * @param {String} rpc Override user's RPC settings
         */
        this.requestTransfer = (account, to, amount, memo, currency, enforce = false, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _l;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestTransfer(account, to, amount, memo, currency, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, enforce, rpc !== null && rpc !== void 0 ? rpc : (_l = this.options) === null || _l === void 0 ? void 0 : _l.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a token transfer
         * @param {String} account Hive account to perform the request
         * @param {String} to Hive account to receive the transfer
         * @param {String} amount Amount to be transferred. Requires 3 decimals.
         * @param {String} memo Memo attached to the transfer
         * @param {String} currency Token symbol to be sent
         * @param {String} rpc Override user's RPC settings
         */
        this.requestSendToken = (account, to, amount, memo, currency, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _m;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSendToken(account, to, amount, memo, currency, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_m = this.options) === null || _m === void 0 ? void 0 : _m.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a delegation broadcast
         * @param {String} username Hive account to perform the request. If null, user can choose the account from a dropdown
         * @param {String} delegatee Account to receive the delegation
         * @param {String} amount Amount to be transfered. Requires 3 decimals for HP, 6 for VESTS.
         * @param {String} unit HP or VESTS
         * @param {String} rpc Override user's RPC settings
         */
        this.requestDelegation = (username, delegatee, amount, unit = 'HP' || 'VESTS', rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _o;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestDelegation(username, delegatee, amount, unit, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_o = this.options) === null || _o === void 0 ? void 0 : _o.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a witness vote broadcast
         * @param {String} [username=null] Hive account to perform the request. If null, user can choose the account from a dropdown
         * @param {String} witness Account to receive the witness vote
         * @param {boolean} vote Set to true to vote for the witness, false to unvote
         * @param {String} [rpc=null] Override user's RPC settings
         */
        this.requestWitnessVote = (username, witness, vote, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _p;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestWitnessVote(username, witness, vote, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_p = this.options) === null || _p === void 0 ? void 0 : _p.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Select an account as proxy
         * @param {String} [username=null] Hive account to perform the request. If null, user can choose the account from a dropdown
         * @param {String} proxy Account to become the proxy. Empty string ('') to remove a proxy
         * @param {String} [rpc=null] Override user's RPC settings
         */
        this.requestProxy = (username, proxy, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _q;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestProxy(username, proxy, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_q = this.options) === null || _q === void 0 ? void 0 : _q.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Request a power up
         * @param {String} username Hive account to perform the request
         * @param {String} recipient Account to receive the power up
         * @param {String} hive Amount of HIVE to be powered up
         * @param {String} [rpc=null] Override user's RPC settings
         */
        this.requestPowerUp = (username, recipient, hive, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _r;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPowerUp(username, recipient, hive, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_r = this.options) === null || _r === void 0 ? void 0 : _r.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Request a power down
         * @param {String} username Hive account to perform the request
         * @param {String} hive_power Amount of HIVE to be powered down
         * @param {String} [rpc=null] Override user's RPC settings
         */
        this.requestPowerDown = (username, hive_power, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _s;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPowerDown(username, hive_power, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_s = this.options) === null || _s === void 0 ? void 0 : _s.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
        this.requestCreateClaimedAccount = (username, new_account, owner, active, posting, memo, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _t;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateClaimedAccount(username, new_account, owner, active, posting, memo, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_t = this.options) === null || _t === void 0 ? void 0 : _t.rpc);
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
        this.requestCreateProposal = (username, receiver, subject, permlink, daily_pay, start, end, extensions, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _u;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateProposal(username, receiver, subject, permlink, daily_pay, start, end, extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_u = this.options) === null || _u === void 0 ? void 0 : _u.rpc);
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
        this.requestRemoveProposal = (username, proposal_ids, extensions, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _v;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveProposal(username, proposal_ids, extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_v = this.options) === null || _v === void 0 ? void 0 : _v.rpc);
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
        this.requestUpdateProposalVote = (username, proposal_ids, approve, extensions, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _w;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestUpdateProposalVote(username, proposal_ids, approve, extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_w = this.options) === null || _w === void 0 ? void 0 : _w.rpc);
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
        this.requestAddAccount = (username, keys) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddAccount(username, keys, (response) => {
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
         * @param {String} username Hive account to perform the request
         * @param {String} amount amount to be converted.
         * @param {Boolean} collaterized true to convert HIVE to HBD. false to convert HBD to HIVE.
         * @param {String | undefined} rpc  Override user's RPC settings
         */
        this.requestConversion = (username, amount, collaterized, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _x;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestConversion(username, amount, collaterized, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_x = this.options) === null || _x === void 0 ? void 0 : _x.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
        this.requestRecurrentTransfer = (username, to, amount, currency, memo, recurrence, executions, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _y;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRecurrentTransfer(username, to, amount, currency, memo, recurrence, executions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc !== null && rpc !== void 0 ? rpc : (_y = this.options) === null || _y === void 0 ? void 0 : _y.rpc);
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
