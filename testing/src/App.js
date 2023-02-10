/*global chrome*/
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Asset } from '@hiveio/dhive';
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
  //using DEFAULT RPC.
  // const KeychainSDK = new KeychainSDK(window, { rpc: 'DEFAULT' });

  // no RPC
  const sdk = new KeychainSDK(window);

  // console.log(generateRandomString());
  // tests on requestHandshake
  useEffect(() => {
    const onLoadHandler = async () => {
      console.log('Fully loaded!');
      if (window.hive_keychain) {
        console.log('It should has it!!');
        const cbPromise = function () {
          return new Promise((resolve, rejects) => {
            console.log('Waited and resolved!');
            resolve(true);
          });
        };
        window.hive_keychain.requestHandshake(
          cbPromise().then((value) => {
            console.log({ value });
          }),
        );
      }
    };
    window.addEventListener('load', onLoadHandler);
  });

  //end tests

  //Stays as useful hook that may be
  //used as SDK on Hooks for: ReactJS, ANG, etc

  useEffect(() => {
    const onLoadHandler = async () => {
      console.log('Fully loaded!');

      // try {
      //   const encodeMessage = await KeychainSDK.requestEncodeMessage({
      //     username: 'keychain.tests',
      //     receiver: 'theghost1980',
      //     message: '#Hi there man!',
      //     method: 'Memo',
      //   });
      //   console.log({ encodeMessage });
      // } catch (error) {
      //   console.log({ error });
      // }

      // if (window.hive_keychain) {
      //   console.log('It should has it!!');
      //   // const isKeyChainInstalled = await KeychainSDK.isKeyChainInstalled();
      //   // console.log({ isKeyChainInstalled });

      // try {
      //   const encodeMessage = await KeychainSDK.requestEncodeMessage({
      //     username: 'keychain.tests',
      //     receiver: 'theghost1980',
      //     message: '#Hi there man!',
      //     method: 'Memo',
      //   });
      //   console.log({ encodeMessage });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const addAccount = await KeychainSDK.requestAddAccount(
      //     {
      //       username: 'keychain.tests',
      //       keys: {
      //         active: '5d...',
      //         posting: '5fg...',
      //         memo: '5rfD...',
      //       },
      //     },
      //     {},
      //   );
      //   console.log({ addAccount });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const verifyKey = await KeychainSDK.requestVerifyKey({
      //     username: 'keychain.tests',
      //     message:
      //       '#JnyQbbpLdRBT8ev7SALsNru6c4bftPCf4c6AkTN42YTc52aDvcRqKVqK6yMhRAGhW8fbasR8xz14ofs63WXLP6nxDndKsBMkmg7UsAS9ucTDrKFoZkuJFCyvLmksyCYgD',
      //     method: 'memo',
      //   });
      //   console.log({ verifyKey });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const signBuffer = await KeychainSDK.requestSignBuffer(
      //     {
      //       username: undefined,
      //       message: 'message!!',
      //       method: 'Active',
      //       title: 'Login in Into Saturnoman.com\nProceed?',
      //     },
      //     {},
      //   );
      //   console.log({ signBuffer });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const login = await KeychainSDK.login(
      //     {
      //       username: undefined,
      //       message: 'Log into my website',
      //       method: 'posting',
      //       title: 'Saturnoman.com',
      //     },
      //     {},
      //   );
      //   console.log({ login });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const addAccountAuthority =
      //     await KeychainSDK.requestAddAccountAuthority(
      //       {
      //         username: 'keychain.tests',
      //         authorizedUsername: 'sexosentido',
      //         role: 'posting',
      //         weight: 1,
      //       },
      //       {},
      //     );
      //   console.log({ addAccountAuthority });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const removeAccountAuthority =
      //     await KeychainSDK.requestRemoveAccountAuthority(
      //       {
      //         username: 'keychain.tests',
      //         authorizedUsername: 'sexosentido',
      //         role: 'posting',
      //       },
      //       {},
      //     );
      //   console.log({ removeAccountAuthority });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const addKeyAuthority = await KeychainSDK.requestAddKeyAuthority(
      //     {
      //       username: 'keychain.tests',
      //       authorizedKey:
      //         'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
      //       role: 'posting',
      //       weight: 1,
      //     },
      //     {},
      //   );
      //   console.log({ addKeyAuthority });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const removeKeyAuthority = await KeychainSDK.requestRemoveKeyAuthority(
      //     {
      //       username: 'keychain.tests',
      //       authorizedKey:
      //         'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
      //       role: 'posting',
      //     },
      //     {},
      //   );
      //   console.log({ removeKeyAuthority });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const broadcast = await KeychainSDK.requestBroadcast(
      //     {
      //       username: 'keychain.tests',
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
      //       method: 'active',
      //     },
      //     {},
      //   );
      //   console.log({ broadcast });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const signTx = await KeychainSDK.requestSignTx(
      //     {
      //       username: 'keychain.tests',
      //       tx: {
      //         // ref_block_num: 11001,
      //         // ref_block_prefix: 112234,
      //         // expiration: new Date().toISOString(),
      //         // extensions: [],
      //         // operations: [
      //         //   [
      //         //     'vote',
      //         //     {
      //         //       voter: 'keychain.tests',
      //         //       author: 'missdeli',
      //         //       permlink:
      //         //         'family-of-three-some-of-our-food-this-week-week-4',
      //         //       weight: 10000,
      //         //     },
      //         //   ],
      //         // ],
      //       },
      //       method: 'active',
      //     },
      //     {},
      //   );
      //   console.log({ signTx });
      // } catch (error) {
      //   console.log({ error });
      // }

      // const signedCall = await KeychainSDK.requestSignedCall(
      //   {
      //     account: 'keychain.tests',
      //     method: 'method',
      //     params: 'params',
      //     key: 'active',
      //   },
      //   {},
      // );
      // console.log({ signedCall });

      // try {
      //   const post = await KeychainSDK.requestPost(
      //     {
      //       username: 'keychain.tests',
      //       title: 'Keychain SDK 3!',
      //       body: '## This is a blog post n And this is some text. Testing the brand new Keychain SDK v1.0',
      //       parent_perm: 'blog',
      //       parent_username: '',
      //       json_metadata: JSON.stringify({
      //         format: 'markdown',
      //         description: 'A blog post',
      //         tags: ['Blog'],
      //       }),
      //       permlink: 'a-post-by-keychaintests-fifth-part-post',
      //       comment_options: JSON.stringify({
      //         author: 'keychain.tests',
      //         permlink: 'a-post-by-keychaintests-fifth-part-post',
      //         max_accepted_payout: '10000.000 SBD',
      //         allow_votes: true,
      //         allow_curation_rewards: true,
      //         extensions: [],
      //         percent_hbd: 63,
      //       }),
      //     },
      //     {},
      //   );
      //   console.log({ post });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const vote = await KeychainSDK.requestVote(
      //     {
      //       username: 'keychain.tests',
      //       author: 'keychain.tests',
      //       permlink: 'a-post-by-keychaintests-fifth-part-post',
      //       weight: 10000,
      //     },
      //     {},
      //   );
      //   console.log({ vote });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const custom_json = await KeychainSDK.requestCustomJson(
      //     {
      //       username: undefined,
      //       id: '1',
      //       method: 'Posting',
      //       json: JSON.stringify({
      //         items: ['9292cd44ccaef8b73a607949cc787f1679ede10b-93'],
      //         currency: 'DEC',
      //         days: 1,
      //       }),
      //       display_msg: 'rent a card man!',
      //     },
      //     {},
      //   );
      //   console.log({ custom_json });
      // } catch (error) {
      //   console.log('error custom_json: ', error);
      // }

      // try {
      //   const transfer = await KeychainSDK.requestTransfer(
      //     {
      //       username: 'theghost1980',
      //       to: 'keychain.tests',
      //       amount: '1.000',
      //       memo: 'Test Keychain SDK transfer',
      //       enforce: false,
      //       currency: 'HIVE',
      //     },
      //     {},
      //   );
      //   console.log({ transfer });
      // } catch (error) {
      //   console.log('error transfer: ', error);
      // }

      // try {
      //   const sendToken = await KeychainSDK.requestSendToken(
      //     {
      //       username: 'keychain.tests',
      //       to: 'theghost1980',
      //       amount: '0.001',
      //       memo: 'frescos',
      //       currency: 'LEO',
      //     },
      //     {},
      //   );
      //   console.log({ sendToken });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const delegation = await KeychainSDK.requestDelegation(
      //     {
      //       username: undefined,
      //       delegatee: 'keychain.tests',
      //       amount: '1.000',
      //       unit: 'HP',
      //     },
      //     {},
      //   );
      //   console.log({ delegation });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const witnessVote = await KeychainSDK.requestWitnessVote(
      //     {
      //       username: 'keychain.tests',
      //       witness: 'stoodkev',
      //       vote: true,
      //     },
      //     {},
      //   );
      //   console.log({ witnessVote });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const proxy = await KeychainSDK.requestProxy(
      //     {
      //       username: 'keychain.tests',
      //       proxy: 'stoodkev',
      //     },
      //     {},
      //   );
      //   console.log({ proxy });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const powerUp = await KeychainSDK.requestPowerUp(
      //     {
      //       username: 'keychain.tests',
      //       recipient: 'keychain.tests',
      //       hive: '0.001',
      //     },
      //     {},
      //   );
      //   console.log({ powerUp });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const powerDown = await KeychainSDK.requestPowerDown(
      //     {
      //       username: 'keychain.tests',
      //       hive_power: '0.001',
      //     },
      //     {},
      //   );
      //   console.log({ powerDown });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const conversionCollateralized = await KeychainSDK.requestConversion(
      //     {
      //       username: 'keychain.tests',
      //       amount: '1.000',
      //       collaterized: true,
      //     },
      //     {},
      //   );
      //   console.log({ conversionCollateralized });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const recurrentTransfer = await KeychainSDK.requestRecurrentTransfer(
      //     {
      //       username: 'keychain.tests',
      //       to: 'theghost1980',
      //       amount: '1.000',
      //       currency: 'HIVE',
      //       memo: 'Keychain SDK tests rt',
      //       recurrence: 24,
      //       executions: 2,
      //       extensions: [],
      //     },
      //     {},
      //   );
      //   console.log({ recurrentTransfer });
      // } catch (error) {
      //   console.log({ error});
      // }

      // const updateProposalVote = await KeychainSDK.requestUpdateProposalVote(
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
  //   // const isEnabled = await KeychainSDK.isKeychainEnabled();
  //   // console.log({ isEnabled });
  //   // console.log(await KeychainSDK.readLocalStorage());

  //   //storage tests
  //   const hS = await KeychainSDK.isKeyChainInstalled();
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
