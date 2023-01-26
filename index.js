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
//TODO add same params/examples info on each method as hive_keychain.js
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
        this.requestSignBuffer = (account, message, key, rpc, title) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignBuffer(account, message, key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc, title);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestAddAccountAuthority = (account, authorizedUsername, role, weight, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddAccountAuthority(account, authorizedUsername, role, weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
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
        });
        this.requestRemoveAccountAuthority = (account, authorizedUsername, role, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveAccountAuthority(account, authorizedUsername, role, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
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
        });
        this.requestAddKeyAuthority = (account, authorizedKey, role, weight, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestAddKeyAuthority(account, authorizedKey, role, weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestRemoveKeyAuthority = (account, authorizedKey, role, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveKeyAuthority(account, authorizedKey, role, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestBroadcast = (account, operations, key, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestBroadcast(account, operations, key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestSignTx = (account, tx, key, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSignTx(account, tx, key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
        //TODO how to fix it???
        this.requestPost = (account, title, body, parent_perm, parent_account, json_metadata, permlink, comment_options, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPost(account, title, body, parent_perm, parent_account, json_metadata, permlink, comment_options, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestVote = (account, permlink, author, weight, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestVote(account, permlink, author, weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestCustomJson = (account, id, key, json, display_msg, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCustomJson(account, id, key, json, display_msg, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestTransfer = (account, to, amount, memo, currency, enforce = false, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestTransfer(account, to, amount, memo, currency, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, enforce, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestSendToken = (account, to, amount, memo, currency, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestSendToken(account, to, amount, memo, currency, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestDelegation = (username, delegatee, amount, unit = 'HP' || 'VESTS', rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestDelegation(username, delegatee, amount, unit, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestWitnessVote = (username, witness, vote, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestWitnessVote(username, witness, vote, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestProxy = (username, proxy, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestProxy(username, proxy, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestPowerUp = (username, recipient, hive, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPowerUp(username, recipient, hive, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestPowerDown = (username, hive_power, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestPowerDown(username, hive_power, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestCreateClaimedAccount = (username, new_account, owner, active, posting, memo, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateClaimedAccount(username, new_account, owner, active, posting, memo, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        //HF21
        this.requestCreateProposal = (username, receiver, subject, permlink, daily_pay, start, end, extensions, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestCreateProposal(username, receiver, subject, permlink, daily_pay, start, end, extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestRemoveProposal = (username, proposal_ids, extensions, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRemoveProposal(username, proposal_ids, extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
        this.requestUpdateProposalVote = (username, proposal_ids, approve, extensions, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestUpdateProposalVote(username, proposal_ids, approve, extensions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                }
                catch (error) {
                    throw error;
                }
            }));
        });
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
        this.requestConversion = (username, amount, collaterized, rpc) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestConversion(username, amount, collaterized, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
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
                try {
                    yield this.isKeyChainInstalled();
                    this.window.hive_keychain.requestRecurrentTransfer(username, to, amount, currency, memo, recurrence, executions, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
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
