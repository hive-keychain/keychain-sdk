import React, { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestDecode,
} from 'hive-keychain-commons';
import { Button, Card, Form } from 'react-bootstrap';

type Props = {
  setRequestResult: any; //TODO add proper type
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestDecode> = {
  username: '',
  message: '',
  method: KeychainKeyTypes.active,
};
//TODO clean up
const Requestverifykey = ({ setRequestResult }: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] =
    useState<ExcludeCommonParams<RequestDecode>>(DEFAULT_PARAMS);

  const handleFormParams = (e: any) => {
    const { name, value } = e.target;
    if (value !== '') {
      setFormParams((prevFormParams) => ({ ...prevFormParams, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('about to process: ', { formParams });
    try {
      const verifyKey = await sdk.requestVerifyKey(formParams);
      setRequestResult(verifyKey);
      console.log({ verifyKey });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };
  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request verify key</Card.Header>
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
          <Form.Group className="mb-3" controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="To Decode. # is required"
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

export default Requestverifykey;
