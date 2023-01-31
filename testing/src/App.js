/*global chrome*/
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import { Asset } from '@hiveio/dhive';

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
  //using DEFAULT RPC.
  // const KeyChainSDK = new KeychainSDK(window, { rpc: 'DEFAULT' });

  // no RPC
  const KeyChainSDK = new KeychainSDK(window);

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
      // const encodeMessage = await KeyChainSDK.requestEncodeMessage(
      //   'keychain.tests',
      //   'theghost1980',
      //   '#Hi there man!',
      //   'memo',
      // );
      // console.log({ encodeMessage });

      // if (window.hive_keychain) {
      //   console.log('It should has it!!');
      //   // const isKeyChainInstalled = await KeyChainSDK.isKeyChainInstalled();
      //   // console.log({ isKeyChainInstalled });

      // const encodeMessage = await KeyChainSDK.requestEncodeMessage(
      //   'keychain.tests',
      //   'theghost1980',
      //   '#Hi there man!',
      //   'memo',
      // );
      // console.log({ encodeMessage });

      //   // const verifyKey = await KeyChainSDK.requestVerifyKey(
      //   //   'keychain.tests',
      //   //   '#JnyQbbpLdRBT8ev7SALsNru6c4bftPCf4c6AkTN42YTc52aDvcRqKVqK6yMhRAGhW8fbasR8xz14ofs63WXLP6nxDndKsBMkmg7UsAS9ucTDrKFoZkuJFCyvLmksyCYgD',
      //   //   'memo',
      //   // );
      //   // console.log({ verifyKey });

      // const signBuffer = await KeyChainSDK.requestSignBuffer(
      //   {
      //     account: undefined,
      //     message: 'message!!',
      //     key: 'active',
      //   },
      //   {
      //     rpc: undefined,
      //     title: 'Login in Into Saturnoman.com\nProceed?',
      //   },
      // );
      // console.log({ signBuffer });

      // const login = await KeyChainSDK.login(
      //   {
      //     account: undefined,
      //     message: undefined,
      //     key: 'posting',
      //   },
      //   {
      //     rpc: undefined,
      //     title: 'Saturnoman.com',
      //   },
      // );
      // console.log({ login });

      // const addAccountAuthority = await KeyChainSDK.requestAddAccountAuthority(
      //   {
      //     account: 'keychain.tests',
      //     authorizedUsername: 'sexosentido',
      //     role: 'posting',
      //     weight: 1,
      //   },
      //   {},
      // );
      // console.log({ addAccountAuthority });

      // const removeAccountAuthority =
      //   await KeyChainSDK.requestRemoveAccountAuthority(
      //     {
      //       account: 'keychain.tests',
      //       authorizedUsername: 'sexosentido',
      //       role: 'posting',
      //     },
      //     {},
      //   );
      // console.log({ removeAccountAuthority });

      // const addKeyAuthority = await KeyChainSDK.requestAddKeyAuthority(
      //   {
      //     account: 'keychain.tests',
      //     authorizedKey:
      //       'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
      //     role: 'posting',
      //     weight: 1,
      //   },
      //   {},
      // );
      // console.log({ addKeyAuthority });

      // const removeKeyAuthority = await KeyChainSDK.requestRemoveKeyAuthority(
      //   {
      //     account: 'keychain.tests',
      //     authorizedKey:
      //       'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
      //     role: 'posting',
      //   },
      //   {},
      // );
      // console.log({ removeKeyAuthority });

      // const broadcast = await KeyChainSDK.requestBroadcast(
      //   {
      //     account: 'keychain.tests',
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
      //     key: 'active',
      //   },
      //   {},
      // );
      // console.log({ broadcast });

      // const signTx = await KeyChainSDK.requestSignTx(
      //   {
      //     account: 'keychain.tests',
      //     tx: {
      //       ref_block_num: 11000,
      //       ref_block_prefix: 112233,
      //       expiration: new Date().toISOString(),
      //       extensions: [],
      //       operations: [
      //         [
      //           'transfer',
      //           {
      //             from: 'keychain.tests',
      //             to: 'theghost1980',
      //             amount: '0.001 HIVE',
      //             memo: 'testing keychain SDK - requestBroadcast',
      //           },
      //         ],
      //       ],
      //     },
      //     key: 'active',
      //   },
      //   {},
      // );
      // console.log({ signTx });

      // const signedCall = await KeyChainSDK.requestSignedCall(
      //   {
      //     account: 'keychain.tests',
      //     method: 'method',
      //     params: 'params',
      //     key: 'active',
      //   },
      //   {},
      // );
      // console.log({ signedCall });

      //   //TODO this one need to be completed & tested
      const post = await KeyChainSDK.requestPost(
        {
          account: 'stoodkev',
          title: 'Hello World!',
          body: '## This is a blog post n And this is some text',
          parent_perm: 'Blog',
          parent_account: [],
          json_metadata: {
            format: 'markdown',
            description: 'A blog post',
            tags: ['Blog'],
          },
          permlink: 'hello-world',
          comment_options: {
            author: 'stoodkev',
            permlink: 'hi-there',
            max_accepted_payout: '100000.000 SBD',
            percent_steem_dollars: 10000,
            allow_votes: true,
            allow_curation_rewards: true,
            extensions: [
              [
                0,
                {
                  beneficiaries: [
                    { account: 'yabapmatt', weight: 1000 },
                    { account: 'steemplus-pay', weight: 500 },
                  ],
                },
              ],
            ],
          },
        },
        {},
      );
      console.log({ post });

      // const vote = await KeyChainSDK.requestVote(
      //   {
      //     0: 'vote',
      //     1: {
      //       voter: 'keychain.tests',
      //       author: 'khaleelkazi',
      //       permlink: 'wuswihum',
      //       weight: 10000,
      //     },
      //   },
      //   {},
      // );
      // console.log({ vote });

      // const custom_json = await KeyChainSDK.requestCustomJson(
      //   {
      //     0: 'custom_json',
      //     1: {
      //       id: '1',
      //       json: JSON.stringify({
      //         items: ['9292cd44ccaef8b73a607949cc787f1679ede10b-93'],
      //         currency: 'DEC',
      //         days: 1,
      //       }),
      //       account: undefined,
      //       key: 'Posting',
      //       display_msg: 'rent a card man!',
      //     },
      //   },
      //   {},
      // );
      // console.log({ custom_json });

      // const transfer = await KeyChainSDK.requestTransfer(
      //   {
      //     0: 'transfer',
      //     1: {
      //       from: 'keychain.tests',
      //       amount: '10 HIVE',
      //       // amount: new Asset(10, 'HIVE'),
      //       to: 'theghost1980',
      //       memo: 'Test Keychain SDK transfer',
      //     },
      //   },
      //   {},
      // );
      // console.log({ transfer });

      //   // const sendToken = await KeyChainSDK.requestSendToken(
      //   //   'keychain.tests',
      //   //   'theghost1980',
      //   //   '0.001',
      //   //   'frescos',
      //   //   'LEO',
      //   // );
      //   // console.log({ sendToken });

      // const delegation = await KeyChainSDK.requestDelegation(
      //   {
      //     account: undefined,
      //     delegatee: 'theghost1980',
      //     // amount: '1.000',
      //     // amount: '1 HP',
      //     amount: new Asset(1, 'HP'),
      //     unit: 'HP',
      //   },
      //   {},
      // );
      // console.log({ delegation });

      // const witnessVote2 = await KeyChainSDK.requestWitnessVote(
      //   {
      //     0: 'account_witness_vote',
      //     1: {
      //       account: 'keychain.tests',
      //       witness: 'stoodkev',
      //       approve: false,
      //     },
      //   },
      //   {},
      // );
      // console.log({ witnessVote2 });

      // const proxy = await KeyChainSDK.requestProxy(
      //   {
      //     0: 'account_witness_proxy',
      //     1: {
      //       account: 'keychain.tests',
      //       proxy: 'stoodkev',
      //     },
      //   },
      //   'stoodkev',
      // );
      // console.log({ proxy });

      //   // const powerUp = await KeyChainSDK.requestPowerUp(
      //   //   'keychain.tests',
      //   //   'keychain.tests',
      //   //   '0.500',
      //   // );
      //   // console.log({ powerUp });

      //   // const powerDown = await KeyChainSDK.requestPowerDown(
      //   //   'keychain.tests',
      //   //   '0.100',
      //   // );
      //   // console.log({ powerDown });

      // const conversionCollateralized = await KeyChainSDK.requestConversion(
      //   'keychain.tests',
      //   '0.001',
      //   true,
      // );
      // console.log({ conversionCollateralized });

      //   // const conversion = await KeyChainSDK.requestConversion(
      //   //   'keychain.tests',
      //   //   '0.001',
      //   //   false,
      //   // );
      //   // console.log({ conversion });

      // const recurrentTransfer = await KeyChainSDK.requestRecurrentTransfer(
      //   {
      //     0: 'recurrent_transfer',
      //     1: {
      //       from: 'keychain.tests',
      //       to: 'theghost1980',
      //       amount: new Asset(0.1, 'HIVE'),
      //       memo: 'Keychain SDK tests rt',
      //       recurrence: 24,
      //       executions: 2,
      //       extensions: [],
      //     },
      //   },
      //   {},
      // );
      // console.log({ recurrentTransfer });

      // const updateProposalVote = await KeyChainSDK.requestUpdateProposalVote(
      //   {
      //     0: 'update_proposal_votes',
      //     1: {
      //       voter: 'keychain.tests',
      //       proposal_ids: [216],
      //       approve: true,
      //       extensions: [],
      //     },
      //   },
      //   {},
      // );
      // console.log({ updateProposalVote });

      // }
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
