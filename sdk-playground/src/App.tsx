import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequestSelectorComponent from './components/request-selector-component';
import KeychainCheckerComponent from './components/keychain-checker-component';
import RequestResultsComponent from './components/request-results-component';
import FooterComponent from './components/footer-component';
import LogsEnablerComponent from './components/logs-enabler-component';

function App() {
  const [enabledKeychain, setEnabledKeychain] = useState(false);
  const [requestResult, setRequestResult] = useState();
  const [enableLogs, setEnableLogs] = useState(true);

  return (
    <div className="App">
      <KeychainCheckerComponent
        setEnabledKeychain={setEnabledKeychain}
        enableLogs={enableLogs}
      />
      <LogsEnablerComponent
        enableLogs={enableLogs}
        setEnableLogs={setEnableLogs}
      />
      <RequestSelectorComponent
        setRequestResult={setRequestResult}
        requestResult={requestResult}
        enabledKeychain={enabledKeychain}
        enableLogs={enableLogs}
      />
      {requestResult && (
        <RequestResultsComponent
          requestResult={requestResult}
          enableLogs={enableLogs}
        />
      )}
      <FooterComponent />
    </div>
  );
}

export default App;
