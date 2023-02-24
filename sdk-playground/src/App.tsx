import { useState } from 'react';
import './App.css';
import Keychainchecker from './components/Keychain-checker';
import RequestSelector from './components/Request-selector';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequestResults from './components/Request-results';
import { Form } from 'react-bootstrap';
import Footer from './components/Footer';

function App() {
  const [enabledKeychain, setEnabledKeychain] = useState(false);
  const [requestResult, setRequestResult] = useState();
  const [enableLogs, setEnableLogs] = useState(false);

  return (
    <div className="App">
      <Keychainchecker
        setEnabledKeychain={setEnabledKeychain}
        enableLogs={enableLogs}
      />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <Form.Group className="mb-3 d-flex justify-content-center">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="enable logs"
            title={'enable logs in console for extra information'}
            value={enableLogs ? 'true' : 'false'}
            onChange={(e) => setEnableLogs(e.target.checked)}
          />
        </Form.Group>
      </Form>
      <RequestSelector
        setRequestResult={setRequestResult}
        requestResult={requestResult}
        enabledKeychain={enabledKeychain}
        enableLogs={enableLogs}
      />
      {requestResult && (
        <RequestResults requestResult={requestResult} enableLogs={enableLogs} />
      )}
      <Footer />
    </div>
  );
}

export default App;
