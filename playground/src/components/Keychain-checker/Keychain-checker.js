import React, { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import './Keychain-checker.css';
import CustomIcon from '../Custom-icon/Custom-icon';

export default function Keychainchecker({ setEnabledKeychain }) {
  const sdk = new KeychainSDK(window);
  const [keychainInstalled, setKeychainInstalled] = useState();
  const [detecting, setDetecting] = useState(true);

  useEffect(() => {
    const onLoadHandler = async () => {
      console.log('Fully loaded!');
      try {
        const enabled = await sdk.isKeyChainInstalled();
        setKeychainInstalled(enabled);
        setEnabledKeychain(enabled);
      } catch (error) {
        console.log({ error });
      }
      setDetecting(false);
    };

    window.addEventListener('load', onLoadHandler);

    return () => {
      window.removeEventListener('load', onLoadHandler);
    };
  });
  return (
    <div className="checker-bar">
      {!detecting && keychainInstalled === true ? (
        <div className="row-container">
          <CustomIcon name={'green_dot'} /> KeychainDetected
        </div>
      ) : (
        <div className="row-container">
          <CustomIcon name={'red_dot'} /> Not detected, install Keychain and
          reload extension.
        </div>
      )}
    </div>
  );
}
