import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Card, Form, Container, Collapse } from 'react-bootstrap';
import Requestaddaccountauthority from './requests/Request-Add-Account-Authority';
import Requestaddkeyauthority from './requests/Request-Add-Key-Authority';
import Requestbroadcast from './requests/Request-Broadcast';
import Requestencodemessage from './requests/Request-Encode-Message';
import Requestremoveaccountauthority from './requests/Request-Remove-Account-Authority';
import Requestremovekeyauthority from './requests/Request-Remove-Key-Authority';
import Requestsignbuffer from './requests/Request-Sign-Buffer';
import Requestverifykey from './requests/Request-Verify-Key';

//TODO change using keychain request types.
export enum SDKRequestType {
  Request_Encode_Message = 'Request_Encode_Message',
  Request_Verify_Key = 'Request_Verify_Key',
  Request_Sign_Buffer = 'Request_Sign_Buffer',
  Request_Add_Account_Authority = 'Request_Add_Account_Authority',
  Request_Remove_Account_Authority = 'Request_Remove_Account_Authority',
  Request_Add_Key_Authority = 'Request_Add_Key_Authority',
  Request_Remove_Key_Authority = 'Request_Remove_Key_Authority',
  Request_Broadcast = 'Request_Broadcast',
}

export interface KeychainOptions {
  rpc?: string;
}

type Props = {
  setRequestResult: any; //TODO add proper type
  requestResult: any; //TODO add proper type
  enabledKeychain: boolean; //TODO use it to disable??
};
//TODO important update all inputs & UI using stacks(react-bootstrap).
const RequestSelector = ({
  setRequestResult,
  enabledKeychain,
  requestResult,
}: Props) => {
  const [request, setRequest] = useState<SDKRequestType>();
  const [requestCard, setRequestCard] = useState<ReactNode>();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (requestResult) {
      setOpen(!open);
    }
  }, [requestResult]);

  useEffect(() => {
    switch (request) {
      case SDKRequestType.Request_Encode_Message:
        setRequestCard(
          <Requestencodemessage setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Verify_Key:
        setRequestCard(
          <Requestverifykey setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Sign_Buffer:
        setRequestCard(
          <Requestsignbuffer setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Add_Account_Authority:
        setRequestCard(
          <Requestaddaccountauthority setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Remove_Account_Authority:
        setRequestCard(
          <Requestremoveaccountauthority setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Add_Key_Authority:
        setRequestCard(
          <Requestaddkeyauthority setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Remove_Key_Authority:
        setRequestCard(
          <Requestremovekeyauthority setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Broadcast:
        setRequestCard(
          <Requestbroadcast setRequestResult={setRequestResult} />,
        );
        break;
      default:
        setRequestCard(null);
        console.log('trying to set: ', { request });
        break;
    }
  }, [request]);

  //TODO bellow add proper event type
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setRequest(e.target.value);
    setRequestResult(undefined);
  };

  return (
    <Container className="w-50 mt-2">
      <Card className="d-flex justify-content-center">
        <Card.Header as={'h4'}>
          SDK Playground
          <Button
            className="ms-5"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}>
            {open ? 'collapse selector' : 'expand selector'}
          </Button>
        </Card.Header>
        <Collapse in={open}>
          <Card.Body>
            <Form>
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}>
                <option>Please select a Request</option>
                <option value={SDKRequestType.Request_Encode_Message}>
                  {SDKRequestType.Request_Encode_Message.split('_').join(' ')}
                </option>
                <option value={SDKRequestType.Request_Verify_Key}>
                  {SDKRequestType.Request_Verify_Key.split('_').join(' ')}
                </option>
                <option value={SDKRequestType.Request_Sign_Buffer}>
                  {SDKRequestType.Request_Sign_Buffer.split('_').join(' ')}
                </option>
                <option value={SDKRequestType.Request_Add_Account_Authority}>
                  {SDKRequestType.Request_Add_Account_Authority.split('_').join(
                    ' ',
                  )}
                </option>
                <option value={SDKRequestType.Request_Remove_Account_Authority}>
                  {SDKRequestType.Request_Remove_Account_Authority.split(
                    '_',
                  ).join(' ')}
                </option>
                <option value={SDKRequestType.Request_Add_Key_Authority}>
                  {SDKRequestType.Request_Add_Key_Authority.split('_').join(
                    ' ',
                  )}
                </option>
                <option value={SDKRequestType.Request_Remove_Key_Authority}>
                  {SDKRequestType.Request_Remove_Key_Authority.split('_').join(
                    ' ',
                  )}
                </option>
                <option value={SDKRequestType.Request_Broadcast}>
                  {SDKRequestType.Request_Broadcast.split('_').join(' ')}
                </option>
              </Form.Select>
            </Form>
            {requestCard ? requestCard : null}
          </Card.Body>
        </Collapse>
      </Card>
    </Container>
  );
};

export default RequestSelector;
