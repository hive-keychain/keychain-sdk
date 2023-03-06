import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import { ExcludeCommonParams, RequestPowerDown } from 'hive-keychain-commons';
import { Button, Card, Form, InputGroup, Stack } from 'react-bootstrap';
import { CommonProps, KeychainOptions } from '../request-selector-component';

type Props = {};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestPowerDown> = {
  username: 'keychain.tests',
  hive_power: '1.000',
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['rpc'];

const RequestPowerDownComponent = ({
  setRequestResult,
  enableLogs,
  setFormParamsToShow,
}: Props & CommonProps) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestPowerDown>;
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
      const powerDown = await sdk.powerDown(
        formParams.data,
        formParams.options,
      );
      setRequestResult(powerDown);
      if (enableLogs) console.log({ powerDown });
    } catch (error) {
      setRequestResult(error);
    }
  };

  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Power Down</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Username@</InputGroup.Text>
            <Form.Control
              title="Hive account to perform the request"
              placeholder="Hive username"
              name="username"
              value={formParams.data.username}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Hive</InputGroup.Text>
            <Form.Control
              title="Amount of HP(hive power), to be powered down, i.e: '1.000' "
              placeholder="Amount of HIVE"
              name="hive_power"
              value={formParams.data.hive_power}
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

export default RequestPowerDownComponent;
