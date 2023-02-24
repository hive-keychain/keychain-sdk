import { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import { ExcludeCommonParams, RequestConvert } from 'hive-keychain-commons';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';

type Props = {
  setRequestResult: any;
  enableLogs: boolean;
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestConvert> = {
  username: 'keychain.tests',
  amount: '1.000',
  collaterized: false,
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['rpc'];

const Requestconversion = ({ setRequestResult, enableLogs }: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestConvert>;
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
    if (enableLogs) console.log('about to process ...: ', { formParams });
    try {
      const conversion = await sdk.requestConversion(
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
      <Card.Header as={'h5'}>Request Conversion</Card.Header>
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
          <Form.Group className="mb-3 d-flex justify-content-center">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Collateralized"
              title={
                'true to convert HIVE to HBD. false to convert HBD to HIVE.'
              }
              value={formParams.data.collaterized ? 'true' : 'false'}
              onChange={(e) =>
                handleFormParams({
                  target: {
                    name: 'collaterized',
                    value: e.target.checked,
                  },
                })
              }
            />
          </Form.Group>
          <InputGroup className="mb-3">
            <InputGroup.Text>Amount</InputGroup.Text>
            <Form.Control
              title="Amount to be converted. Requires 3 decimals, i.e: '1.000'."
              placeholder="amount i.e: '1.000'"
              name="amount"
              value={formParams.data.amount}
              onChange={handleFormParams}
            />
            <InputGroup.Text>
              {formParams.data.collaterized ? 'HIVE' : 'HBD'}
            </InputGroup.Text>
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

export default Requestconversion;
