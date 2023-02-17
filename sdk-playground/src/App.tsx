import { useState } from 'react';
import './App.css';
import Keychainchecker from './components/Keychain-checker';
import RequestSelector from './components/Request-selector';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequestResults from './components/Request-results';

function App() {
  const [enabledKeychain, setEnabledKeychain] = useState(false);
  const [requestResult, setRequestResult] = useState(); //TODO add proper types

  return (
    <div className="App">
      <Keychainchecker setEnabledKeychain={setEnabledKeychain} />
      <RequestSelector
        setRequestResult={setRequestResult}
        requestResult={requestResult}
        enabledKeychain={enabledKeychain}
      />
      {requestResult && <RequestResults requestResult={requestResult} />}
    </div>
  );
}

export default App;
