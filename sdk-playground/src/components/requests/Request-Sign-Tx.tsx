import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestSignTx,
} from 'hive-keychain-commons';
import {
  Button,
  Card,
  Container,
  Form,
  ListGroup,
  Stack,
} from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';
import { DynamicGlobalProperties, Operation, Transaction } from '@hiveio/dhive';
import json5 from 'json5';
import { Buffer } from 'buffer';
import { Client } from '@hiveio/dhive';

type Props = {
  setRequestResult: any; //TODO add proper type
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestSignTx> = {
  username: '',
  tx: {
    ref_block_num: 1,
    ref_block_prefix: 1,
    expiration: new Date(Date.now() + 60000).toISOString(),
    operations: [],
    extensions: [],
  } as Transaction,
  method: KeychainKeyTypes.memo,
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const DEFAULT_OPERATION: [
  string,
  {
    [key: string]: any;
  },
] = [
  'transfer',
  {
    from: 'keychain.tests',
    to: 'theghost1980',
    amount: '0.001 HIVE',
    memo: 'testing keychain SDK - requestBroadcast',
  },
];

const undefinedParamsToValidate = ['']; //none to check

//TODO clean up
const Requestsigntx = ({ setRequestResult }: Props) => {
  const sdk = new KeychainSDK(window);
  const client = new Client([
    'https://api.hive.blog',
    'https://anyx.io',
    'https://api.openhive.network',
  ]);
  const [operation, setOperation] =
    useState<[string, object]>(DEFAULT_OPERATION);
  const [arrayOperations, setArrayOperations] = useState<
    [
      string,
      {
        [key: string]: any;
      },
    ][]
  >([]);

  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestSignTx>;
    options: KeychainOptions;
  }>({
    data: DEFAULT_PARAMS,
    options: DEFAULT_OPTIONS,
  });

  const [dHiveprops, setDHiveProps] = useState<DynamicGlobalProperties>();

  useEffect(() => {
    initProps();
  });

  //TODO remove, just for testing
  useEffect(() => {
    console.log({ arrayOperations });
  }, [arrayOperations]);
  // useEffect(() => {
  //   console.log({ operation });
  // }, [operation]);
  //end remove

  useEffect(() => {
    if (dHiveprops) {
      formParams.data.tx.ref_block_num = dHiveprops.head_block_number & 0xffff;
      formParams.data.tx.ref_block_prefix = Buffer.from(
        dHiveprops.head_block_id,
        'hex',
      ).readUInt32LE(4);
    }
  }, [dHiveprops]);

  const initProps = async () => {
    setDHiveProps(await client.database.getDynamicGlobalProperties());
  };

  const handleOperation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'operation_name') {
      setOperation([value, operation[1]]);
    } else {
      if (String(value).trim() === '') return;
      try {
        const jsonParsed = json5.parse<object>(value);
        console.log({ jsonParsed });
        setOperation([operation[0], jsonParsed]);
      } catch (error) {
        console.log('Error trying to parse json: ', error);
      }
    }
  };

  const handleAddOperation = () => {
    if (operation[0] && operation['1']) {
      setArrayOperations((prevArrayOperations) => [
        ...prevArrayOperations,
        operation,
      ]);
    }
  };

  const handleResetList = () => {
    setArrayOperations([]);
  };

  const handleFormParams = (e: any) => {
    const { name, value } = e.target;
    let tempValue =
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

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    formParams['data']['tx']['operations'] = arrayOperations as Operation[];
    console.log('about to process ...: ', { formParams });
    try {
      const broadcast = await sdk.requestSignTx(
        formParams.data,
        formParams.options,
      );
      setRequestResult(broadcast);
      console.log({ broadcast });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };
  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Sign Tx</Card.Header>
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

          <Form.Group className="mb-3" controlId="formBasicOperations">
            <Form.Label>Operations</Form.Label>
            <Stack direction="horizontal" gap={3}>
              <Container>
                <Form.Control
                  placeholder="Operation type"
                  name="operation_name"
                  onChange={handleOperation}
                />
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="JSON"
                  name="json"
                  onChange={handleOperation}
                />
              </Container>
              {arrayOperations.length > 0 && (
                <Container>
                  <ListGroup>
                    {arrayOperations.map((op, index) => {
                      return (
                        <ListGroup.Item key={`${index}-op-queue`}>
                          On Queue: {op[0]} {op[1].amount ? op[1].amount : ''}
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                  <Button onClick={handleResetList} variant="outline-primary">
                    reset
                  </Button>
                </Container>
              )}
            </Stack>
            <Button className="mt-2" onClick={handleAddOperation}>
              +
            </Button>
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

export default Requestsigntx;
