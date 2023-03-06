import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  RequestCreateClaimedAccount,
} from 'hive-keychain-commons';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { CommonProps, KeychainOptions } from '../request-selector-component';
import { Authority, AuthorityType } from '@hiveio/dhive';

type Props = {};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestCreateClaimedAccount> = {
  username: 'keychain.tests',
  new_account: 'newAccountName',
  owner: JSON.stringify({}),
  active: JSON.stringify({}),
  posting: JSON.stringify({}),
  memo: 'STM8eALyQwyb2C4XhXJ7eZfjfjfSeNeeZREaxPcJRApie1uwzzcuF',
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['rpc'];

//TODO needs to be discussed about differ types(keychainsdk vs common-types).
const RequestCreateClaimedAccountComponent = ({
  setRequestResult,
  enableLogs,
  setFormParamsToShow,
}: Props & CommonProps) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestCreateClaimedAccount>;
    options: KeychainOptions;
  }>({
    data: DEFAULT_PARAMS,
    options: DEFAULT_OPTIONS,
  });

  useEffect(() => {
    setFormParamsToShow(formParams);
  }, [formParams]);

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
    if (enableLogs) console.log('about to process ...: ', { formParams });
    try {
      const createClaimedAccount = await sdk.createClaimedAccount(
        formParams.data,
        formParams.options,
      );
      setRequestResult(createClaimedAccount);
      if (enableLogs) console.log({ createClaimedAccount });
    } catch (error) {
      setRequestResult(error);
    }
  };

  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Create Claimed Account</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              title="Hive account to perform the request"
              placeholder="Hive username"
              name="username"
              value={formParams.data.username}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>New account@</InputGroup.Text>
            <Form.Control
              title="New account to be created"
              placeholder="new Account's name"
              name="new_account"
              value={formParams.data.new_account}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Owner</InputGroup.Text>
            <Form.Control
              title="owner authority object(stringifyed)"
              placeholder="owner authority"
              name="owner"
              value={formParams.data.owner}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Active</InputGroup.Text>
            <Form.Control
              title="active authority object(stringifyed)"
              placeholder="active authority"
              name="active"
              value={formParams.data.active}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Posting</InputGroup.Text>
            <Form.Control
              title="posting authority object(stringifyed)"
              placeholder="posting authority"
              name="posting"
              value={formParams.data.posting}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Memo Public key</InputGroup.Text>
            <Form.Control
              title="public memo key"
              placeholder="public memo key"
              name="memo"
              value={formParams.data.memo}
              onChange={handleFormParams}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Rpc</InputGroup.Text>
            <Form.Control
              placeholder="Rpc node to broadcast - optional"
              name="rpc"
              value={formParams.options.rpc}
              onChange={handleFormParams}
            />
          </InputGroup>
          <Button variant="primary" type="submit" className="mt-1">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RequestCreateClaimedAccountComponent;
