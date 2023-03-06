import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  RequestCreateProposal,
} from 'hive-keychain-commons';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { CommonProps, KeychainOptions } from '../request-selector-component';

type Props = {};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestCreateProposal> = {
  username: 'keychain.tests',
  receiver: 'keychain.tests',
  subject: 'The New proposal title',
  permlink: 'proposal-keychain-dev-permlink',
  start: '2023-02-25T00:00:00',
  end: '2024-02-25T00:00:00',
  daily_pay: '390.000 HBD',
  extensions: JSON.stringify([]),
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['rpc'];

const RequestCreateProposalComponent = ({
  setRequestResult,
  enableLogs,
  setFormParamsToShow,
}: Props & CommonProps) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestCreateProposal>;
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
      const createProposal = await sdk.createProposal(
        formParams.data,
        formParams.options,
      );
      setRequestResult(createProposal);
      if (enableLogs) console.log({ createProposal });
    } catch (error) {
      setRequestResult(error);
    }
  };

  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Create Proposal</Card.Header>
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
            <InputGroup.Text>Receiver@</InputGroup.Text>
            <Form.Control
              title="Account receiving the funding if the proposal is voted"
              placeholder="receiver's account"
              name="receiver"
              value={formParams.data.receiver}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Subject</InputGroup.Text>
            <Form.Control
              title="Title of the DAO"
              placeholder="Title of the DAO"
              name="subject"
              value={formParams.data.subject}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Permlink</InputGroup.Text>
            <Form.Control
              title="Permlink to the proposal description"
              placeholder="Permlink to the proposal description"
              name="permlink"
              value={formParams.data.permlink}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Start</InputGroup.Text>
            <Form.Control
              title="Starting date, requires format: YYYY-DD-MMTHH:MM:SS"
              placeholder="Starting date i.e: 2023-02-25T00:00:00"
              name="start"
              value={formParams.data.start}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>End</InputGroup.Text>
            <Form.Control
              title="Ending date, requires format: YYYY-DD-MMTHH:MM:SS"
              placeholder="Ending date i.e: 2024-02-25T00:00:00"
              name="end"
              value={formParams.data.end}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Daily pay</InputGroup.Text>
            <Form.Control
              title="Daily amount to be received by receiver. Requires 3 decimals, i.e: '100.000 HBD'"
              placeholder="Daily amount"
              name="daily_pay"
              value={formParams.data.daily_pay}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Extensions</InputGroup.Text>
            <Form.Control
              title="Stringified Array of extensions"
              placeholder="Stringified Array of extensions"
              name="extensions"
              value={formParams.data.extensions}
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

export default RequestCreateProposalComponent;
