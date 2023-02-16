import React, { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestAddAccountAuthority,
  RequestAddKeyAuthority,
  RequestBroadcast,
  RequestRemoveAccountAuthority,
  RequestSignBuffer,
} from 'hive-keychain-commons';
import { Button, Card, Form } from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';

type Props = {
  setRequestResult: any; //TODO add proper type
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestBroadcast> = {
  username: '',
  operations: '',
  method: KeychainKeyTypes.active,
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['']; //none to check

//TODO clean up
const Requestbroadcast = ({ setRequestResult }: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestBroadcast>;
    options: KeychainOptions;
  }>({
    data: DEFAULT_PARAMS,
    options: DEFAULT_OPTIONS,
  });

  //TODO bellow add proper event type
  const handleFormParams = (e: any) => {
    const { name, value } = e.target;
    let tempValue =
      undefinedParamsToValidate.findIndex((param) => param === name) !== -1 &&
      value.trim() === ''
        ? undefined
        : value;
    if (
      Object.keys(formParams.data).findIndex((param) => param === name) !== -1
    ) {
      //TODO find another approach for this, maybe
      //  easier just to allow user to construct the operation having
      //      - inputs for each part
      //      - select for operation
      //          - depending on selected, may display required params as array???
      //operations validation
      if (name === 'operations') {
        //  '[["transfer",{"from":"keychain.tests","to":"theghost1980","amount":"0.001HIVE","memo":"testingkeychainSDK-requestBroadcast",},],]'

        tempValue = JSON.stringify(String(tempValue).replaceAll(' ', ''));
        console.log({ tempValue });
      }
      //end validation
      setFormParams((prevFormParams) => ({
        ...prevFormParams,
        data: { ...prevFormParams.data, [name]: tempValue },
      }));
    } else {
      setFormParams((prevFormParams) => ({
        ...prevFormParams,
        options: { ...prevFormParams.options, [name]: tempValue },
      }));
    }
  };
  //TODO bellow add proper event type
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //testcode
    // const opsArray = [
    //   [
    //     'transfer',
    //     {
    //       from: 'keychain.tests',
    //       to: 'theghost1980',
    //       amount: '0.001 HIVE',
    //       memo: 'testing keychain SDK - requestBroadcast',
    //     },
    //   ],
    // ];
    // const opsAsString = JSON.stringify(opsArray);
    // formParams['data']['operations'] = opsAsString;
    //end testcode
    console.log('about to process ...: ', { formParams });
    try {
      const broadcast = await sdk.requestBroadcast(
        formParams.data,
        formParams.options,
      );
      setRequestResult(broadcast);
      console.log({ broadcast });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };
  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Generic Broadcast</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username @</Form.Label>
            <Form.Control
              placeholder="Hive username to perform the request"
              name="username"
              value={formParams.data.username}
              onChange={handleFormParams}
            />
          </Form.Group>

          {/* //TODO finish this bellow */}
          <Form.Group className="mb-3" controlId="formBasicOperations">
            <Form.Label>Operations</Form.Label>
            <Form.Control
              //   as="textarea"
              //   rows={3}
              placeholder="Operation to broadcast, see example on sdk.requestBroadcast"
              name="operations"
              defaultValue={''}
              //   value={formParams.data.operations as string}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicOptions">
            <Form.Label>Rpc</Form.Label>
            <Form.Control
              placeholder="Rpc node to broadcast - optional"
              name="rpc"
              value={formParams.options.rpc}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-1">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Requestbroadcast;
