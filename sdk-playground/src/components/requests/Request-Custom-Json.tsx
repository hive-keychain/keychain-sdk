import { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestCustomJSON,
  RequestVote,
} from 'hive-keychain-commons';
import { Button, Card, Form } from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';

type Props = {
  setRequestResult: any; //TODO add proper type
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestCustomJSON> = {
  username: '',
  id: '1',
  method: KeychainKeyTypes.posting,
  json: JSON.stringify({
    items: ['9292cd44ccaef8b73a607949cc787f1679ede10b-93'],
    currency: 'DEC',
    days: 1,
  }),
  display_msg: 'Rent a Card Man!',
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['username', 'rpc'];

//TODO clean up
const Requestcustomjson = ({ setRequestResult }: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestCustomJSON>;
    options: KeychainOptions;
  }>({
    data: DEFAULT_PARAMS,
    options: DEFAULT_OPTIONS,
  });

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('about to process ...: ', { formParams });
    try {
      const customJson = await sdk.requestCustomJson(
        formParams.data,
        formParams.options,
      );
      setRequestResult(customJson);
      console.log({ customJson });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };

  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Custom Json</Card.Header>
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
          <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label>Id</Form.Label>
            <Form.Control
              placeholder="Type of custom_json to be broadcasted"
              name="id"
              value={formParams.data.id}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSelectMethod">
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
          <Form.Group className="mb-3" controlId="formBasicJson">
            <Form.Label>Json</Form.Label>
            <Form.Control
              placeholder="Stringified custom json"
              name="json"
              value={formParams.data.json}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDisplaymsg">
            <Form.Label>Display message</Form.Label>
            <Form.Control
              placeholder="Message to display to explain to the user what this broadcast is about"
              name="display_msg"
              value={formParams.data.display_msg}
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

export default Requestcustomjson;
