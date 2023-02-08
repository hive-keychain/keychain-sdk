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

      // try {
      //   const encodeMessage = await KeyChainSDK.requestEncodeMessage({
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
      //   // const isKeyChainInstalled = await KeyChainSDK.isKeyChainInstalled();
      //   // console.log({ isKeyChainInstalled });

      // try {
      //   const encodeMessage = await KeyChainSDK.requestEncodeMessage({
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
      //   const verifyKey = await KeyChainSDK.requestVerifyKey({
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
      //   const signBuffer = await KeyChainSDK.requestSignBuffer(
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
      //   const login = await KeyChainSDK.login(
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
      //     await KeyChainSDK.requestAddAccountAuthority(
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
      //     await KeyChainSDK.requestRemoveAccountAuthority(
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
      //   const addKeyAuthority = await KeyChainSDK.requestAddKeyAuthority(
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
      //   const removeKeyAuthority = await KeyChainSDK.requestRemoveKeyAuthority(
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
      //   const broadcast = await KeyChainSDK.requestBroadcast(
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

      try {
        const signTx = await KeyChainSDK.requestSignTx(
          {
            username: 'keychain.tests',
            tx: {
              ref_block_num: 11001,
              ref_block_prefix: 112234,
              expiration: new Date().toISOString(),
              extensions: [],
              operations: [
                [
                  'transfer',
                  {
                    from: 'keychain.tests',
                    to: 'theghost1980',
                    amount: '0.001 HIVE',
                    memo: 'testing keychain SDK - requestSignTx',
                  },
                ],
              ],
            },
            method: 'active',
          },
          {},
        );
        console.log({ signTx });
      } catch (error) {
        console.log({ error });
      }

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

      // try {
      //   const post = await KeyChainSDK.requestPost(
      //     {
      //       comment: {
      //         parent_author: '',
      //         parent_permlink: 'blog',
      //         author: 'keychain.tests',
      //         permlink: 'a-post-by-keychaintests-second-part-post-lude',
      //         title: 'Keychain SDK 1!',
      //         body: '## This is a blog post n And this is some text. Testing the brand new Keychain SDK v1.0',
      //         json_metadata: JSON.stringify({
      //           format: 'markdown',
      //           description: 'A blog post',
      //           tags: ['Blog'],
      //         }),
      //       },
      //       comment_options: {
      //         author: 'keychain.tests',
      //         permlink: 'a-post-by-keychaintests-second-part-post-lude',
      //         max_accepted_payout: '10000.000 SBD',
      //         allow_votes: true,
      //         allow_curation_rewards: true,
      //         extensions: [],
      //         percent_hbd: 63,
      //       },
      //     },
      //     {},
      //   );
      //   console.log({ post });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const vote = await KeyChainSDK.requestVote(
      //     {
      //       voter: 'keychain.tests',
      //       author: 'missdeli',
      //       permlink: 'family-of-three-some-of-our-food-this-week-week-4',
      //       weight: 10000,
      //     },
      //     {},
      //   );
      //   console.log({ vote });
      // } catch (error) {
      //   console.log({ error });
      // }

      // try {
      //   const custom_json = await KeyChainSDK.requestCustomJson(
      //     {
      //       account: undefined,
      //       id: '1',
      //       key: 'Posting',
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
      //   const transfer = await KeyChainSDK.requestTransfer(
      //     {
      //       from: 'keychain.tests',
      //       amount: new Asset(10, 'HBD'),
      //       to: 'theghost1980',
      //       memo: 'Test Keychain SDK transfer',
      //     },
      //     {},
      //   );
      //   console.log({ transfer });
      // } catch (error) {
      //   console.log('error transfer: ', error);
      // }

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
      //     delegation: {
      //       delegator: undefined,
      //       delegatee: 'theghost1980',
      //       vesting_shares: '11000.000000',
      //       // hp: '1.000',
      //     },
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

      // const powerUp = await KeyChainSDK.requestPowerUp(
      //   {
      //     from: 'keychain.tests',
      //     to: 'keychain.tests',
      //     amount: '0.001',
      //   },
      //   {},
      // );
      // console.log({ powerUp });

      // const powerDown = await KeyChainSDK.requestPowerDown(
      //   {
      //     account: 'keychain.tests',
      //     hive_power: '0.001',
      //   },
      //   {},
      // );
      // console.log({ powerDown });

      // const conversionCollateralized = await KeyChainSDK.requestConversion(
      //   {
      //     owner: 'keychain.tests',
      //     amount: '1 HIVE',
      //   },
      //   {},
      // );
      // console.log({ conversionCollateralized });

      // const conversionNonCollateralized = await KeyChainSDK.requestConversion(
      //   {
      //     owner: 'keychain.tests',
      //     amount: '1 HBD',
      //   },
      //   {},
      // );
      // console.log({ conversionNonCollateralized });

      // try {
      //   const recurrentTransfer = await KeyChainSDK.requestRecurrentTransfer(
      //     {
      //         from: 'keychain.tests',
      //         to: 'theghost1980',
      //         amount: new Asset(0.1, 'HIVE'),
      //         memo: 'Keychain SDK tests rt',
      //         recurrence: 24,
      //         executions: 2,
      //         extensions: [],
      //       },
      //     {},
      //   );
      //   console.log({ recurrentTransfer });
      // } catch (error) {
      //   console.log('error, recurrentTransfer: ', error);
      // }

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
