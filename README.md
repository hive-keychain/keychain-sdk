## keychain-sdk

This class is a way to handle hive-keychain requests, using Typescript. The purpose is to make it easy for devs and reduce lines of code and complexity.

### Installation

- `npm install hive-keychain/keychain-sdk`

### Basic Usage

As any class, you can create a new instance using:
`const sdk = new KeychainSDK(window);`
The keychain-sdk allows you to set an options parameter, when you need to override RPC node by default, which is used by the keychain extension.
In that case you can do:
`const sdk = new KeychainSDK(window, { rpc: 'https://rpc-url-here' });`
You can also add the override option later on, when processing the request.
A full code sample, to encode a message would be:

```
import { KeychainSDK } from 'keychain-sdk';
const sdk = new KeychainSDK(window);
try
  {
    const encodeMessage = await sdk.encode(formParams);
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
const sdk = new KeychainSDK(window);
try {
      const broadcast = await KeyChainSDK.requestBroadcast(
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
      { rpc: 'https://www.rpc-node-url.com'},
      );
      console.log({ broadcast });
    } catch (error) {
      console.log({ error });
    }
```
