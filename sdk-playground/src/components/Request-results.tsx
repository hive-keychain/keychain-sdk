import React from 'react';
import { Accordion, Card, Container, ListGroup } from 'react-bootstrap';

type Props = {
  requestResult: any; //TODo add proper type
};

//TODO here validate error as object, i.e: requestAddAccountAuthority
const RequestResults = ({ requestResult }: Props) => {
  return (
    <Container className="w-50 mt-1">
      <Card text={requestResult.error !== null ? 'danger' : 'success'}>
        {requestResult.error !== null ? (
          <Card.Body>Error: {requestResult.error}</Card.Body>
        ) : (
          <Card.Body>
            <Card.Title>Request: {requestResult.data.type}</Card.Title>
            <Card.Subtitle>
              Success: {requestResult.success.toString()}
            </Card.Subtitle>
            <Card.Text>Result: {requestResult.result}</Card.Text>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Data:</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      Key: {requestResult.data.key}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Message: {requestResult.data.message}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Method: {requestResult.data.method}
                    </ListGroup.Item>
                    {requestResult.receiver && (
                      <ListGroup.Item>
                        Receiver: {requestResult.data.receiver}
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      Type: {requestResult.data.type}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Username: {requestResult.data.username}
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Card.Text>Request_id: {requestResult.request_id}</Card.Text>
            {requestResult.publicKey && (
              <Card.Text>PublicKey: {requestResult.publicKey}</Card.Text>
            )}
          </Card.Body>
        )}
      </Card>
    </Container>
  );
};

export default RequestResults;