import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Button, Card, Form, Container, Collapse } from 'react-bootstrap';
import Requestaddaccountauthority from './requests/Request-Add-Account-Authority';
import Requestaddkeyauthority from './requests/Request-Add-Key-Authority';
import Requestbroadcast from './requests/Request-Broadcast';
import Requestencodemessage from './requests/Request-Encode-Message';
import Requestpost from './requests/Request-Post';
import Requestremoveaccountauthority from './requests/Request-Remove-Account-Authority';
import Requestremovekeyauthority from './requests/Request-Remove-Key-Authority';
import Requestsignbuffer from './requests/Request-Sign-Buffer';
import Requestsigntx from './requests/Request-Sign-Tx';
import Requestsignedcall from './requests/Request-Signed-Call';
import Requestverifykey from './requests/Request-Verify-Key';
import Requestvote from './requests/Request-Vote';

export enum SDKRequestType {
  Request_Encode_Message = 'Request_Encode_Message',
  Request_Verify_Key = 'Request_Verify_Key',
  Request_Sign_Buffer = 'Request_Sign_Buffer',
  Request_Add_Account_Authority = 'Request_Add_Account_Authority',
  Request_Remove_Account_Authority = 'Request_Remove_Account_Authority',
  Request_Add_Key_Authority = 'Request_Add_Key_Authority',
  Request_Remove_Key_Authority = 'Request_Remove_Key_Authority',
  Request_Broadcast = 'Request_Broadcast',
  Request_Sign_Tx = 'Request_Sign_Tx',
  Request_Signed_Call = 'Request_Signed_Call',
  Request_Post = 'Request_Post',
  Request_Vote = 'Request_Vote',
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
const RequestSelector = ({ setRequestResult, requestResult }: Props) => {
  const [request, setRequest] = useState<string>();
  const [requestCard, setRequestCard] = useState<ReactNode>();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (requestResult) {
      setOpen(!open);
    }
  }, [requestResult, setOpen]);

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
      case SDKRequestType.Request_Sign_Tx:
        setRequestCard(<Requestsigntx setRequestResult={setRequestResult} />);
        break;
      case SDKRequestType.Request_Signed_Call:
        setRequestCard(
          <Requestsignedcall setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Post:
        setRequestCard(<Requestpost setRequestResult={setRequestResult} />);
        break;
      case SDKRequestType.Request_Vote:
        setRequestCard(<Requestvote setRequestResult={setRequestResult} />);
        break;
      default:
        setRequestCard(null);
        console.log('trying to set: ', { request });
        break;
    }
  }, [request, setRequestResult]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
                <option value={SDKRequestType.Request_Sign_Tx}>
                  {SDKRequestType.Request_Sign_Tx.split('_').join(' ')}
                </option>
                <option value={SDKRequestType.Request_Signed_Call}>
                  {SDKRequestType.Request_Signed_Call.split('_').join(' ')}
                </option>
                <option value={SDKRequestType.Request_Post}>
                  {SDKRequestType.Request_Post.split('_').join(' ')}
                </option>
                <option value={SDKRequestType.Request_Vote}>
                  {SDKRequestType.Request_Vote.split('_').join(' ')}
                </option>
              </Form.Select>
            </Form>
            <Container className="mt-2">
              {requestCard ? requestCard : null}
            </Container>
          </Card.Body>
        </Collapse>
      </Card>
    </Container>
  );
};

export default RequestSelector;
