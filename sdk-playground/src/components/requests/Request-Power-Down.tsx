import { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import { ExcludeCommonParams, RequestPowerDown } from 'hive-keychain-commons';
import { Button, Card, Form, Stack } from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';

type Props = {
  setRequestResult: any; //TODO add proper type
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestPowerDown> = {
  username: 'keychain.tests',
  hive_power: '1.000',
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['rpc'];

//TODO clean up
const Requestpowerdown = ({ setRequestResult }: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestPowerDown>;
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
      const powerDown = await sdk.requestPowerDown(
        formParams.data,
        formParams.options,
      );
      setRequestResult(powerDown);
      console.log({ powerDown });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };

  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Power Down</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Username@</Form.Label>
              <Form.Control
                title="Hive account to perform the request"
                placeholder="Hive username"
                name="username"
                value={formParams.data.username}
                onChange={handleFormParams}
              />
            </Stack>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicHive">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Hive</Form.Label>
              <Form.Control
                title="Amount of HP(hive power), to be powered down, i.e: '1.000' "
                placeholder="Amount of HIVE"
                name="hive_power"
                value={formParams.data.hive_power}
                onChange={handleFormParams}
              />
            </Stack>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicOptions">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Rpc</Form.Label>
              <Form.Control
                placeholder="Rpc node to broadcast - optional"
                name="rpc"
                value={formParams.options.rpc}
                onChange={handleFormParams}
              />
            </Stack>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-1">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Requestpowerdown;
