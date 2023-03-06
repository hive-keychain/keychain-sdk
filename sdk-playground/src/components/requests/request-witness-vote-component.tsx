import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import { ExcludeCommonParams, RequestWitnessVote } from 'hive-keychain-commons';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { CommonProps, KeychainOptions } from '../request-selector-component';

type Props = {};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestWitnessVote> = {
  username: 'keychain.tests',
  witness: 'stoodkev',
  vote: true,
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['username', 'rpc'];

const RequestWitnessVoteComponent = ({
  setRequestResult,
  enableLogs,
  setFormParamsToShow,
}: Props & CommonProps) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestWitnessVote>;
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
      const witnessVote = await sdk.witnessVote(
        formParams.data,
        formParams.options,
      );
      setRequestResult(witnessVote);
      if (enableLogs) console.log({ witnessVote });
    } catch (error) {
      setRequestResult(error);
    }
  };

  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Witness Vote</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              placeholder="Hive username, leave blank for dropdown"
              name="username"
              value={formParams.data.username}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Witness</InputGroup.Text>
            <Form.Control
              placeholder="Account to receive the witness vote"
              name="witness"
              value={formParams.data.witness}
              onChange={handleFormParams}
            />
          </InputGroup>
          <InputGroup className="d-flex justify-content-center mb-3 align-items-center">
            <InputGroup.Text>Vote</InputGroup.Text>
            <Form.Check
              className="ms-5"
              type="checkbox"
              name="vote"
              value={formParams.data.vote ? 'true' : 'false'}
              checked={formParams.data.vote}
              onChange={(e) =>
                handleFormParams({
                  target: {
                    value: e.target.checked,
                    name: e.target.name,
                  },
                })
              }
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

export default RequestWitnessVoteComponent;
