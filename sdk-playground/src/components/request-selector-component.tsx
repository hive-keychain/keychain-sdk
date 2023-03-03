import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Container,
  Collapse,
  Row,
  Col,
} from 'react-bootstrap';
import RequestAddAccountAuthorityComponent from './requests/request-add-account-authority-component';
import RequestAddKeyAuthorityComponent from './requests/request-add-key-authority-component';
import RequestBroadcastComponent from './requests/request-broadcast-component';
import RequestCreateClaimedAccountComponent from './requests/request-create-claimed-account-component';
import RequestCreateProposalComponent from './requests/request-create-proposal-component';
import RequestCustomJsonComponent from './requests/request-custom-json-component';
import RequestDelegationComponent from './requests/request-delegation-component';
import RequestEncodeMessageComponent from './requests/request-encode-message-component';
import RequestLoginComponent from './requests/request-login-component';
import RequestPostComponent from './requests/request-post-component';
import RequestPowerDownComponent from './requests/request-power-down-component';
import RequestPowerUpComponent from './requests/request-power-up-component';
import RequestProxyComponent from './requests/request-proxy-component';
import RequestRemoveAccountAuthorityComponent from './requests/request-remove-account-authority-component';
import RequestRemoveKeyAuthorityComponent from './requests/request-remove-key-authority-component';
import RequestRemoveProposalComponent from './requests/request-remove-proposal-component';
import RequestSendTokenComponent from './requests/request-send-token-component';
import RequestSignBufferComponent from './requests/request-sign-buffer-component';
import RequestSignTxComponent from './requests/request-sign-tx-component';
import RequestTransferComponent from './requests/request-transfer-component';
import RequestUpdateProposalVoteComponent from './requests/request-update-proposal-vote-component';
import RequestVerifyKeyComponent from './requests/request-verify-key-component';
import RequestVoteComponent from './requests/request-vote-component';
import RequestWitnessVoteComponent from './requests/request-witness-vote-component';
import RequestAddAccountComponent from './requests/request-add-account-component';
import RequestConversionComponent from './requests/request-conversion-component';
import RequestRecurrentTransferComponent from './requests/request-recurrent-transfer-component';
import { CopyBlock, solarizedDark } from 'react-code-blocks';

export enum SDKRequestType {
  //TODO change to uppercase on left.
  //REQUEST_LOGIN = 'REQUEST_LOGIN',
  REQUEST_LOGIN = 'REQUEST_LOGIN',
  Request_Encode_Message = 'Request_Encode_Message',
  Request_Verify_Key = 'Request_Verify_Key',
  Request_Sign_Buffer = 'Request_Sign_Buffer',
  Request_Add_Account_Authority = 'Request_Add_Account_Authority',
  Request_Remove_Account_Authority = 'Request_Remove_Account_Authority',
  Request_Add_Key_Authority = 'Request_Add_Key_Authority',
  Request_Remove_Key_Authority = 'Request_Remove_Key_Authority',
  Request_Broadcast = 'Request_Broadcast',
  Request_Sign_Tx = 'Request_Sign_Tx',
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

//TODO
// 	- remove select on main -> change as something as the algolia search
//   - showing all categories if nothing to search

//TODO move to utils maybe?
const fromCodeToText = (params: {}) => {
  return `
try {\n
    const params = ${JSON.stringify(params)};\n
    const encodeMessage = await sdk.requestEncodeMessage(formParams);\n
    setRequestResult(encodeMessage);
    if (enableLogs) console.log({ encodeMessage });
  } catch (error) {
    setRequestResult(error);
  }`;
};

export interface KeychainOptions {
  rpc?: string;
}

type Props = {
  setRequestResult: any;
  requestResult: any;
  enabledKeychain: boolean;
  enableLogs: boolean;
};

const RequestSelectorComponent = ({
  setRequestResult,
  requestResult,
  enabledKeychain,
  enableLogs,
}: Props) => {
  const [request, setRequest] = useState<string>();
  const [requestCard, setRequestCard] = useState<ReactNode>();

  useEffect(() => {
    switch (request) {
      case SDKRequestType.REQUEST_LOGIN:
        setRequestCard(
          <RequestLoginComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Encode_Message:
        setRequestCard(
          <RequestEncodeMessageComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Verify_Key:
        setRequestCard(
          <RequestVerifyKeyComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Sign_Buffer:
        setRequestCard(
          <RequestSignBufferComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Add_Account_Authority:
        setRequestCard(
          <RequestAddAccountAuthorityComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Remove_Account_Authority:
        setRequestCard(
          <RequestRemoveAccountAuthorityComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Add_Key_Authority:
        setRequestCard(
          <RequestAddKeyAuthorityComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Remove_Key_Authority:
        setRequestCard(
          <RequestRemoveKeyAuthorityComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Broadcast:
        setRequestCard(
          <RequestBroadcastComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Sign_Tx:
        setRequestCard(
          <RequestSignTxComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Post:
        setRequestCard(
          <RequestPostComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Vote:
        setRequestCard(
          <RequestVoteComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Custom_Json:
        setRequestCard(
          <RequestCustomJsonComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Transfer:
        setRequestCard(
          <RequestTransferComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Send_Token:
        setRequestCard(
          <RequestSendTokenComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Delegation:
        setRequestCard(
          <RequestDelegationComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Witness_Vote:
        setRequestCard(
          <RequestWitnessVoteComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Proxy:
        setRequestCard(
          <RequestProxyComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Power_Up:
        setRequestCard(
          <RequestPowerUpComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Power_Down:
        setRequestCard(
          <RequestPowerDownComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Create_Claimed_Account:
        setRequestCard(
          <RequestCreateClaimedAccountComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Create_Proposal:
        setRequestCard(
          <RequestCreateProposalComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Remove_Proposal:
        setRequestCard(
          <RequestRemoveProposalComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Update_Proposal_Vote:
        setRequestCard(
          <RequestUpdateProposalVoteComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Add_Account:
        setRequestCard(
          <RequestAddAccountComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Conversion:
        setRequestCard(
          <RequestConversionComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
        );
        break;
      case SDKRequestType.Request_Recurrent_Transfer:
        setRequestCard(
          <RequestRecurrentTransferComponent
            setRequestResult={setRequestResult}
            enableLogs={enableLogs}
          />,
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
    <Container fluid>
      <Row>
        <Col className="w-50">
          <Card className="d-flex justify-content-center">
            <Card.Header as={'h4'}>SDK Playground</Card.Header>
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
          </Card>
        </Col>
        <Col className="w-50">
          <Card className="d-flex">
            <Card.Header as={'h4'}>Code Sample</Card.Header>
            <Card.Body>
              <CopyBlock
                text={fromCodeToText({ one: 1, two: 2 })} //JSON.stringify([1, 2, 3])
                language={'typescript'}
                showLineNumbers={false}
                startingLineNumber={1}
                wrapLines
                theme={solarizedDark}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestSelectorComponent;
