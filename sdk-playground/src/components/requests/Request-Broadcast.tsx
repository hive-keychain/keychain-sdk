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
import { Operation } from '@hiveio/dhive';

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

  const [operation, setOperation] = useState(['', {}]);

  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestBroadcast>;
    options: KeychainOptions;
  }>({
    data: DEFAULT_PARAMS,
    options: DEFAULT_OPTIONS,
  });

  const handleOperation = (e: any) => {
    const { name, value } = e.target;
    if (name === 'operation_name') {
      setOperation((prevOp) => [value, prevOp[1]]);
    } else {
      // {
      //     "from": "keychain.tests",
      //     "to": "theghost1980",
      //     "amount": "0.001 HIVE",
      //     "memo": "testing keychain SDK - requestBroadcast",
      //   }
      //json
      console.log({ value });
      const json = JSON.stringify(
        String(value).replaceAll('\n', '').replaceAll(' ', ''),
      );
      console.log({ json });
      console.log({ jsonParsed: JSON.parse(json) });
      // setOperation(prevOp => [prevOp[0], value])
    }
  };

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
      //operations validation
      if (name === 'json') {
        //  '[["transfer",{"from":"keychain.tests","to":"theghost1980","amount":"0.001HIVE","memo":"testingkeychainSDK-requestBroadcast",},],]'
        tempValue = JSON.stringify(tempValue);
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
    const opsArray = [
      [
        'transfer',
        {
          from: 'keychain.tests',
          to: 'theghost1980',
          amount: '0.001 HIVE',
          memo: 'testing keychain SDK - requestBroadcast',
        },
      ],
    ] as Operation[];
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
              placeholder="Operation type"
              name="operation_name"
              //   value={operation[0]}
              onChange={handleOperation}
            />
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="JSON"
              name="json"
              //   value={JSON.stringify(operation[1]) as string}
              onChange={handleOperation}
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
