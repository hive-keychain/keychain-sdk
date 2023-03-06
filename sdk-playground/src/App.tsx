import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequestSelectorComponent from './components/request-selector-component';
import KeychainCheckerComponent from './components/keychain-checker-component';
import RequestResultsComponent from './components/request-results-component';
import FooterComponent from './components/footer-component';
import LogsEnablerComponent from './components/logs-enabler-component';
import { Button, Container } from 'react-bootstrap';
import SearchModal from './components/search-modal';

function App() {
  const [enabledKeychain, setEnabledKeychain] = useState(false);
  const [requestResult, setRequestResult] = useState();
  const [enableLogs, setEnableLogs] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [request, setRequest] = useState<string>();

  return (
    <div className="App">
      <KeychainCheckerComponent
        setEnabledKeychain={setEnabledKeychain}
        enableLogs={enableLogs}
      />
      <Container className="d-flex justify-content-center mt-2 mb-2">
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Search
        </Button>

        <SearchModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          setRequest={setRequest}
        />
      </Container>
      <LogsEnablerComponent
        enableLogs={enableLogs}
        setEnableLogs={setEnableLogs}
      />
      {/* //TODO conditional render from here. Show "Please search or press F11" */}
      <RequestSelectorComponent
        setRequestResult={setRequestResult}
        requestResult={requestResult}
        enabledKeychain={enabledKeychain}
        enableLogs={enableLogs}
        request={request}
        setRequest={setRequest}
      />
      {requestResult && (
        <RequestResultsComponent
          requestResult={requestResult}
          enableLogs={enableLogs}
        />
      )}
      {/* //TODO UNTIL here conditional render. Show "Please search or press F11" */}
      <FooterComponent />
    </div>
  );
}

export default App;
