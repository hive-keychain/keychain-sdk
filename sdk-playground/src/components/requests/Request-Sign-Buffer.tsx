import React, { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestSignBuffer,
} from 'hive-keychain-commons';
import { Button, Card, Form } from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';

type Props = {
  setRequestResult: any; //TODO add proper type
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestSignBuffer> = {
  username: undefined,
  message: '',
  method: KeychainKeyTypes.active,
  title: undefined,
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['username', 'title', 'rpc'];

//TODO clean up
const Requestsignbuffer = ({ setRequestResult }: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestSignBuffer>;
    options: KeychainOptions;
  }>({
    data: DEFAULT_PARAMS,
    options: DEFAULT_OPTIONS,
  });

  //TODO bellow add proper event type
  const handleFormParams = (e: any) => {
    const { name, value } = e.target;
    const tempValue =
      undefinedParamsToValidate.findIndex((param) => param === name) !== -1 &&
      value.trim() === ''
        ? undefined
        : value;
    if (
      Object.keys(formParams.data).findIndex((param) => param === name) !== -1
    ) {
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
    console.log('about to process ...: ', { formParams });
    try {
      const signBuffer = await sdk.requestSignBuffer(
        formParams.data,
        formParams.options,
      );
      setRequestResult(signBuffer);
      console.log({ signBuffer });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };
  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request sign buffer</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username @</Form.Label>
            <Form.Control
              placeholder="Hive username, leave blank for a dropdown"
              name="username"
              value={formParams.data.username}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="To encode. # is required on message"
              name="message"
              value={formParams.data.message}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Title to show in request - optional"
              name="title"
              value={formParams.data.title}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Select
              onChange={handleFormParams}
              className={'mt-1'}
              value={formParams.data.method}
              name="method">
              <option>Please select a Method</option>
              <option value={KeychainKeyTypes.active}>
                {KeychainKeyTypes.active}
              </option>
              <option value={KeychainKeyTypes.posting}>
                {KeychainKeyTypes.posting}
              </option>
              <option value={KeychainKeyTypes.memo}>
                {KeychainKeyTypes.memo}
              </option>
            </Form.Select>
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

export default Requestsignbuffer;
