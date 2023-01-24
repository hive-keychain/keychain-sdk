import { KeychainKeyTypes } from "./interfaces/keychain.interface";
import { Key } from "./interfaces/local-account.interface";

type KeychainOptions = {rpc?:string} 

//NOTE for testing the SDK for now:
// - There is a reactjs app within the folder: testing/

// type WindowKeychained = Window & typeof globalThis 

type KeychainRequestResponse = {
            success: boolean;
            error: string;
            result: string | null;
            data: {
                key: string; //TODO add types & each request will vary, so later on will be data: RequestEncode | RequestTransfer....
                message: string;
                method: string;
                receiver: string;
                request_id: number,
                type: string;
                username: string;
            },
            message: string;
            request_id: number;
};

type KeychainRequestError = {
    keychainError: string;
    type: string;
};

type PromiseOrError = Promise<KeychainRequestResponse | KeychainRequestError>;

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
    isKeyChainInstalled = async (): Promise<boolean | KeychainRequestError> => {
        if(this.window){
            ///TODO how to add hive_keychain.js props into this new type?? WindowKeychained
            const window: any = this.window; 
            return new Promise(function(resolve,reject){
                if(window.hive_keychain){
                    try {
                        window.hive_keychain.requestHandshake(function () {
                            resolve(true);
                        });   
                    } catch (error) {
                        reject({keychainError: 'Extension do not respond, please try reloading the extension!', type: 'Error_Hanshake'});
                    }   
                }else{
                    resolve(false);
                }
            })
        }else{
            return new Promise(function(rejects){
                rejects({keychainError: 'Windows object not assigned, please follow SDK setup.', type: 'Error_Class_setup'});
            })
        }
    }

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

    requestEncodeMessage = async(username: string, receiver: string, message: string, key: KeychainKeyTypes ): PromiseOrError => {
        if(await this.isKeyChainInstalled() === true){
            //TODO: validation
            ///TODO how to add hive_keychain.js props into this new type?? WindowKeychained
            const window: any = this.window; 
            return new Promise((resolve,reject) => {
                window.hive_keychain.requestEncodeMessage(username, receiver, message, key, (response: KeychainRequestResponse) => {
                    if(response.error){
                        reject(response);
                    }else{
                        resolve(response);
                    }
                });
            })
        }else{
            return Promise.reject({keychainError: 'Keychain not installed, please visit: www.www.com', type: 'Error_not_installed'} as KeychainRequestError);
        }
    }

    requestVerifyKey = async(account: string, message: string, key: KeychainKeyTypes): PromiseOrError => {
        //test data:
        //'memo' "#JnyQbbpLdRBT8ev7SALsNru6c4bftPCf4c6AkTN42YTc52aDvcRqKVqK6yMhRAGhW8fbasR8xz14ofs63WXLP6nxDndKsBMkmg7UsAS9ucTDrKFoZkuJFCyvLmksyCYgD"
        if(await this.isKeyChainInstalled() === true){
            const window: any = this.window;
            return new Promise((resolve,reject) => {
                window.hive_keychain.requestVerifyKey(account, message, key, (response: KeychainRequestResponse) => {
                    if(response.error){
                        reject(response);
                    }else{
                        resolve(response);
                    }
                })
            })
        }else{
            return Promise.reject({keychainError: 'Keychain not installed, please visit: www.www.com', type: 'Error_not_installed'} as KeychainRequestError);
        }
    };

    requestSignBuffer = async(account: string, message: string, key: KeychainKeyTypes, rpc?: string, title?: string ): PromiseOrError => {
        if(await this.isKeyChainInstalled() === true){
            const window: any = this.window;
            return new Promise((resolve,reject) => {
                window.hive_keychain.requestSignBuffer(account, message, key, (response: KeychainRequestResponse) => {
                    if(response.error){
                        reject(response);
                    }else{
                        resolve(response);
                    }
                }, rpc,title)
            });
        }else{
            return Promise.reject({keychainError: 'Keychain not installed, please visit: www.www.com', type: 'Error_not_installed'} as KeychainRequestError);
        }
    };

    //TODO finish it
    requestAddAccountAuthority = async(account: string,
        authorizedUsername: string,
        role: KeychainKeyTypes,
        weight: number,
        rpc: string | undefined,): PromiseOrError => {
        if(await this.isKeyChainInstalled() === true){
            const window: any = this.window;
            return new Promise((resolve,reject) => {
                window.hive_keychain.requestAddAccountAuthority(account, authorizedUsername, role, weight, (response: KeychainRequestResponse) => {
                    if(response.error){
                        reject(response);
                    }else{
                        resolve(response);
                    }
                }, rpc);
            });
        }else{
            return Promise.reject({keychainError: 'Keychain not installed, please visit: www.www.com', type: 'Error_not_installed'} as KeychainRequestError);
        }
    };
}

// export default KeyChain ;