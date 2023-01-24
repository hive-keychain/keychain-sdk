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
class KeyChain {
    constructor(window, options) {
        //end testing
        //basic methods.
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
                            reject({ keychainError: 'Extension do not respond, please try reloading the extension!', type: 'Error_Hanshake' });
                        }
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                return new Promise(function (rejects) {
                    rejects({ keychainError: 'Windows object not assigned, please follow SDK setup.', type: 'Error_Class_setup' });
                });
            }
        });
        //TODO login 
        // login : (key:KeyType, message?:string) => LoginResult // Based on a verified signMessage. 
        // If no message is specified, it will be randomly generated.
        //TODO login
        // login = async(key: KeychainKeyTypes, message?: string) => {
        //     if(await this.isKeyChainInstalled()){
        //         // if(!message) //TODO generates randomly
        //     }else{
        //         return keychainNotInstalled;
        //     }
        // };
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
                return Promise.reject({ keychainError: 'Keychain not installed, please visit: www.www.com', type: 'Error_not_installed' });
            }
        });
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
                return Promise.reject({ keychainError: 'Keychain not installed, please visit: www.www.com', type: 'Error_not_installed' });
            }
        });
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
                return Promise.reject({ keychainError: 'Keychain not installed, please visit: www.www.com', type: 'Error_not_installed' });
            }
        });
        //TODO finish it
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
                return Promise.reject({ keychainError: 'Keychain not installed, please visit: www.www.com', type: 'Error_not_installed' });
            }
        });
        this.window = window;
        //TODO: a way to assign 'DEFAULT'
        //  - add keychain.ts, so when detect default, it can bring the defaultRPC
        //      from keychain EP.
        this.options = options;
    }
    //testing methods
    getConfig() {
        return {
            window: this.window,
            options: this.options
        };
    }
}
exports.KeyChain = KeyChain;
// export default KeyChain ;
