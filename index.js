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
//NOTE for testing the SDK for now:
// - There is a reactjs app within the folder: testing/
// type WindowKeychained = Window & typeof globalThis 
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
                return new Promise(function (resolve, rejects) {
                    if (window.hive_keychain) {
                        try {
                            window.hive_keychain.requestHandshake(function () {
                                resolve(true);
                            });
                        }
                        catch (error) {
                            rejects({ handShakeError: 'Extension do not respond, please try reloading the extension!' });
                        }
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                return new Promise(function (rejects) {
                    rejects({ configError: 'Windows object not assigned, please follow SDK setup.' });
                });
            }
        });
        //TODO login 
        // login : (key:KeyType, message?:string) => LoginResult // Based on a verified signMessage. 
        // If no message is specified, it will be randomly generated.
        this.requestEncodeMessage = (username, receiver, message, key) => __awaiter(this, void 0, void 0, function* () {
            if ((yield this.isKeyChainInstalled()) === true) {
                //TODO: validation
                ///TODO how to add hive_keychain.js props into this new type?? WindowKeychained
                const window = this.window;
                const cb = function (result) {
                    return new Promise((resolve, rejects) => {
                        resolve(result);
                    });
                };
                window.hive_keychain.requestEncodeMessage(username, receiver, message, key, cb);
                // return new Promise((resolve, rejects) => {
                //     //will resolve or rejects depending on result
                // })
            }
            else {
                //TODO handle not installed 'Request no possible if keychain extension not detected'
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
