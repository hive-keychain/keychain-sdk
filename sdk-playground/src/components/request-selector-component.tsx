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
import { KeychainRequestTypes } from 'hive-keychain-commons';
import CodeTester from './code-tester/code-tester';
import { Utils } from '../utils/utils';

const requestsNameToFilter = [KeychainRequestTypes.signedCall];
export interface KeychainOptions {
  rpc?: string;
}

export type CommonProps = {
  setFormParamsToShow: React.Dispatch<React.SetStateAction<{}>>;
  setRequestResult: any;
  enableLogs: boolean;
};

type Props = {
  setRequestResult: any;
  requestResult: any;
  enabledKeychain: boolean;
  enableLogs: boolean;
  request: any;
  setRequest: any;
};

const RequestSelectorComponent = ({
  setRequestResult,
  requestResult,
  enabledKeychain,
  enableLogs,
  request,
  setRequest,
}: Props) => {
  const [requestCard, setRequestCard] = useState<ReactNode>();
  const [formParamsToShow, setFormParamsToShow] = useState({});
  const commonProps: CommonProps = {
    enableLogs,
    setFormParamsToShow,
    setRequestResult,
  };

  useEffect(() => {
    if (!request) return;
    switch (request) {
      //TODO ask quentin how to solve this as requestLogin do not exist in
      //    hive_commons -> export declare enum KeychainRequestTypes
      // case SDKRequestType.REQUEST_LOGIN:
      //   setRequestCard(
      //     <RequestLoginComponent
      //       setRequestResult={setRequestResult}
      //       enableLogs={enableLogs}
      //     />,
      //   );
      //   break;
      case KeychainRequestTypes.encode:
        setRequestCard(<RequestEncodeMessageComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.decode:
        setRequestCard(<RequestVerifyKeyComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.signBuffer:
        setRequestCard(<RequestSignBufferComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.addAccountAuthority:
        setRequestCard(
          <RequestAddAccountAuthorityComponent {...commonProps} />,
        );
        break;
      case KeychainRequestTypes.removeAccountAuthority:
        setRequestCard(
          <RequestRemoveAccountAuthorityComponent {...commonProps} />,
        );
        break;
      case KeychainRequestTypes.addKeyAuthority:
        setRequestCard(<RequestAddKeyAuthorityComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.removeKeyAuthority:
        setRequestCard(<RequestRemoveKeyAuthorityComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.broadcast:
        setRequestCard(<RequestBroadcastComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.signTx:
        setRequestCard(<RequestSignTxComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.post:
        setRequestCard(<RequestPostComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.vote:
        setRequestCard(<RequestVoteComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.custom:
        setRequestCard(<RequestCustomJsonComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.transfer:
        setRequestCard(<RequestTransferComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.sendToken:
        setRequestCard(<RequestSendTokenComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.delegation:
        setRequestCard(<RequestDelegationComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.witnessVote:
        setRequestCard(<RequestWitnessVoteComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.proxy:
        setRequestCard(<RequestProxyComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.powerUp:
        setRequestCard(<RequestPowerUpComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.powerDown:
        setRequestCard(<RequestPowerDownComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.createClaimedAccount:
        setRequestCard(
          <RequestCreateClaimedAccountComponent {...commonProps} />,
        );
        break;
      case KeychainRequestTypes.createProposal:
        setRequestCard(<RequestCreateProposalComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.removeProposal:
        setRequestCard(<RequestRemoveProposalComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.updateProposalVote:
        setRequestCard(<RequestUpdateProposalVoteComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.addAccount:
        setRequestCard(<RequestAddAccountComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.convert:
        setRequestCard(<RequestConversionComponent {...commonProps} />);
        break;
      case KeychainRequestTypes.recurrentTransfer:
        setRequestCard(<RequestRecurrentTransferComponent {...commonProps} />);
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
              {/* //TODO remove when final clean up */}
              {/* <Form>
                <Form.Select
                  disabled={!enabledKeychain}
                  aria-label="Default select example"
                  onChange={handleChange}>
                  <option>Please select a Request</option>
                  {(
                    Object.keys(
                      KeychainRequestTypes,
                    ) as Array<KeychainRequestTypes>
                  ).map((_type) => {
                    if (
                      requestsNameToFilter.find((request) => request === _type)
                    )
                      return null;
                    return (
                      <option
                        value={KeychainRequestTypes[_type]}
                        key={`${_type}-rq-type`}>
                        {_type}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form> */}
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
                text={Utils.fromCodeToText(
                  formParamsToShow,
                  request as KeychainRequestTypes,
                )}
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
      {/* TESTING to test code. Uncomment to use */}
      {/* <CodeTester /> */}
      {/* END testing */}
    </Container>
  );
};

export default RequestSelectorComponent;
