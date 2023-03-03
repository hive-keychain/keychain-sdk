import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  RequestAddAccountAuthority,
  RequestEncode,
} from 'hive-keychain-commons';

type Props = {};

const CodeTester = (props: Props) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //copy & paste here///
    try {
      const sdk = new KeychainSDK(window);
      const formParamsAsObject = {
        data: {
          username: 'keychain.tests',
          authorizedUsername: 'theghost1980',
          role: 'Posting',
          weight: 1,
          method: 'Active',
        },
        options: {},
      };
      const requestAddAccountAuthority = await sdk.addAccountAuthority(
        formParamsAsObject.data as ExcludeCommonParams<RequestAddAccountAuthority>,
        formParamsAsObject.options,
      );
      console.log({ requestAddAccountAuthority });
    } catch (error) {
      console.log({ error });
    }
    //end copy/paste//////
  };
  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request encode message</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Button variant="primary" type="submit" className="mt-1">
            Execute code sample request!
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CodeTester;
