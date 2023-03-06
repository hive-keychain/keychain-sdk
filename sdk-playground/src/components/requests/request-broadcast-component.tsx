import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  KeychainKeyTypes,
  RequestBroadcast,
} from 'hive-keychain-commons';
import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  ListGroup,
} from 'react-bootstrap';
import { CommonProps, KeychainOptions } from '../request-selector-component';
import { Operation, OperationName, VirtualOperationName } from '@hiveio/dhive';
import json5 from 'json5';

type Props = {
  // setRequestResult: any;
  // enableLogs: boolean;
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestBroadcast> = {
  username: '',
  operations: [],
  method: KeychainKeyTypes.active,
};
const DEFAULT_OPTIONS: KeychainOptions = {};
// const DEFAULT_OPERATION: [
//   string,
//   {
//     [key: string]: any;
//   },
// ] = [
//   'transfer',
//   {
//     from: 'keychain.tests',
//     to: 'theghost1980',
//     amount: '0.001 HIVE',
//     memo: 'testing keychain SDK - requestBroadcast',
//   },
// ];
const DEFAULT_OPERATION: Operation = [
  'transfer',
  {
    from: 'keychain.tests',
    to: 'theghost1980',
    amount: '0.001 HIVE',
    memo: 'testing keychain SDK - requestBroadcast',
  },
];

const undefinedParamsToValidate = ['']; //none to check

const RequestBroadcastComponent = ({
  setRequestResult,
  enableLogs,
  setFormParamsToShow,
}: Props & CommonProps) => {
  const sdk = new KeychainSDK(window);
  const [operation, setOperation] = useState<Operation>(DEFAULT_OPERATION);
  const [arrayOperations, setArrayOperations] = useState<Operation[]>([]);

  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestBroadcast>;
    options: KeychainOptions;
  }>({
    data: DEFAULT_PARAMS,
    options: DEFAULT_OPTIONS,
  });

  useEffect(() => {
    setFormParamsToShow(formParams);
  }, [formParams]);

  const handleOperation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'operation_name') {
      setOperation([
        value as OperationName | VirtualOperationName,
        operation[1],
      ]);
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

  useEffect(() => {
    if (arrayOperations) {
      handleFormParams({
        target: {
          value: arrayOperations,
          name: 'operations',
        },
      });
    }
  }, [arrayOperations]);

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
    if (enableLogs) console.log('about to process ...: ', { formParams });
    try {
      const broadcast = await sdk.broadcast(
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
      <Card.Header as={'h5'}>Request Generic Broadcast</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Username @</InputGroup.Text>
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
            <Container>
              {arrayOperations.length > 0 && (
                <>
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
                </>
              )}
            </Container>
          </Form.Group>

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

export default RequestBroadcastComponent;
