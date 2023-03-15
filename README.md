## keychain-sdk

This class is a way to handle hive-keychain requests, using Typescript. The purpose is to make it easy for devs and reduce lines of code and complexity.

### Installation

- `npm install hive-keychain/keychain-sdk`

### Basic Usage

As any class, you can create a new instance using:

```
const keychain = new KeychainSDK(window);
```

The keychain-sdk allows you to set an options parameter, when you need to override RPC node by default, which is used by the keychain extension.
In that case you can do:

```
const keychain = new KeychainSDK(window, { rpc: 'https://rpc-url-here' });
```

You can also add the override option later on, when processing the request.
A full code sample, to encode a message would be:

```
import { KeychainSDK } from "keychain-sdk";
const keychain = new KeychainSDK(window);
try {
  const encodeMessage = await keychain.encode({
    username: 'keychain.tests',
    receiver: 'keychain.tests',
    message: '#Message to encode, # is required to encrypt',
    method: 'Memo',
  });
  console.log({ encodeMessage });
} catch (error) {
  console.log({ error });
}
```

### Using override RPC option

Some of the requests, give you the option to override the RPC.
Some of them are:

- addAccountAuthority
- removeAccountAuthority
- broadcast
- among others.

Sample of Generic Broadcast, using Rpc override:

```
import { KeychainSDK } from 'keychain-sdk';
const keychain = new KeychainSDK(window, { rpc: 'https://www.rpc-node-url.com'});
try {
      const broadcast = await keychain.requestBroadcast(
      {
        username: 'keychain.tests',
        operations: [
          [
            'transfer',
            {
              from: 'keychain.tests',
              to: 'theghost1980',
              amount: '0.001 HIVE',
              memo: 'testing keychain SDK - requestBroadcast',
            },
          ],
        ],
        method: 'active',
      },
      {},
      );
      console.log({ broadcast });
    } catch (error) {
      console.log({ error });
    }
```

### Login Utils Request

We have provide an easy login function, to avoid extra code and processing. However here we expose an example to do the function step by step, so you can use it or understand what the login request is doing under the hood.

This process will do 3 steps:

- 1.  Signing the message/buffer.
- 2.  Checking if publicKey belongs to that user.
- 3.  Verifying the signature.

```
import { Client } from "@hiveio/dhive";
import { KeychainSDK } from "keychain-sdk";
const keychain = new KeychainSDK(window);
const Dhive = require("@hiveio/dhive");

const client = new Client([
      "https://api.hive.blog",
      "https://api.openhive.network",
]);
    try {
    //  1. Sign the buffer.
      const signBuffer = await sdk.signBuffer(
        {
          username: "keychain.tests",
          message: "message!!",
          method: KeychainKeyTypes.active,
          title: "Login in Into Saturnoman.com\nProceed?",
        },
        {}
      );
    //  2. Check if publicKey belongs to that user.
      const accounts = (
        await client.keys.getKeyReferences([signBuffer.publicKey!])
      )?.accounts;
      if (accounts?.[0]?.includes(signBuffer.data.username!)) {
    //  Success, it belongs, proceed to last step
    //  3. Verify the signature.
        const signature = Dhive.Signature.fromString(signBuffer.result);
        const key = Dhive.PublicKey.fromString(signBuffer.publicKey);
        const result = key.verify(
          Dhive.cryptoUtils.sha256(signBuffer.data.message),
          signature
        );
        if (result) {
    //  Signature verified. Emit a successfull login or any other code you may need.
          console.log("Login Successful", { signBuffer });
        }
    //  Signature could not be verified. Emit a unsuccessfull login or any other code you may need.
        else console.log("The signature could not be verified");
      } else {
    //PublicKey cannot be verified
        console.log("The signature could not be verified");
      }
    } catch (error) {
      console.log("Error during the login process", { error });
    }

```
