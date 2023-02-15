import React, { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';

type Props = {
  setEnabledKeychain: React.Dispatch<React.SetStateAction<boolean>>;
};
//TODO clean up
const Keychainchecker = ({ setEnabledKeychain }: Props) => {
  const sdk = new KeychainSDK(window);
  const [keychainInstalled, setKeychainInstalled] = useState(false);
  //   const [detecting, setDetecting] = useState(true);

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
      //   setDetecting(false);
    };

    window.addEventListener('load', onLoadHandler);

    return () => {
      window.removeEventListener('load', onLoadHandler);
    };
  });
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          href="home"
          title={
            keychainInstalled
              ? 'Good to play with requests'
              : 'Install keychain or reload extension on settings.'
          }>
          {keychainInstalled ? 'Keychain Detected' : 'Not Detected'}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Keychainchecker;
