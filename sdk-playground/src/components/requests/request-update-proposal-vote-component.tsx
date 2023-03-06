import { useEffect, useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import {
  ExcludeCommonParams,
  RequestUpdateProposalVote,
} from 'hive-keychain-commons';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { CommonProps, KeychainOptions } from '../request-selector-component';

type Props = {};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestUpdateProposalVote> = {
  username: 'keychain.tests',
  proposal_ids: JSON.stringify([1, 2, 3]),
  approve: false,
  extensions: JSON.stringify([]),
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['rpc'];

const RequestUpdateProposalVoteComponent = ({
  setRequestResult,
  enableLogs,
  setFormParamsToShow,
}: Props & CommonProps) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestUpdateProposalVote>;
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
      const updateProposalVote = await sdk.updateProposalVote(
        formParams.data,
        formParams.options,
      );
      setRequestResult(updateProposalVote);
      if (enableLogs) console.log({ updateProposalVote });
    } catch (error) {
      setRequestResult(error);
    }
  };

  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Update Proposal Vote</Card.Header>
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
          <Form.Group
            className="d-flex mb-3 justify-content-center"
            controlId="formBasicEnforce">
            <Form.Check
              label="Approve"
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

export default RequestUpdateProposalVoteComponent;
