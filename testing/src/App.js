/*global chrome*/
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const KeyChainLIB = require('keychain-sdk');
const { KeyChain } = KeyChainLIB;

function App() {
  const KeyChainSDK = new KeyChain(window, { rpc: 'DEFAULT' });

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

        const signBuffer = await KeyChainSDK.requestSignBuffer(
          'keychain.tests',
          '',
          'active',
          undefined,
          'Login in Into Saturnoman.com\nProceed?',
        );
        console.log({ signBuffer });

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
