import { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestRemoveKeyAuthority,
} from 'hive-keychain-commons';
import { Button, Card, Form } from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';

type Props = {
  setRequestResult: any; //TODO add proper type
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestRemoveKeyAuthority> = {
  username: '',
  authorizedKey: '',
  role: KeychainKeyTypes.posting,
  method: KeychainKeyTypes.active,
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['']; //none to check

//TODO clean up
const Requestremovekeyauthority = ({ setRequestResult }: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestRemoveKeyAuthority>;
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
      const removeKeyAuthority = await sdk.requestRemoveKeyAuthority(
        formParams.data,
        formParams.options,
      );
      setRequestResult(removeKeyAuthority);
      console.log({ removeKeyAuthority });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };
  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request remove Account Authority</Card.Header>
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
          <Form.Group className="mb-3" controlId="formBasicAuthorizedKey">
            <Form.Label>Public key</Form.Label>
            <Form.Control
              placeholder="Public key to be unassociated"
              name="authorizedKey"
              value={formParams.data.authorizedKey}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSelectRole">
            <Form.Select
              onChange={handleFormParams}
              className={'mt-1'}
              value={formParams.data.role}
              name="role">
              <option>Please select a Role to remove</option>
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

export default Requestremovekeyauthority;