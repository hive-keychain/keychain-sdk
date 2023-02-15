import React, { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestEncode,
} from 'hive-keychain-commons';
import { Button, Card, Form } from 'react-bootstrap';

type Props = {
  setRequestResult: any; //TODO add proper type
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestEncode> = {
  username: '',
  receiver: '',
  message: '',
  method: KeychainKeyTypes.active,
};
//TODO clean up
const Requestencodemessage = ({ setRequestResult }: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] =
    useState<ExcludeCommonParams<RequestEncode>>(DEFAULT_PARAMS);

  //TODO bellow add proper event type
  const handleFormParams = (e: any) => {
    const { name, value } = e.target;
    if (value !== '') {
      setFormParams((prevFormParams) => ({ ...prevFormParams, [name]: value }));
    }
  };
  //TODO bellow add proper event type
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('about to process: ', { formParams });
    try {
      const encodeMessage = await sdk.requestEncodeMessage(formParams);
      setRequestResult(encodeMessage);
      console.log({ encodeMessage });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };
  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request encode message</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username @</Form.Label>
            <Form.Control
              placeholder="Hive username"
              name="username"
              value={formParams.username}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicReceiver">
            <Form.Label>Receiver @</Form.Label>
            <Form.Control
              placeholder="Hive receiver's username"
              name="receiver"
              value={formParams.receiver}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="To encode. # is required"
              name="message"
              value={formParams.message}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Select
              onChange={handleFormParams}
              className={'mt-1'}
              value={formParams.method}
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
          <Button variant="primary" type="submit" className="mt-1">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Requestencodemessage;
