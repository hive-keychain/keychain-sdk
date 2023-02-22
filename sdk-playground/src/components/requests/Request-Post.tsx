import React, { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import { ExcludeCommonParams, RequestPost } from 'hive-keychain-commons';
import { Button, Card, Form } from 'react-bootstrap';
import { KeychainOptions } from '../Request-selector';

type Props = {
  setRequestResult: any; //TODO add proper type
};

const DEFAULT_PARAMS: ExcludeCommonParams<RequestPost> = {
  username: '',
  title: 'Keychain Playground SDK',
  body: '## This is a blog post n And this is some text. Testing the brand new Keychain SDK v1.0',
  parent_perm: 'blog',
  parent_username: undefined,
  json_metadata: JSON.stringify({
    format: 'markdown',
    description: 'A blog post',
    tags: ['Blog'],
  }),
  permlink: 'a-permlinkt-post-sample',
  comment_options: JSON.stringify({
    author: 'keychain.tests',
    permlink: 'a-post-by-keychaintests-fourth-part-post',
    max_accepted_payout: '10000.000 SBD',
    allow_votes: true,
    allow_curation_rewards: true,
    extensions: [],
    percent_hbd: 63,
  }),
};
const DEFAULT_OPTIONS: KeychainOptions = {};

const undefinedParamsToValidate = ['title', 'parent_username', 'rpc'];

//TODO clean up
const Requestpost = ({ setRequestResult }: Props) => {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState<{
    data: ExcludeCommonParams<RequestPost>;
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
      const post = await sdk.requestPost(formParams.data, formParams.options);
      setRequestResult(post);
      console.log({ post });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };

  return (
    <Card className="d-flex justify-content-center">
      <Card.Header as={'h5'}>Request Post</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username @</Form.Label>
            <Form.Control
              placeholder="Hive username"
              name="username"
              value={formParams.data.username}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Title of post. Can be undefined"
              name="title"
              value={formParams.data.title}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as={'textarea'}
              rows={3}
              placeholder="Body of post. Markdown or text"
              name="body"
              value={formParams.data.body}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicParentperm">
            <Form.Label>Parent perm</Form.Label>
            <Form.Control
              placeholder="Permlink of the parent post. Main tag for a root post"
              name="parent_perm"
              value={formParams.data.parent_perm}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicJsonmetadata">
            <Form.Label>Json metadata</Form.Label>
            <Form.Control
              placeholder="Parameters of the call"
              name="json_metadata"
              value={formParams.data.json_metadata}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPermlink">
            <Form.Label>Permlink</Form.Label>
            <Form.Control
              placeholder="Permlink of post"
              name="permlink"
              value={formParams.data.permlink}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicParentusername">
            <Form.Label>Parent username</Form.Label>
            <Form.Control
              placeholder="Author of the parent post. Pass undefined for root post"
              name="parent_username"
              value={formParams.data.parent_username}
              onChange={handleFormParams}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCommentoptions">
            <Form.Label>Comment options</Form.Label>
            <Form.Control
              placeholder="Options attached to the blog post"
              name="comment_options"
              value={formParams.data.comment_options}
              onChange={handleFormParams}
            />
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

export default Requestpost;
