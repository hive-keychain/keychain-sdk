import React, { useState, useEffect } from 'react';
import RequestEncodeMessage from '../Requests/Request-encode-message';
import './Request-selector.css';

export default function RequestSelector({ setRequestResult, enabledKeychain }) {
  const [request, setRequest] = useState('');
  const [requestCard, setRequestCard] = useState(null);

  useEffect(() => {
    if (request !== '') {
      switch (request) {
        case 'request_encode_message':
          setRequestCard(
            <RequestEncodeMessage setRequestResult={setRequestResult} />,
          );
          break;
        default:
          setRequestCard(null);
          break;
      }
    }
  }, [request]);

  const handleChange = (e) => {
    setRequest(e.target.value);
  };

  return (
    <div className="request-selector-container">
      <select
        onChange={handleChange}
        value={request}
        disabled={!enabledKeychain}>
        <option value="" disabled>
          Select a Request:
        </option>
        <option value="request_encode_message">request_encode_message</option>
        <option value="lime">Lime</option>
        <option selected value="coconut">
          Coconut
        </option>
        <option value="mango">Mango</option>
      </select>
      <br />
      <div>{requestCard ? requestCard : 'Please select a request'}</div>
    </div>
  );
}
