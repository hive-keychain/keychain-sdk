## keychain-sdk

This class is a way to handle Hive Keychain requests, with Typescript support. The purpose is to allow developers to integrate Keychain in a seemless manner.

### Installation

- `npm install keychain-sdk`

### Basic Usage

Start by creating a new Keychain instance using:

```
const keychain = new KeychainSDK(window);
```

The keychain-sdk allows you to set an options parameter, in which you can define an RPC node that will override the one normally determined within Keychain.

This works as follows:

```
const keychain = new KeychainSDK(window, { rpc: 'https://api.hive.blog' });
```

After creating the instance you can use it to perform any action you'd need, here requesting for a message to be encoded :

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

### Overriding the RPC node at the request level

You can also override the RPC node at the request level, by adding it in the options

```
import { KeychainSDK } from 'keychain-sdk';
const keychain = new KeychainSDK(window, { rpc: 'https://api.hive.blog'}); // Default RPC at the instance level
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
      {rpc : 'https://api.deathwing.me'}, // For this particular broadcast, this rpc will be used
      );
      console.log({ broadcast });
    } catch (error) {
      console.log({ error });
    }
```

### Utils

#### Verifying

Before making any Keychain request, you can check that Keychain is installed and ready to use, as follows:

```
const isKeychainInstalled = await keychain.isKeychainInstalled();
```

#### Login

Handle logins easily with Keychain :

```
 const keychain = new KeychainSDK(window);
 const data= {
        "username": "keychain.tests",
        "message": "{\"login\":\"123\"}",
        "method": "Posting",
        "title": "Login"
  };
  const login = await keychain
            .login(data as Login);
```

This saves you some time by taking care of the different steps that usually comprise a Hive login:

- Requesting a buffer signature
- Verifying this signature to ensure that the key is correct
- Returning the public key corresponding to the key used for signing

### Requests

Keychain has a long list of available requests. Rather than giving you a boring documentation, we've set up a playground, in which you can discover the different requests, test them and see the corresponding code and results returned by Keychain.

The playground is available [here](https://play.hive-keychain.com).

### Contact us

Should you need to contact us, please open an issue or join our [Discord](https://discord.gg/3EM6YfRrGv).
