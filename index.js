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
exports.KeyChain = void 0;
// type PromiseOrError = Promise<KeychainRequestResponse | KeychainRequestError>;
//NOTE for testing the SDK for now:
// - There is a reactjs app within the folder: testing/
// type WindowKeychained = Window & typeof globalThis
//TODO move to utils/
const generateRandomString = () => {
    const randomString = Math.random() + 1;
    const dictionary = {
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
class KeyChain {
    constructor(window, options) {
        //end testing
        //basic methods.
        //reuse code
        this.checkKeyChain = () => __awaiter(this, void 0, void 0, function* () {
            const check = yield this.isKeyChainInstalled();
            if (check !== true) {
                return Promise.reject({
                    keychainError: 'Keychain not installed, please visit: www.www.com',
                    type: 'Error_not_installed',
                });
            }
        });
        this.requestHiveKeyChain = (args) => {
            //TODO how to add window type + added prop['hive_keychain']??
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestBroadcast(...args);
            });
        };
        this.cbPromise = (response, reject, resolve) => {
            if (response.error) {
                reject(response);
            }
            else {
                resolve(response);
            }
        };
        //end reuse
        /**
         *
         * Note: will check if window object set + keychain extension detected!
         */
        this.isKeyChainInstalled = () => __awaiter(this, void 0, void 0, function* () {
            if (this.window) {
                ///TODO how to add hive_keychain.js props into this new type?? WindowKeychained
                const window = this.window;
                return new Promise(function (resolve, reject) {
                    if (window.hive_keychain) {
                        try {
                            window.hive_keychain.requestHandshake(function () {
                                resolve(true);
                            });
                        }
                        catch (error) {
                            reject({
                                keychainError: 'Extension do not respond, please try reloading the extension!',
                                type: 'Error_Hanshake',
                            });
                        }
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                return new Promise(function (rejects) {
                    rejects({
                        keychainError: 'Windows object not assigned, please follow SDK setup.',
                        type: 'Error_Class_setup',
                    });
                });
            }
        });
        //TODO refactor reusing
        this.login = (account, message, key, rpc, title) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.isKeyChainInstalled()) {
                const window = this.window;
                return new Promise((resolve, reject) => {
                    window.hive_keychain.requestSignBuffer(account, message ? message : generateRandomString(), key, (response) => {
                        if (response.error) {
                            reject(Object.assign(Object.assign({}, response), { success: false, result: title ? `Cannot login into: ${title}` : null }));
                        }
                        else {
                            resolve(Object.assign(Object.assign({}, response), { success: false, result: title ? `Login successful: ${title}` : null }));
                        }
                    }, rpc, title);
                });
            }
            else {
                return Promise.reject({
                    keychainError: 'Keychain not installed, please visit: www.www.com',
                    type: 'Error_not_installed',
                });
            }
        });
        //TODO refactor reusing
        this.requestEncodeMessage = (username, receiver, message, key) => __awaiter(this, void 0, void 0, function* () {
            if ((yield this.isKeyChainInstalled()) === true) {
                //TODO: validation
                ///TODO how to add hive_keychain.js props into this new type?? WindowKeychained
                const window = this.window;
                return new Promise((resolve, reject) => {
                    window.hive_keychain.requestEncodeMessage(username, receiver, message, key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    });
                });
            }
            else {
                return Promise.reject({
                    keychainError: 'Keychain not installed, please visit: www.www.com',
                    type: 'Error_not_installed',
                });
            }
        });
        //TODO refactor reusing
        this.requestVerifyKey = (account, message, key) => __awaiter(this, void 0, void 0, function* () {
            //test data:
            //'memo' "#JnyQbbpLdRBT8ev7SALsNru6c4bftPCf4c6AkTN42YTc52aDvcRqKVqK6yMhRAGhW8fbasR8xz14ofs63WXLP6nxDndKsBMkmg7UsAS9ucTDrKFoZkuJFCyvLmksyCYgD"
            if ((yield this.isKeyChainInstalled()) === true) {
                const window = this.window;
                return new Promise((resolve, reject) => {
                    window.hive_keychain.requestVerifyKey(account, message, key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    });
                });
            }
            else {
                return Promise.reject({
                    keychainError: 'Keychain not installed, please visit: www.www.com',
                    type: 'Error_not_installed',
                });
            }
        });
        //TODO refactor reusing
        this.requestSignBuffer = (account, message, key, rpc, title) => __awaiter(this, void 0, void 0, function* () {
            if ((yield this.isKeyChainInstalled()) === true) {
                const window = this.window;
                return new Promise((resolve, reject) => {
                    window.hive_keychain.requestSignBuffer(account, message, key, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc, title);
                });
            }
            else {
                return Promise.reject({
                    keychainError: 'Keychain not installed, please visit: www.www.com',
                    type: 'Error_not_installed',
                });
            }
        });
        //TODO refactor reusing
        this.requestAddAccountAuthority = (account, authorizedUsername, role, weight, rpc) => __awaiter(this, void 0, void 0, function* () {
            if ((yield this.isKeyChainInstalled()) === true) {
                const window = this.window;
                return new Promise((resolve, reject) => {
                    window.hive_keychain.requestAddAccountAuthority(account, authorizedUsername, role, weight, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                });
            }
            else {
                return Promise.reject({
                    keychainError: 'Keychain not installed, please visit: www.www.com',
                    type: 'Error_not_installed',
                });
            }
        });
        //TODO refactor reusing
        this.requestRemoveAccountAuthority = (account, authorizedUsername, role, rpc) => __awaiter(this, void 0, void 0, function* () {
            if ((yield this.isKeyChainInstalled()) === true) {
                const window = this.window;
                return new Promise((resolve, reject) => {
                    window.hive_keychain.requestRemoveAccountAuthority(account, authorizedUsername, role, (response) => {
                        if (response.error) {
                            reject(response);
                        }
                        else {
                            resolve(response);
                        }
                    }, rpc);
                });
            }
            else {
                return Promise.reject({
                    keychainError: 'Keychain not installed, please visit: www.www.com',
                    type: 'Error_not_installed',
                });
            }
        });
        this.requestAddKeyAuthority = (account, authorizedKey, role, weight, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestAddKeyAuthority(account, authorizedKey, role, weight, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestRemoveKeyAuthority = (account, authorizedKey, role, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestRemoveKeyAuthority(account, authorizedKey, role, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestBroadcast = (account, operations, key, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestBroadcast(account, operations, key, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestSignTx = (account, tx, key, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestSignTx(account, tx, key, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestSignedCall = (account, method, params, key, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            return new Promise((resolve, reject) => {
                resolve(console.warn('requestSignedCall has been deprecated.'));
            });
        });
        //TODO
        // it looks like some params have changed??
        this.requestPost = (account, title, body, parent_perm, parent_account, json_metadata, permlink, comment_options, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestPost(account, title, body, parent_perm, parent_account, json_metadata, permlink, comment_options, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestVote = (account, permlink, author, weight, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestVote(account, permlink, author, weight, (response) => {
                    this.cbPromise(response, reject, resolve);
                }, rpc);
            });
        });
        this.requestCustomJson = (account, id, key, json, display_msg, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestCustomJson(account, id, key, json, display_msg, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestTransfer = (account, to, amount, memo, currency, enforce = false, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestTransfer(account, to, amount, memo, currency, (response) => {
                    this.cbPromise(response, reject, resolve);
                }, enforce, rpc);
            });
        });
        this.requestSendToken = (account, to, amount, memo, currency, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestSendToken(account, to, amount, memo, currency, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestDelegation = (username, delegatee, amount, unit = 'HP' || 'VESTS', rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestDelegation(username, delegatee, amount, unit, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestWitnessVote = (username, witness, vote, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestWitnessVote(username, witness, vote, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestProxy = (username, proxy, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestProxy(username, proxy, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestPowerUp = (username, recipient, hive, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestPowerUp(username, recipient, hive, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
        this.requestPowerDown = (username, hive_power, rpc) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkKeyChain();
            const window = this.window;
            return new Promise((resolve, reject) => {
                window.hive_keychain.requestPowerDown(username, hive_power, (response) => this.cbPromise(response, reject, resolve), rpc);
            });
        });
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
}
exports.KeyChain = KeyChain;
// export default KeyChain ;
