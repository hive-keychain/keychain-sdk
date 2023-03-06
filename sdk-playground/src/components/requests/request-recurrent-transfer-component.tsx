import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  RequestRecurrentTransfer,
} from 'hive-keychain-commons';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { CommonProps, KeychainOptions } from '../request-selector-component';

type Props = {};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestRecurrentTransfer> = {
  username: 'keychain.tests',
  to: 'theghost1980',
  amount: '1.000',
  currency: 'HIVE',
  memo: '#Encrypted memo sample',
  recurrence: 24,
  executions: 2,
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['rpc'];

const RequestRecurrentTransferComponent = ({
  setRequestResult,
  enableLogs,
  setFormParamsToShow,
}: Props & CommonProps) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestRecurrentTransfer>;
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
      const conversion = await sdk.recurrentTransfer(
        formParams.data,
        formParams.options,
      );
      setRequestResult(conversion);
      if (enableLogs) console.log({ conversion });
    } catch (error) {
      setRequestResult(error);
    }
  };

  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Recurrent Transfer</Card.Header>
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
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              title="Hive account receiving the transfers"
              placeholder="Receiver username"
              name="to"
              value={formParams.data.to}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Amount</InputGroup.Text>
            <Form.Control
              title="Amount to be sent on each execution. Requires 3 decimals, i.e: '1.000'."
              placeholder="Amount to send"
              name="amount"
              value={formParams.data.amount}
              onChange={handleFormParams}
            />
            <Form.Select
              onChange={handleFormParams}
              value={formParams.data.currency}
              name="currency">
              <option>Please select a currency</option>
              <option value={'HIVE'}>HIVE</option>
              <option value={'HBD'}>HBD</option>
            </Form.Select>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Memo</InputGroup.Text>
            <Form.Control
              as={'textarea'}
              title="Transfer memo, use # to encrypt"
              placeholder="transfer memo"
              name="memo"
              value={formParams.data.memo}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Recurrence</InputGroup.Text>
            <Form.Control
              title="How often will the payment be triggered (in hours) - minimum 24"
              placeholder="Recurrence i.e: '24'"
              name="recurrence"
              value={formParams.data.recurrence}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Executions</InputGroup.Text>
            <Form.Control
              title="The times the recurrent payment will be executed - minimum 2"
              placeholder="executions i.e: '2'"
              name="executions"
              value={formParams.data.executions}
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

export default RequestRecurrentTransferComponent;
