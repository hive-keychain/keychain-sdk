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
const utils_1 = __importDefault(require("./utils/utils"));
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
        /**
         * Keychain SDK utils functions.
         * Call this function to perform an easy login function by trying to sign a message.
         * @example
         * try {
         *     const login = await KeyChainSDK.login(
         *       {
         *         username: undefined,
         *         message: 'Log into my website',
         *         method: 'posting',
         *         title: 'Saturnoman.com',
         *       },
         *       {},
         *     );
         *     console.log({ login });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String | undefined} data.username Hive account to perform the login, if undefined, Keychain extension will show a dropdown to choose an account.
         * @param {String | undefined} data.message Message to sign, if undefined, random message will be generated.
         * @param {KeychainKeyTypes} data.method Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String | undefined} data.title Title to be shown on popup
         * @param {String | undefined} options.rpc Override user's RPC settings
         */
        this.login = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignBuffer(data.username, (_a = data.message) !== null && _a !== void 0 ? _a : utils_1.default.generateRandomString(), data.method, (response) => {
                        if (response.error) {
                            reject(Object.assign(Object.assign({}, response), { success: false, result: data.title ? `Cannot login into: ${data.title}` : null }));
                        }
                        else {
                            resolve(Object.assign(Object.assign({}, response), { success: true, result: data.title ? `Login successful: ${data.title}` : null }));
                        }
                    }, (_b = options.rpc) !== null && _b !== void 0 ? _b : (_c = this.options) === null || _c === void 0 ? void 0 : _c.rpc, data.title);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        //////END utils///////
        /**
         * This function is called to verify that the user has a certain authority over an account, by requesting to decode a message
         * @example
         * try {
         *     const encodeMessage = await KeyChainSDK.requestEncodeMessage({
         *       username: 'keychain.tests',
         *       receiver: 'theghost1980',
         *       message: '#Hi there man!',
         *       method: 'Memo',
         *     });
         *     console.log({ encodeMessage });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.receiver Account that will decode the string
         * @param {String} data.message Message to be encrypted, i.e: "#To encrypt message"
         * @param {KeychainKeyTypes} data.method Type of key. Can be 'Posting','Active' or 'Memo'
         */
        this.requestEncodeMessage = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestEncodeMessage(data.username, data.receiver, data.message, data.method, (response) => {
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
         * @example
         *try {
         *     const verifyKey = await KeyChainSDK.requestVerifyKey({
         *       username: 'keychain.tests',
         *       message:
         *         '#JnyQbbpLdRBT8ev7SALsNru6c4bftPCf4c6AkTN42YTc52aDvcRqKVqK6yMhRAGhW8fbasR8xz14ofs63WXLP6nxDndKsBMkmg7UsAS9ucTDrKFoZkuJFCyvLmksyCYgD',
         *       method: 'memo',
         *     });
         *     console.log({ verifyKey });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.message Message to be decoded by the account
         * @param {KeychainKeyTypes} data.method Type of key. Can be 'Posting','Active' or 'Memo'
         */
        this.requestVerifyKey = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestVerifyKey(data.username, data.message, data.method, (response) => {
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
         * @example
         * try {
         *     const signBuffer = await KeyChainSDK.requestSignBuffer(
         *       {
         *         username: undefined,
         *         message: 'message!!',
         *         method: 'Active',
         *         title: 'Login in Into Saturnoman.com\nProceed?',
         *       },
         *       {},
         *     );
         *     console.log({ signBuffer });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String| undefined} data.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.message Message to be signed by the account
         * @param {KeychainKeyTypes} data.method Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String | undefined} data.title Override "Sign message" title
         * @param {String| undefined} options.rpc Override user's RPC settings
         */
        this.requestSignBuffer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _d, _e;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignBuffer(data.username, data.message, data.method, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_d = options.rpc) !== null && _d !== void 0 ? _d : (_e = this.options) === null || _e === void 0 ? void 0 : _e.rpc, data.title);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests to add account authority over another account. For more information about multisig, please read https://peakd.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain
         * @example
         * try {
         *     const addAccountAuthority = await KeyChainSDK.requestAddAccountAuthority(
         *       {
         *         username: 'keychain.tests',
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
         * @param {String} data.username Hive account to perform the request
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
                    this.window.hive_keychain.requestAddAccountAuthority(data.username, data.authorizedUsername, data.role, data.weight, (response) => {
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
         * @example
         * try {
         *     const removeAccountAuthority =
         *       await KeyChainSDK.requestRemoveAccountAuthority(
         *         {
         *           username: 'keychain.tests',
         *           authorizedUsername: 'sexosentido',
         *           role: 'posting',
         *         },
         *         {},
         *       );
         *     console.log({ removeAccountAuthority });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.authorizedUsername Account to lose authority
         * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'
         * @param {String |  undefined} options.rpc Override user's RPC settings
         */
        this.requestRemoveAccountAuthority = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _h, _j;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveAccountAuthority(data.username, data.authorizedUsername, data.role, (response) => {
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
         * @example
         * try {
         *     const addKeyAuthority = await KeyChainSDK.requestAddKeyAuthority(
         *       {
         *         username: 'keychain.tests',
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
         * @param {String} data.username Hive account to perform the request
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
                    this.window.hive_keychain.requestAddKeyAuthority(data.username, data.authorizedKey, data.role, data.weight, (response) => {
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
         * @example
         *   try {
         *     const removeKeyAuthority = await KeyChainSDK.requestRemoveKeyAuthority(
         *       {
         *         username: 'keychain.tests',
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
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.authorizedKey Key to be removed (public key).
         * @param {String} data.role Type of authority. Can be 'Posting','Active' or 'Memo'.
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestRemoveKeyAuthority = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _m, _o;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveKeyAuthority(data.username, data.authorizedKey, data.role, (response) => {
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
         * @example
         * try {
         *     const broadcast = await KeyChainSDK.requestBroadcast(
         *       {
         *         username: 'keychain.tests',
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
         *         method: 'active',
         *       },
         *       {},
         *     );
         *     console.log({ broadcast });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {Array} data.operations Array of operations to be broadcasted
         * @param {KeychainKeyTypes} data.method Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestBroadcast = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _p, _q;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestBroadcast(data.username, data.operations, data.method, (response) => {
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
         * @example
         *  try {
         *     const signTx = await KeyChainSDK.requestSignTx(
         *       {
         *         username: 'keychain.tests',
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
         *                 memo: 'testing keychain SDK - requestSignTx',
         *               },
         *             ],
         *           ],
         *         },
         *         method: 'active',
         *       },
         *       {},
         *     );
         *     console.log({ signTx });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {Object} data.tx Unsigned transaction
         * @param {KeychainKeyTypes} data.method Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestSignTx = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _r, _s;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignTx(data.username, data.tx, data.method, (response) => {
                        if (response.error) {
                            console.log({ response }); //TODO to remove
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
        this.requestPost = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _t, _u;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPost(data.comment.author, data.comment.title, data.comment.body, data.comment.parent_permlink, data.comment.parent_author, data.comment.json_metadata, data.comment.permlink, data.comment_options
                        ? JSON.stringify(data.comment_options)
                        : undefined, (response) => {
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
        this.requestVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _v, _w;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestVote(data.voter, data.permlink, data.author, data.weight, (response) => {
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
        this.requestCustomJson = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _x, _y;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCustomJson(data.account, data.id, data.key, data.json, data.display_msg, (response) => {
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
        this.requestTransfer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _z, _0, _1;
                try {
                    yield this.isKeyChainInstalled();
                    const amountData = utils_1.default.checkAndFormatAmount(data.amount);
                    this.window.hive_keychain.requestTransfer(data.from, data.to, amountData.amount, data.memo, amountData.currency, (response) => {
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
        /**
         * Requests a token transfer
         * @param {String} data.account Hive account to perform the request
         * @param {String} data.to Hive account to receive the transfer
         * @param {String} data.amount Amount to be transferred. Requires 3 decimals.
         * @param {String} data.memo Memo attached to the transfer
         * @param {String} data.currency Token symbol to be sent
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestSendToken = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _2, _3;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSendToken(data.account, data.to, data.amount, data.memo, data.currency, (response) => {
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
         * @param {String} data.delegation.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.delegation.delegatee Account to receive the delegation
         * @param {String} data.delegation.vesting_shares Use when passing vesting_power.(VESTS)
         * @param {String} data.delegation.hp Use when passing hive power.(HP)
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestDelegation = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _4, _5;
                try {
                    yield this.isKeyChainInstalled();
                    let unit;
                    if (data.delegation.vesting_shares) {
                        unit = keychain_enums_1.DelegationUnit.VESTS;
                    }
                    else if (data.delegation.hp) {
                        unit = keychain_enums_1.DelegationUnit.HP;
                    }
                    else
                        throw Error('Please define hp or vesting_shares');
                    this.window.hive_keychain.requestDelegation(data.delegation.delegator, data.delegation.delegatee, unit === keychain_enums_1.DelegationUnit.HP
                        ? data.delegation.hp
                        : data.delegation.vesting_shares, unit, (response) => {
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
         * Requests a delegation broadcast
         * @param {String} data.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.witness Account to receive the witness vote
         * @param {boolean} data.approve Set to true to vote for the witness, false to unvote
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestWitnessVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _6, _7;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestWitnessVote(data.account, data.witness, data.approve, (response) => {
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
        /**
         * Select an account as proxy
         * @param {String | undefined } data.account Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.proxy Account to become the proxy. Empty string ('') to remove a proxy
         * @param {String | undefined} options.rpc Override user's RPC settings
         */
        this.requestProxy = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _8, _9;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestProxy(data.account, data.proxy, (response) => {
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
        /**
         * Request a power up
         * @param {String} data[1].from Hive account to perform the request
         * @param {String} data[1].to Account to receive the power up
         * @param {String | Asset} data[1].amount Amount of HIVE to be powered up. string or Asset.
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestPowerUp = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _10, _11;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPowerUp(data.from, data.to, data.amount, (response) => {
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
         * Request a power down
         * @param {String} data.account Hive account to perform the request
         * @param {String} data.hive_power Amount of HIVE to be powered down
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestPowerDown = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _12, _13;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPowerDown(data.account, data.hive_power, (response) => {
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
                var _14, _15;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateClaimedAccount(data.creator, data.new_account_name, data.owner, data.active, data.posting, data.memo_key, (response) => {
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
        this.requestCreateProposal = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _16, _17;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateProposal(data.creator, data.receiver, data.start_date, data.end_date, data.daily_pay, data.subject, data.permlink, data.extensions, (response) => {
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
        /**
         * Request the removal of a DHF proposal
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.proposal_ids Stringified Array of ids of the proposals to be removed
         * @param {String} data.extensions Stringified Array of extensions
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestRemoveProposal = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _18, _19;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveProposal(data.proposal_owner, data.proposal_ids, data.extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_18 = options.rpc) !== null && _18 !== void 0 ? _18 : (_19 = this.options) === null || _19 === void 0 ? void 0 : _19.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Vote/Unvote a DHF proposal
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.proposal_ids Stringified Array of Ids of the proposals to be voted
         * @param {boolean} data.approve Set to true to support the proposal, false to remove a vote
         * @param {String} data.extensions Stringified Array of extensions
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestUpdateProposalVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _20, _21;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestUpdateProposalVote(data.voter, data.proposal_ids, data.approve, data.extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_20 = options.rpc) !== null && _20 !== void 0 ? _20 : (_21 = this.options) === null || _21 === void 0 ? void 0 : _21.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Add a new account to Keychain
         * @param {String} data.username username of the account to be added
         * @param {Object} data.keys private keys of the account : {active:'...',posting:'...',memo:'...'}. At least one must be specified.
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
        /**
         * Request currency conversion
         * @param {String} data.owner Hive account to perform the request
         * @param {String | Asset} data.amount amount to be converted. Collateralized: '1 HIVE'(will convert to  HBD). Non Collateralized: '1 HBD'(will convert to HIVE).
         * @param {String | undefined} optins.rpc  Override user's RPC settings
         */
        this.requestConversion = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _22, _23;
                try {
                    yield this.isKeyChainInstalled();
                    const amountData = utils_1.default.checkAndFormatAmount(data.amount);
                    this.window.hive_keychain.requestConversion(data.owner, amountData.amount, amountData.currency === 'HIVE' ? true : false, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_22 = options.rpc) !== null && _22 !== void 0 ? _22 : (_23 = this.options) === null || _23 === void 0 ? void 0 : _23.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
        this.requestRecurrentTransfer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _24, _25;
                try {
                    yield this.isKeyChainInstalled();
                    const amountData = utils_1.default.checkAndFormatAmount(data.amount);
                    this.window.hive_keychain.requestRecurrentTransfer(data.from, data.to, amountData.amount, amountData.currency, data.memo, data.recurrence, data.executions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_24 = options.rpc) !== null && _24 !== void 0 ? _24 : (_25 = this.options) === null || _25 === void 0 ? void 0 : _25.rpc);
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
}
exports.KeychainSDK = KeychainSDK;
