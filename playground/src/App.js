/*global chrome*/
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import Keychainchecker from './components/Keychain-checker/Keychain-checker';
import RequestSelector from './components/Request-selector/Request-selector';

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
  //end // tests on requestHandshake

  //Stays as useful hook that may be
  // useEffect(() => {
  //   const onLoadHandler = async () => {
  //     console.log('Fully loaded!');
  //     try {
  //       const isInstalled = await sdk.isKeyChainInstalled();
  //       console.log({ isInstalled });
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   };

  //   window.addEventListener('load', onLoadHandler);

  //   return () => {
  //     window.removeEventListener('load', onLoadHandler);
  //   };
  // });

  //end useful hook.

  const [requestResult, setRequestResult] = useState(undefined);
  const [expandDataResult, setExpandDataResult] = useState(false);
  const [enabledKeychain, setEnabledKeychain] = useState(false);

  return (
    <div className="App">
      <Keychainchecker setEnabledKeychain={setEnabledKeychain} />
      <RequestSelector
        setRequestResult={setRequestResult}
        enabledKeychain={enabledKeychain}
      />
      {/* //TODO move bellow to a component */}
      {requestResult && (
        <div
          className={`request-result-container ${
            requestResult.error ? 'err' : ''
          }`}>
          <div>Success: {requestResult.success.toString()}</div>
          {requestResult.error && (
            <div>
              Error:{' '}
              {typeof requestResult.error === 'object'
                ? JSON.stringify(requestResult.error)
                : requestResult.error}
            </div>
          )}
          <div>Result: {requestResult.result}</div>
          <div>Data...</div>
          <button onClick={() => setExpandDataResult(!expandDataResult)}>
            click to expand
          </button>
          {expandDataResult && (
            <div>
              <div>Key: {requestResult.data.key}</div>
              <div>Message: {requestResult.data.message}</div>
              <div>Method: {requestResult.data.method}</div>
              <div>Receiver: {requestResult.data.receiver}</div>
              <div>Request_id: {requestResult.data.request_id}</div>
              <div>Type: {requestResult.data.type}</div>
              <div>Username: {requestResult.data.username}</div>
            </div>
          )}

          <div>Message: {requestResult.message}</div>
          <div>Request_id: {requestResult.request_id}</div>
          {requestResult.publicKey && (
            <div>PublicKey: {requestResult.publicKey}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
