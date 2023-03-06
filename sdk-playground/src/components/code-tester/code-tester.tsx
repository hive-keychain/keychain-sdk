import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  RequestAddAccount,
  RequestAddAccountAuthority,
  RequestBroadcast,
  RequestConvert,
  RequestCreateClaimedAccount,
  RequestCreateProposal,
  RequestCustomJSON,
  RequestDelegation,
  RequestEncode,
  RequestPowerDown,
  RequestPowerUp,
  RequestProxy,
  RequestRecurrentTransfer,
  RequestRemoveProposal,
  RequestSendToken,
  RequestSignTx,
  RequestTransfer,
  RequestUpdateProposalVote,
  RequestVote,
  RequestWitnessVote,
} from 'hive-keychain-commons';

type Props = {};

const CodeTester = (props: Props) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //////////////////////
    //copy & paste here///
    try {
      const sdk = new KeychainSDK(window);
      const formParamsAsObject = {
        data: {
          username: 'keychain.tests',
          to: 'theghost1980',
          amount: '1.000',
          currency: 'HIVE',
          memo: '#Encrypted memo sample',
          recurrence: 24,
          executions: 2,
        },
        options: {},
      };
      const requestRecurrentTransfer = await sdk.recurrentTransfer(
        formParamsAsObject.data as ExcludeCommonParams<RequestRecurrentTransfer>,
        formParamsAsObject.options,
      );
      console.log({ requestRecurrentTransfer });
    } catch (error) {
      console.log({ error });
    }
    //end copy/paste//////
    //////////////////////
  };
  return (
    <Card className="d-flex justify-content-center mt-3 w-50">
      <Card.Header as={'h5'}>Request COPY/PASTE code tester</Card.Header>
      <Card.Body>
        <Card.Text>Instructions: ---- </Card.Text>
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
