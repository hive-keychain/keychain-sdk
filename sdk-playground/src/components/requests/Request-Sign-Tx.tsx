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
  InputGroup,
  ListGroup,
} from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';
import { DynamicGlobalProperties, Operation, Transaction } from '@hiveio/dhive';
import json5 from 'json5';
import { Buffer } from 'buffer';
import { Client } from '@hiveio/dhive';
//TODO here:
//  - ask cedric about nasty dHive error
//      -> error here:
// WARNING in ./node_modules/@hiveio/dhive/dist/dhive.js
// Module Warning (from ./node_modules/source-map-loader/dist/cjs.js):
// Failed to parse source map from 'C:\cygwin64\home\Saturno\KeyChain\keychain-sdk\sdk-playground\node_modules\@hiveio\dhive\dist\src\utils.ts' file: Error: ENOENT: no such file or directory, open 'C:\cygwin64\home\Saturno\KeyChain\keychain-sdk\sdk-playground\node_modules\@hiveio\dhive\dist\src\utils.ts'
type Props = {
  setRequestResult: any;
  enableLogs: boolean;
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

const client = new Client([
  'https://api.hive.blog',
  'https://anyx.io',
  'https://api.openhive.network',
]);

const undefinedParamsToValidate = ['']; //none to check

//TODO Cannot properly test:
//    1. errors when trying to fetch data from hive(console warnings about dHive package)
//    2. error when sending the request but no description about that error.
const Requestsigntx = ({ setRequestResult, enableLogs }: Props) => {
  const sdk = new KeychainSDK(window);
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

  //TODO uncomment to take effect
  // useEffect(() => {
  //   initProps();
  // });

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
        if (enableLogs) console.log({ jsonParsed });
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

    formParams['data']['tx']['operations'] = arrayOperations as Operation[]; //As common types require

    // //@ts-ignore
    // formParams['data']['tx']['operations'] = JSON.stringify(
    //   arrayOperations as Operation[],
    // ); //as quentin suggested

    if (enableLogs) console.log('about to process ...: ', { formParams });
    try {
      const broadcast = await sdk.requestSignTx(
        formParams.data,
        formParams.options,
      );
      setRequestResult(broadcast);
      if (enableLogs) console.log({ broadcast });
    } catch (error) {
      setRequestResult(error);
    }
  };
  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Sign Tx</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              placeholder="Hive username to perform the request"
              name="username"
              value={formParams.data.username}
              onChange={handleFormParams}
            />
          </InputGroup>

          <Form.Group className="mb-3">
            <Form.Label>Operations</Form.Label>
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
            <Button className="mt-2" onClick={handleAddOperation}>
              +
            </Button>
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
          </Form.Group>
          <InputGroup className="mb-3">
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
            </Form.Select>
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

export default Requestsigntx;
