import React, { useState, useEffect } from 'react';
import RequestEncodeMessage from '../Requests/Request-encode-message/Request-encode-message';
import RequestSignBuffer from '../Requests/Request-sign-buffer';
import RequestVerifyKey from '../Requests/Request-verify-key/Request-verify-key';
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
        case 'request_verify_key':
          setRequestCard(
            <RequestVerifyKey setRequestResult={setRequestResult} />,
          );
          break;
        case 'request_sign_buffer':
          setRequestCard(
            <RequestSignBuffer setRequestResult={setRequestResult} />,
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
    setRequestResult(undefined);
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
        <option value="request_verify_key">request_verify_key</option>
        <option selected value="request_sign_buffer">
          request_sign_buffer
        </option>
        <option value="mango">Mango</option>
      </select>
      <br />
      <div>{requestCard ? requestCard : 'Please select a request'}</div>
    </div>
  );
}
