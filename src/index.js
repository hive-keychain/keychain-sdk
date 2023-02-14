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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeychainSDK = void 0;
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
        //TODO remove help comments
        // Once receiving the signed buffer, it needs to verify the signature in two steps:
        // 1) Verify that the publicKey returned in the response belongs to the user and
        // 2) Verified that the signed buffer corresponds to that key.
        //end to remove
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
            //TODO finish this guys here!
            //TODO here add proper output types
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    //sample response signBuffer:
                    //   {
                    //     "signBuffer": {
                    //         "success": true,
                    //         "error": null,
                    //         "result": "1f063f670ab689292a826fa845205d681e04f4651755e3bf21ddafc7fd2c244b9871895576c6b9f1b6bea16125193e05e8ebca4da3335873b6f8f3ba036df0d452",
                    //         "data": {
                    //             "type": "signBuffer",
                    //             "message": "message!!",
                    //             "method": "Active",
                    //             "title": "Login in Into Saturnoman.com\nProceed?",
                    //             "username": "theghost1980"
                    //         },
                    //         "message": "Message signed succesfully.",
                    //         "request_id": 2,
                    //         "publicKey": "STM8RET8exknjBbc76n45iEk1sZd5dS7FEhrs3pKuVg4sUKezozg8"
                    //     }
                    // }
                    //reusing class method
                    // const response = await this.requestSignBuffer(data, options);
                    // if (response.publicKey && response.result) {
                    //   const signatureClass = Signature;
                    //   resolve({ recoveredPublickKey });
                    // }
                    resolve('TODO, login needs to be finished!');
                    //await this.isKeyChainInstalled();
                    // this.window.hive_keychain.requestSignBuffer(
                    //   data.username,
                    //   data.message ?? utils.generateRandomString(),
                    //   data.method,
                    //   (response: KeychainRequestResponse) => {
                    //     if (response.error) {
                    //       reject({
                    //         ...response,
                    //         success: false,
                    //         result: data.title ? `Cannot login into: ${data.title}` : null,
                    //       });
                    //     } else {
                    //       resolve({
                    //         ...response,
                    //         success: true,
                    //         result: data.title ? `Login successful: ${data.title}` : null,
                    //       });
                    //     }
                    //   },
                    //   options.rpc ?? this.options?.rpc,
                    //   data.title,
                    // );
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
                var _a, _b;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignBuffer(data.username, data.message, data.method, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_a = options.rpc) !== null && _a !== void 0 ? _a : (_b = this.options) === null || _b === void 0 ? void 0 : _b.rpc, data.title);
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
                var _c, _d;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddAccountAuthority(data.username, data.authorizedUsername, data.role, data.weight, (response) => {
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
                var _e, _f;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveAccountAuthority(data.username, data.authorizedUsername, data.role, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_e = options.rpc) !== null && _e !== void 0 ? _e : (_f = this.options) === null || _f === void 0 ? void 0 : _f.rpc);
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
                var _g, _h;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddKeyAuthority(data.username, data.authorizedKey, data.role, data.weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_g = options.rpc) !== null && _g !== void 0 ? _g : (_h = this.options) === null || _h === void 0 ? void 0 : _h.rpc);
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
                var _j, _k;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveKeyAuthority(data.username, data.authorizedKey, data.role, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_j = options.rpc) !== null && _j !== void 0 ? _j : (_k = this.options) === null || _k === void 0 ? void 0 : _k.rpc);
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
                var _l, _m;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestBroadcast(data.username, data.operations, data.method, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_l = options.rpc) !== null && _l !== void 0 ? _l : (_m = this.options) === null || _m === void 0 ? void 0 : _m.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests to sign a transaction with a given authority
         * @example
         *
         * //This example would be done much easier with requestBroadcast
         *
         * import dhive from '@hiveio/dhive';
         * const client = new dhive.Client(['https://api.hive.blog', 'https://anyx.io', 'https://api.openhive.network']);
         * const props = await client.database.getDynamicGlobalProperties();
         * const headBlockNumber = props.head_block_number;
         * const headBlockId = props.head_block_id;\
         * const expireTime = 600000;
         * const op = {
         *  ref_block_num: headBlockNumber & 0xffff,
         *  ref_block_prefix: Buffer.from(headBlockId, 'hex').readUInt32LE(4),
         *  expiration: new Date(Date.now() + expireTime).toISOString(),
         *  operations: [...] // Add operations here
         * };
         *  try {
         *     const signTx = await KeyChainSDK.requestSignTx(
         *       {
         *         username: 'keychain.tests',
         *         tx: op,
         *         method: 'Posting',
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
                var _o, _p;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignTx(data.username, data.tx, data.method, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_o = options.rpc) !== null && _o !== void 0 ? _o : (_p = this.options) === null || _p === void 0 ? void 0 : _p.rpc);
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
         *       {},
         *     );
         *     console.log({ post });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.title Title of the blog post
         * @param {String} data.body Content of the blog post
         * @param {String} data.parent_perm Permlink of the parent post. Main tag for a root post
         * @param {String} data.parent_username Author of the parent post. Pass null for root post
         * @param {String} data.json_metadata Parameters of the call, must pass stringyfied.
         * @param {String} data.permlink Permlink of the blog post. Note: must be same as in comment_options if is a HIVE Post.
         * @param {String} data.comment_options Options attached to the blog post, must be stringyfied. Consult Hive documentation at <https://developers.hive.io/apidefinitions/#broadcast_ops_comment_options> to learn more about it. Note: Must be the same as data.permlink if is a Post.
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestPost = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _q, _r;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPost(data.username, data.title, data.body, data.parent_perm, data.parent_username, data.json_metadata, data.permlink, data.comment_options, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_q = options.rpc) !== null && _q !== void 0 ? _q : (_r = this.options) === null || _r === void 0 ? void 0 : _r.rpc);
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
         *         username: 'keychain.tests',
         *         author: 'keychain.tests',
         *         permlink: 'a-post-by-keychaintests-fifth-part-post',
         *         weight: 10000,
         *       },
         *       {},
         *     );
         *     console.log({ vote });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.author Author of the blog post
         * @param {String} data.permlink Permlink of the blog post
         * @param {Number} data.weight Weight of the vote, comprised between -10,000 (-100%) and 10,000 (100%)
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _s, _t;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestVote(data.username, data.permlink, data.author, data.weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_s = options.rpc) !== null && _s !== void 0 ? _s : (_t = this.options) === null || _t === void 0 ? void 0 : _t.rpc);
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
         *         username: undefined,
         *         id: '1',
         *         method: 'Posting',
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
         * @param {String} data.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.id Type of custom_json to be broadcasted
         * @param {KeychainKeyTypes} data.method Type of key. Can be 'Posting','Active' or 'Memo'
         * @param {String} data.json Stringified custom json
         * @param {String} data.display_msg Message to display to explain to the user what this broadcast is about
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestCustomJson = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _u, _v;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCustomJson(data.username, data.id, data.method, data.json, data.display_msg, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_u = options.rpc) !== null && _u !== void 0 ? _u : (_v = this.options) === null || _v === void 0 ? void 0 : _v.rpc);
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
         *   const transfer = await KeyChainSDK.requestTransfer(
         *       {
         *          username: 'theghost1980',
         *          to: 'keychain.tests',
         *          amount: '1.000',
         *          memo: 'Test Keychain SDK transfer',
         *          enforce: false,
         *          currency: 'HIVE',
         *       },
         *       {}
         *   );
         *  console.log({ transfer });
         * } catch (error) {
         *  console.log('error transfer: ', error);
         * }
         *
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.to Hive account to receive the transfer
         * @param {String} data.amount Amount to be transfered. Requires 3 decimals i.e: '1.000', '10.000'.
         * @param {String} data.memo The memo will be automatically encrypted if starting by '#' and the memo key is available on Keychain. It will also overrule the account to be enforced, regardless of the 'enforce' parameter
         * @param {boolean} data.enforce If set to true, user cannot chose to make the transfer from another account
         * @param {String} data.currency Asset's symbol to transfer i.e: 'HIVE', 'HBD'.
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestTransfer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _w, _x;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestTransfer(data.username, data.to, data.amount, data.memo, data.currency, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, data.enforce, (_w = options.rpc) !== null && _w !== void 0 ? _w : (_x = this.options) === null || _x === void 0 ? void 0 : _x.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a token transfer
         * @example
         *   try {
         *     const sendToken = await KeyChainSDK.requestSendToken(
         *       {
         *         username: 'keychain.tests',
         *         to: 'theghost1980',
         *         amount: '0.001',
         *         memo: 'frescos',
         *         currency: 'LEO',
         *       },
         *       {},
         *     );
         *     console.log({ sendToken });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.account Hive account to perform the request
         * @param {String} data.to Hive account to receive the transfer
         * @param {String} data.amount Amount to be transferred. Requires 3 decimals.
         * @param {String} data.memo Memo attached to the transfer
         * @param {String} data.currency Token symbol to be sent, i.e: 'LEO'.
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestSendToken = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _y, _z;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSendToken(data.username, data.to, data.amount, data.memo, data.currency, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_y = options.rpc) !== null && _y !== void 0 ? _y : (_z = this.options) === null || _z === void 0 ? void 0 : _z.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a delegation broadcast
         * @example
         *   try {
         *     const delegation = await KeyChainSDK.requestDelegation(
         *       {
         *         username: undefined,
         *         delegatee: 'keychain.tests',
         *         amount: '1.000',
         *         unit: 'HP',
         *       },
         *       {},
         *     );
         *     console.log({ delegation });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.delegatee Account to receive the delegation
         * @param {String} data.amount Requires 3 decimals, i.e: '1.000'.
         * @param {String} data.unit HP or VESTS. (For VESTS must be greater than minimum).
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestDelegation = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _0, _1;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestDelegation(data.username, data.delegatee, data.amount, data.unit, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, (_0 = options.rpc) !== null && _0 !== void 0 ? _0 : (_1 = this.options) === null || _1 === void 0 ? void 0 : _1.rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        /**
         * Requests a delegation broadcast
         * @example
         *  try {
         *     const witnessVote = await KeyChainSDK.requestWitnessVote(
         *       {
         *         username: 'keychain.tests',
         *         witness: 'stoodkev',
         *         vote: true,
         *       },
         *       {},
         *     );
         *     console.log({ witnessVote });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.witness Account to receive the witness vote
         * @param {boolean} data.vote Set to true to vote for the witness, false to unvote
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestWitnessVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _2, _3;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestWitnessVote(data.username, data.witness, data.vote, (response) => {
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
         * Select an account as proxy
         * @example
         *  try {
         *     const proxy = await KeyChainSDK.requestProxy(
         *       {
         *         username: 'keychain.tests',
         *         proxy: 'stoodkev',
         *       },
         *       {},
         *     );
         *     console.log({ proxy });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String | undefined } data.username Hive account to perform the request. If undefined, user can choose the account from a dropdown
         * @param {String} data.proxy Account to become the proxy. Empty string ('') to remove a proxy
         * @param {String | undefined} options.rpc Override user's RPC settings
         */
        this.requestProxy = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _4, _5;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestProxy(data.username, data.proxy, (response) => {
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
         * Request a power up
         * @example
         *  try {
         *     const powerUp = await KeyChainSDK.requestPowerUp(
         *       {
         *         username: 'keychain.tests',
         *         recipient: 'keychain.tests',
         *         hive: '0.001',
         *       },
         *       {},
         *     );
         *     console.log({ powerUp });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.recipient Account to receive the power up
         * @param {String} data.hive Amount of HIVE to be powered up, requires 3 decimals, i.e: '1.000'.
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestPowerUp = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _6, _7;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPowerUp(data.username, data.recipient, data.hive, (response) => {
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
         * Request a power down
         * @example
         *  try {
         *     const powerDown = await KeyChainSDK.requestPowerDown(
         *       {
         *         username: 'keychain.tests',
         *         hive_power: '0.001',
         *       },
         *       {},
         *     );
         *     console.log({ powerDown });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.hive_power Amount of HP(hive power), to be powered down
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestPowerDown = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _8, _9;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPowerDown(data.username, data.hive_power, (response) => {
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
         * Request the creation of an account using claimed tokens
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.new_account New account to be created
         * @param {object} data.owner owner authority object
         * @param {object} data.active active authority object
         * @param {object} data.posting posting authority object
         * @param {String} data.memo public memo key
         * @param {String | undefined} options.rpc Override user's RPC settings
         */
        this.requestCreateClaimedAccount = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _10, _11;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateClaimedAccount(data.username, data.new_account, data.owner, data.active, data.posting, data.memo, (response) => {
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
                var _12, _13;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateProposal(data.username, data.receiver, data.subject, data.permlink, data.start, data.end, data.daily_pay, data.extensions, (response) => {
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
         * Request the removal of a DHF proposal
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.proposal_ids Stringified Array of ids of the proposals to be removed
         * @param {String} data.extensions Stringified Array of extensions
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestRemoveProposal = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _14, _15;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveProposal(data.username, data.proposal_ids, data.extensions, (response) => {
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
         * Vote/Unvote a DHF proposal
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.proposal_ids Stringified Array of Ids of the proposals to be voted
         * @param {boolean} data.approve Set to true to support the proposal, false to remove a vote
         * @param {String} data.extensions Stringified Array of extensions
         * @param {String} options.rpc Override user's RPC settings
         */
        this.requestUpdateProposalVote = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _16, _17;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestUpdateProposalVote(data.username, data.proposal_ids, data.approve, data.extensions, (response) => {
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
         * Add a new account to Keychain
         * @example
         *  try {
         *     const addAccount = await KeyChainSDK.requestAddAccount(
         *       {
         *         username: 'keychain.tests',
         *         keys: {
         *           active: '5d...',
         *           posting: '5fg...',
         *           memo: '5rfD...',
         *         },
         *       },
         *       {},
         *     );
         *     console.log({ addAccount });
         *   } catch (error) {
         *     console.log({ error });
         *   }
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
         * @example
         *  try {
         *     const conversionCollateralized = await KeyChainSDK.requestConversion(
         *       {
         *         username: 'keychain.tests',
         *         amount: '1.000',
         *         collaterized: true,
         *       },
         *       {},
         *     );
         *     console.log({ conversionCollateralized });
         *   } catch (error) {
         *     console.log({ error });
         *   }
         * @param {String} data.username Hive account to perform the request
         * @param {String} data.amount amount to be converted. Requires 3 decimals, i.e: '1.000'.
         * @param {Boolean} data.collaterized true to convert HIVE to HBD. false to convert HBD to HIVE.
         * @param {String | undefined} optins.rpc  Override user's RPC settings
         */
        this.requestConversion = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _18, _19;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestConversion(data.username, data.amount, data.collaterized, (response) => {
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
         * Request recurrent transfer
         * @example
         *  try {
         *     const recurrentTransfer = await KeyChainSDK.requestRecurrentTransfer(
         *       {
         *         username: 'keychain.tests',
         *         to: 'theghost1980',
         *         amount: '1.000',
         *         currency: 'HIVE',
         *         memo: 'Keychain SDK tests rt',
         *         recurrence: 24,
         *         executions: 2,
         *         extensions: [],
         *       },
         *       {},
         *     );
         *     console.log({ recurrentTransfer });
         *   } catch (error) {
         *     console.log({ error});
         *   }
         * @param {String| undefined} data.username Hive account to perform the request
         * @param {String} data.to Hive account receiving the transfers.
         * @param {String} data.amount amount to be sent on each execution. Requires 3 decimals, i.e: '1.000'.
         * @param {String} data.currency HIVE or HBD on mainnet.
         * @param {String} data.memo transfer memo
         * @param {Number} data.recurrence How often will the payment be triggered (in hours) - minimum 24.
         * @param {Number} data.executions The times the recurrent payment will be executed - minimum 2.
         * @param {String| undefined} options.rpc Override user's RPC settings
         */
        this.requestRecurrentTransfer = (data, options) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _20, _21;
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRecurrentTransfer(data.username, data.to, data.amount, data.currency, data.memo, data.recurrence, data.executions, (response) => {
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
