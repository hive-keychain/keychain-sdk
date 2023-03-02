import { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestEncode,
} from 'hive-keychain-commons';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';

type Props = {
  setRequestResult: any;
  enableLogs: boolean;
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestEncode> = {
  username: '',
  receiver: '',
  message: '',
  method: KeychainKeyTypes.active,
};

const RequestEncodeMessageComponent = ({
  setRequestResult,
  enableLogs,
}: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] =
    useState<ExcludeCommonParams<RequestEncode>>(DEFAULT_PARAMS);

  const handleFormParams = (e: any) => {
    const { name, value } = e.target;
    if (value !== '') {
      setFormParams((prevFormParams) => ({ ...prevFormParams, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (enableLogs) console.log('about to process: ', { formParams });
    try {
      const encodeMessage = await sdk.requestEncodeMessage(formParams);
      setRequestResult(encodeMessage);
      if (enableLogs) console.log({ encodeMessage });
    } catch (error) {
      setRequestResult(error);
    }
  };
  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request encode message</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              title="Hive account to perform the request"
              placeholder="Hive username"
              name="username"
              value={formParams.username}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Receiver @</InputGroup.Text>
            <Form.Control
              placeholder="Hive receiver's username"
              name="receiver"
              value={formParams.receiver}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Message</InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="To encode. # is required"
              name="message"
              value={formParams.message}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Method</InputGroup.Text>
            <Form.Select
              onChange={handleFormParams}
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
          </InputGroup>
          <Button variant="primary" type="submit" className="mt-1">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RequestEncodeMessageComponent;
