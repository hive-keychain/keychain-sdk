import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Button, Card, Form, Container, Collapse } from 'react-bootstrap';
import Requestaddaccount from './requests/Request-Add-Account';
import Requestaddaccountauthority from './requests/Request-Add-Account-Authority';
import Requestaddkeyauthority from './requests/Request-Add-Key-Authority';
import Requestbroadcast from './requests/Request-Broadcast';
import Requestconversion from './requests/Request-Conversion';
import Requestcreateclaimedaccount from './requests/Request-Create-Claimed-Account';
import Requestcreateproposal from './requests/Request-Create-Proposal';
import Requestcustomjson from './requests/Request-Custom-Json';
import Requestdelegation from './requests/Request-Delegation';
import Requestencodemessage from './requests/Request-Encode-Message';
import Requestpost from './requests/Request-Post';
import Requestpowerdown from './requests/Request-Power-Down';
import Requestpowerup from './requests/Request-Power-Up';
import Requestproxy from './requests/Request-Proxy';
import Requestrecurrenttransfer from './requests/Request-Recurrent-Transfer';
import Requestremoveaccountauthority from './requests/Request-Remove-Account-Authority';
import Requestremovekeyauthority from './requests/Request-Remove-Key-Authority';
import Requestremoveproposal from './requests/Request-Remove-Proposal';
import Requestsendtoken from './requests/Request-Send-Token';
import Requestsignbuffer from './requests/Request-Sign-Buffer';
import Requestsigntx from './requests/Request-Sign-Tx';
import Requestsignedcall from './requests/Request-Signed-Call';
import Requesttransfer from './requests/Request-Transfer';
import Requestupdateproposalvote from './requests/Request-Update-Proposal-Vote';
import Requestverifykey from './requests/Request-Verify-Key';
import Requestvote from './requests/Request-Vote';
import Requestwitnessvote from './requests/Request-Witness-Vote';

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
  Request_Custom_Json = 'Request_Custom_Json',
  Request_Transfer = 'Request_Transfer',
  Request_Send_Token = 'Request_Send_Token',
  Request_Delegation = 'Request_Delegation',
  Request_Witness_Vote = 'Request_Witness_Vote',
  Request_Proxy = 'Request_Proxy',
  Request_Power_Up = 'Request_Power_Up',
  Request_Power_Down = 'Request_Power_Down',
  Request_Create_Claimed_Account = 'Request_Create_Claimed_Account',
  Request_Create_Proposal = 'Request_Create_Proposal',
  Request_Remove_Proposal = 'Request_Remove_Proposal',
  Request_Update_Proposal_Vote = 'Request_Update_Proposal_Vote',
  Request_Add_Account = 'Request_Add_Account',
  Request_Conversion = 'Request_Conversion',
  Request_Recurrent_Transfer = 'Request_Recurrent_Transfer',
}

export interface KeychainOptions {
  rpc?: string;
}

type Props = {
  setRequestResult: any; //TODO add proper type needed?
  requestResult: any; //TODO add proper type needed?
  enabledKeychain: boolean;
  enableLogs: boolean;
};
//TODO
//  important update all:
//    - inputs & UI using InputGroup.
//    - conditional use of console.log if user wants.
//    - fix requestCreateClaimedAccount, conflicting types between ExcludeCommonParams & hive_keychain types.
const RequestSelector = ({
  setRequestResult,
  requestResult,
  enabledKeychain,
  enableLogs,
}: Props) => {
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
          <Requestencodemessage
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Verify_Key:
        setRequestCard(
          <Requestverifykey
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
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
      case SDKRequestType.Request_Custom_Json:
        setRequestCard(
          <Requestcustomjson setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Transfer:
        setRequestCard(<Requesttransfer setRequestResult={setRequestResult} />);
        break;
      case SDKRequestType.Request_Send_Token:
        setRequestCard(
          <Requestsendtoken setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Delegation:
        setRequestCard(
          <Requestdelegation setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Witness_Vote:
        setRequestCard(
          <Requestwitnessvote setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Proxy:
        setRequestCard(<Requestproxy setRequestResult={setRequestResult} />);
        break;
      case SDKRequestType.Request_Power_Up:
        setRequestCard(<Requestpowerup setRequestResult={setRequestResult} />);
        break;
      case SDKRequestType.Request_Power_Down:
        setRequestCard(
          <Requestpowerdown setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Create_Claimed_Account:
        setRequestCard(
          <Requestcreateclaimedaccount setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Create_Proposal:
        setRequestCard(
          <Requestcreateproposal setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Remove_Proposal:
        setRequestCard(
          <Requestremoveproposal setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Update_Proposal_Vote:
        setRequestCard(
          <Requestupdateproposalvote setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Add_Account:
        setRequestCard(
          <Requestaddaccount setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Conversion:
        setRequestCard(
          <Requestconversion setRequestResult={setRequestResult} />,
        );
        break;
      case SDKRequestType.Request_Recurrent_Transfer:
        setRequestCard(
          <Requestrecurrenttransfer setRequestResult={setRequestResult} />,
        );
        break;
      default:
        setRequestCard(null);
        if (enableLogs) console.log('trying to set: ', { request });
        break;
    }
  }, [request, setRequestResult]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (enableLogs) console.log(e.target.value);
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
                disabled={!enabledKeychain}
                aria-label="Default select example"
                onChange={handleChange}>
                <option>Please select a Request</option>
                {(Object.keys(SDKRequestType) as Array<SDKRequestType>).map(
                  (_type) => {
                    return (
                      <option
                        value={SDKRequestType[_type]}
                        key={`${_type}-rq-type`}>
                        {_type.split('_').join(' ')}
                      </option>
                    );
                  },
                )}
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
