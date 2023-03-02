import React, { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import { Image, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import KeyChainDetectedIcon from '../assets/images/svgs/check_circle_black.svg';
import KeychainError from '../assets/images/svgs/cancel_black.svg';

type Props = {
  setEnabledKeychain: React.Dispatch<React.SetStateAction<boolean>>;
  enableLogs: boolean;
};

const KeychainCheckerComponent = ({
  setEnabledKeychain,
  enableLogs,
}: Props) => {
  const sdk = new KeychainSDK(window);
  const [keychainInstalled, setKeychainInstalled] = useState(false);

  useEffect(() => {
    const onLoadHandler = async () => {
      if (enableLogs) console.log('Fully loaded!');
      try {
        const enabled = await sdk.isKeyChainInstalled();
        setKeychainInstalled(enabled);
        setEnabledKeychain(enabled);
        if (enableLogs) console.log({ KeychainDetected: enabled });
      } catch (error) {
        console.log({ error });
      }
    };

    window.addEventListener('load', onLoadHandler);

    return () => {
      window.removeEventListener('load', onLoadHandler);
    };
  });
  return (
    <Navbar bg="light" expand="lg" className="mb-2">
      <Container className="d-flex justify-content-center">
        <Navbar.Brand
          href="home"
          title={
            keychainInstalled
              ? 'Good to play with requests'
              : 'Install keychain or reload extension on settings.'
          }>
          {keychainInstalled ? 'Keychain Detected' : 'Keychain Not Detected'}
          <Image
            src={keychainInstalled ? KeyChainDetectedIcon : KeychainError}
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default KeychainCheckerComponent;
