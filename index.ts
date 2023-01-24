import { Key } from "./interfaces/local-account.interface";

type KeychainOptions = {rpc?:string} 

//NOTE for testing the SDK for now:
// - There is a reactjs app within the folder: testing/

// type WindowKeychained = Window & typeof globalThis 

export class KeyChain {
    window: Window | undefined;
    options: KeychainOptions | undefined;

    constructor(window: Window, options?:KeychainOptions){
        this.window = window;
        //TODO: a way to assign 'DEFAULT'
        //  - add keychain.ts, so when detect default, it can bring the defaultRPC
        //      from keychain EP.
        this.options = options;
    }

    //testing methods
    getConfig(){
        return {
            window: this.window,
            options: this.options
        }
    }
    //end testing

    //basic methods.
    /**
     * 
     * Note: will check if window object set + keychain extension detected!
     */
    isKeyChainInstalled = async () => {
        if(this.window){
            ///TODO how to add hive_keychain.js props into this new type?? WindowKeychained
            const window: any = this.window; 
            return new Promise(function(resolve,rejects){
                if(window.hive_keychain){
                    try {
                        window.hive_keychain.requestHandshake(function () {
                            resolve(true);
                        });   
                    } catch (error) {
                        rejects({handShakeError: 'Extension do not respond, please try reloading the extension!'});
                    }   
                }else{
                    resolve(false);
                }
            })
        }else{
            return new Promise(function(rejects){
                rejects({configError: 'Windows object not assigned, please follow SDK setup.'});
            })
        }
    }

    //TODO login 
    // login : (key:KeyType, message?:string) => LoginResult // Based on a verified signMessage. 
    // If no message is specified, it will be randomly generated.

    requestEncodeMessage = async(username: string, receiver: string, message: string, key: Key ) => {
        if(await this.isKeyChainInstalled() === true){
            //TODO: validation
            ///TODO how to add hive_keychain.js props into this new type?? WindowKeychained
            const window: any = this.window; 
            const cb = function(result: any){
                return new Promise((resolve,rejects) => {
                    resolve(result);
                });
            };
            window.hive_keychain.requestEncodeMessage(username, receiver, message, key, cb);
            // return new Promise((resolve, rejects) => {
            //     //will resolve or rejects depending on result
            // })
        }else{
            //TODO handle not installed 'Request no possible if keychain extension not detected'
        }
    }

}

// export default KeyChain ;