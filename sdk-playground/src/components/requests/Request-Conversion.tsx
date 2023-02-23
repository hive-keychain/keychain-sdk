import { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  RequestConvert,
  RequestRemoveProposal,
  RequestUpdateProposalVote,
} from 'hive-keychain-commons';
import { Button, Card, Form, InputGroup, Stack } from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';

type Props = {
  setRequestResult: any; //TODO add proper type
};
//TODO finish this one.
const DEFAULT_PARAMS: ExcludeCommonParams<RequestConvert> = {
  username: 'keychain.tests',
  proposal_ids: JSON.stringify([1, 2, 3]),
  approve: true,
  extensions: JSON.stringify([]),
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['rpc'];

//TODO clean up
const Requestconversion = ({ setRequestResult }: Props) => {
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
    console.log('about to process ...: ', { formParams });
    try {
      const conversion = await sdk.requestConversion(
        formParams.data,
        formParams.options,
      );
      setRequestResult(conversion);
      console.log({ conversion });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
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
          <InputGroup className="mb-3">
            <InputGroup.Text>Ids</InputGroup.Text>
            <Form.Control
              title="Stringified Array of ids of the proposals to be removed, i.e: '[1,10]'"
              placeholder="ids of the proposals"
              name="proposal_ids"
              value={formParams.data.proposal_ids as string}
              onChange={handleFormParams}
            />
          </InputGroup>
          <Form.Group className="mb-3" controlId="formBasicEnforce">
            <Form.Label>Approve</Form.Label>
            <Form.Check
              type="checkbox"
              name="approve"
              value={formParams.data.approve ? 'true' : 'false'}
              onChange={(e) =>
                handleFormParams({
                  target: {
                    value: e.target.checked,
                    name: e.target.name,
                  },
                })
              }
            />
          </Form.Group>
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

export default Requestconversion;
