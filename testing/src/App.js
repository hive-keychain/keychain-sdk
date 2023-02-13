/*global chrome*/
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';

function App() {
  //using DEFAULT RPC.
  // const KeychainSDK = new KeychainSDK(window, { rpc: 'DEFAULT' });

  // no RPC
  const sdk = new KeychainSDK(window);

  // tests on requestHandshake
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
      try {
        const login = await sdk.login(
          {
            username: undefined,
            message: 'message!!',
            method: 'Active',
            title: 'Login in Into Saturnoman.com\nProceed?',
          },
          {},
        );
        console.log({ login });
      } catch (error) {
        console.log({ error });
      }
    };

    window.addEventListener('load', onLoadHandler);

    return () => {
      window.removeEventListener('load', onLoadHandler);
    };
  });

  //end useful hook.

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
