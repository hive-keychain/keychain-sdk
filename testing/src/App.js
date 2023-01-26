/*global chrome*/
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';

// const generateRandomString = (size) => {
//   const randomString = Math.random() + 1;
//   const dictionary = {
//     0: 'A',
//     1: 'K-',
//     2: 'x',
//     3: 'E',
//     4: 'S',
//     5: 's',
//     6: 'l',
//     7: '#',
//     8: 'P',
//     9: '&',
//   };
//   return (
//     randomString
//       .toString()
//       .split('')
//       .map((char) => dictionary[char])
//       .join('') + ' Keychain SDK Login'
//   );
// };

function App() {
  const KeyChainSDK = new KeychainSDK(window, { rpc: 'DEFAULT' });
  // console.log(generateRandomString());
  //tests on requestHandshake
  // useEffect(() => {
  //   const onLoadHandler = async () => {
  //     console.log('Fully loaded!');
  //     if (window.hive_keychain) {
  //       console.log('It should has it!!');
  //       const cbPromise = function () {
  //         return new Promise((resolve, rejects) => {
  //           console.log('Waited and resolved!');
  //           resolve(true);
  //         });
  //       };
  //       window.hive_keychain.requestHandshake(
  //         cbPromise().then((value) => {
  //           console.log({ value });
  //         }),
  //       );
  //     }
  //   };
  //   window.addEventListener('load', onLoadHandler);
  // });

  //end tests

  //Stays as useful hook that may be
  //used as SDK on Hooks for: ReactJS, ANG, etc
  useEffect(() => {
    const onLoadHandler = async () => {
      console.log('Fully loaded!');
      if (window.hive_keychain) {
        console.log('It should has it!!');
        // const isKeyChainInstalled = await KeyChainSDK.isKeyChainInstalled();
        // console.log({ isKeyChainInstalled });

        // const encodeMessage = await KeyChainSDK.requestEncodeMessage(
        //   'keychain.tests',
        //   'theghost1980',
        //   '#Hi there man!',
        //   'memo',
        // );
        // console.log({ encodeMessage });

        // const verifyKey = await KeyChainSDK.requestVerifyKey(
        //   'keychain.tests',
        //   '#JnyQbbpLdRBT8ev7SALsNru6c4bftPCf4c6AkTN42YTc52aDvcRqKVqK6yMhRAGhW8fbasR8xz14ofs63WXLP6nxDndKsBMkmg7UsAS9ucTDrKFoZkuJFCyvLmksyCYgD',
        //   'memo',
        // );
        // console.log({ verifyKey });

        // const signBuffer = await KeyChainSDK.requestSignBuffer(
        //   'keychain.tests',
        //   'message!!',
        //   'active',
        //   undefined,
        //   'Login in Into Saturnoman.com\nProceed?',
        // );
        // console.log({ signBuffer });

        const login = await KeyChainSDK.login(
          'keychain.tests',
          undefined,
          'posting',
          undefined,
          'Saturnoman.com',
        );
        console.log({ login });

        // const addAccountAuthority =
        //   await KeyChainSDK.requestAddAccountAuthority(
        //     'keychain.tests',
        //     'sexosentido',
        //     'posting',
        //     1,
        //   );
        // console.log({ addAccountAuthority });

        // const removeAccountAuthority =
        //   await KeyChainSDK.requestRemoveAccountAuthority(
        //     'keychain.tests',
        //     'sexosentido',
        //     'posting',
        //   );
        // console.log({ removeAccountAuthority });

        // const addKeyAuthority = await KeyChainSDK.requestAddKeyAuthority(
        //   'keychain.tests',
        //   'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
        //   'posting',
        //   1,
        // );
        // console.log({ addKeyAuthority });

        // const removeKeyAuthority = await KeyChainSDK.requestRemoveKeyAuthority(
        //   'keychain.tests',
        //   'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
        //   'posting',
        // );
        // console.log({ removeKeyAuthority });

        // const broadcast = await KeyChainSDK.requestBroadcast(
        //   'keychain.tests',
        //   [
        //     [
        //       'transfer',
        //       {
        //         from: 'keychain.tests',
        //         to: 'theghost1980',
        //         amount: '0.001 HIVE',
        //         memo: 'testing keychain SDK - requestBroadcast',
        //       },
        //     ],
        //   ],
        //   'active',
        // );
        // console.log({ broadcast });

        // const signTx = await KeyChainSDK.requestSignTx(
        //   'keychain.tests',
        //   {
        //     ref_block_num: 11000,
        //     ref_block_prefix: 112233,
        //     expiration: new Date().toISOString(),
        //     extensions: [],
        //     operations: [
        //       [
        //         'transfer',
        //         {
        //           from: 'keychain.tests',
        //           to: 'theghost1980',
        //           amount: '0.001 HIVE',
        //           memo: 'testing keychain SDK - requestBroadcast',
        //         },
        //       ],
        //     ],
        //   },
        //   'active',
        // );
        // console.log({ signTx });

        // const signedCall = await KeyChainSDK.requestSignedCall(
        //   'keychain.tests',
        //   'method',
        //   'params',
        //   'active',
        // );
        // console.log({ signedCall });

        //         keychain.requestPost(
        //           'stoodkev',
        //           'Hello World!',
        //           '## This is a blog post \
        // \
        // And this is some text',
        //           'Blog',
        //           null,
        //           { format: 'markdown', description: 'A blog post', tags: ['Blog'] },
        //           'hello-world',
        //           {
        //             author: 'stoodkev',
        //             permlink: 'hi',
        //             max_accepted_payout: '100000.000 SBD',
        //             percent_steem_dollars: 10000,
        //             allow_votes: true,
        //             allow_curation_rewards: true,
        //             extensions: [
        //               [
        //                 0,
        //                 {
        //                   beneficiaries: [
        //                     { account: 'yabapmatt', weight: 1000 },
        //                     { account: 'steemplus-pay', weight: 500 },
        //                   ],
        //                 },
        //               ],
        //             ],
        //           },
        //           (response) => {
        //             console.log(response);
        //           },
        //         );

        //TODO this one need to be completed & tested
        // const post = await KeyChainSDK.requestPost(
        //   'keychain.tests',
        //   'Tha best post',
        //   'Body:  Keychain SDK v1.0Hive Keychain TEAM :D',
        //   [],
        //   [],
        //   { format: 'markdown', description: 'A blog post', tags: ['Blog'] },
        //   'hello-world',
        //   {
        //     author: 'keychain.tests',
        //     permlink: 'hi',
        //     max_accepted_payout: '100000.000 SBD',
        //     percent_steem_dollars: 10000,
        //     allow_votes: true,
        //     allow_curation_rewards: true,
        //     extensions: [
        //       [
        //         0,
        //         {
        //           beneficiaries: [{ account: 'yabapmatt', weight: 1000 }],
        //         },
        //       ],
        //     ],
        //   },
        // );
        // console.log({ post });

        // const vote = await KeyChainSDK.requestVote(
        //   'keychain.tests',
        //   '3speak-major-announcement-or-refactor-or-3speak-v20',
        //   'threespeak',
        //   10000,
        // );
        // console.log({ vote });

        // const custom_json = await KeyChainSDK.requestCustomJson(
        //   undefined,
        //   'sm_market_rent',
        //   'Active',
        //   JSON.stringify({
        //     items: ['9292cd44ccaef8b73a607949cc787f1679ede10b-93'],
        //     currency: 'DEC',
        //     days: 1,
        //   }),
        //   'Rent 1 card on Splinterlands',
        // );
        // console.log({ custom_json });

        // const transfer = await KeyChainSDK.requestTransfer(
        //   'keychain.tests',
        //   'theghost1980',
        //   '0.001',
        //   'pa los frescos',
        //   'HIVE',
        // );
        // console.log({ transfer });

        // const sendToken = await KeyChainSDK.requestSendToken(
        //   'keychain.tests',
        //   'theghost1980',
        //   '0.001',
        //   'frescos',
        //   'LEO',
        // );
        // console.log({ sendToken });

        // const delegation = await KeyChainSDK.requestDelegation(
        //   'keychain.tests',
        //   'theghost1980',
        //   '1.000',
        //   'HP',
        // );
        // console.log({ delegation });

        // const witnessVote = await KeyChainSDK.requestWitnessVote(
        //   undefined,
        //   'stoodkev',
        //   false,
        // );
        // console.log({ witnessVote });

        // const proxy = await KeyChainSDK.requestProxy(undefined, 'stoodkev');
        // console.log({ proxy });

        // const powerUp = await KeyChainSDK.requestPowerUp(
        //   'keychain.tests',
        //   'keychain.tests',
        //   '1.000',
        // );
        // console.log({ powerUp });

        // const powerDown = await KeyChainSDK.requestPowerDown(
        //   'keychain.tests',
        //   '0.500',
        // );
        // console.log({ powerDown });

        // keychain.requestCustomJson(
        //   null,
        //   'sm_market_rent',
        //   'Active',
        //   JSON.stringify({
        //     items: ['9292cd44ccaef8b73a607949cc787f1679ede10b-93'],
        //     currency: 'DEC',
        //     days: 1,
        //   }),
        //   'Rent 1 card on Splinterlands',
        //   (response) => {
        //     console.log(response);
        //   },
        // );
        // window.hive_keychain.requestEncodeMessage(
        //   'keychain.tests',
        //   'theghost1980',
        //   '#Hi there man!',
        //   'Memo',
        //   (result) => {
        //     console.log({ result });
        //   },
        // );
      }
    };

    window.addEventListener('load', onLoadHandler);

    return () => {
      window.removeEventListener('load', onLoadHandler);
    };
  });
  //end useful hook.

  // const init = async () => {
  //   // const isEnabled = await KeyChainSDK.isKeychainEnabled();
  //   // console.log({ isEnabled });
  //   // console.log(await KeyChainSDK.readLocalStorage());

  //   //storage tests
  //   const hS = await KeyChainSDK.isKeyChainInstalled();
  //   console.log({ hS });
  //   // chrome.storage.local.get(['key']).then((result) => {
  //   //   console.log('Value currently is ' + result.key);
  //   // });

  //   // window.hive_keychain.requestHandshake(function (some) {
  //   //   console.log('Handshake received! ', { some });
  //   // });
  // };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
