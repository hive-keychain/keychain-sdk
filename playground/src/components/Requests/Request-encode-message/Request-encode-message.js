import React, { useState } from 'react';
import { KeychainSDK } from 'keychain-sdk';
import './Request-encode-message.css';

export default function RequestEncodeMessage({ setRequestResult }) {
  const sdk = new KeychainSDK(window);
  const [formParams, setFormParams] = useState({
    username: '',
    receiver: '',
    message: '',
    method: '',
  });
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    handleFormParams(e);
  };

  const handleFormParams = (e) => {
    const { name, value } = e.target;
    if (value !== '') {
      setFormParams((prevFormParams) => ({ ...prevFormParams, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('about to process: ', { formParams });
    try {
      const encodeMessage = await sdk.requestEncodeMessage(formParams);
      setRequestResult(encodeMessage);
      console.log({ encodeMessage });
    } catch (error) {
      setRequestResult(error);
      console.log({ error });
    }
  };

  return (
    <div className="request-encode-message-container">
      <div>Request-encode-message</div>
      <form
        className="form"
        onSubmit={handleSubmit}
        onChange={handleFormParams}>
        <div className="row-input-line">
          <label htmlFor="username">Username @</label>
          <input name="username" placeholder="username"></input>
        </div>
        <div className="row-input-line">
          <label htmlFor="receiver">Receiver @ </label>
          <input name="receiver" placeholder="receiver"></input>
        </div>
        <div className="row-input-line">
          <label htmlFor="message">Message </label>
          <textarea
            name="message"
            placeholder="#message, (# required)"></textarea>
        </div>
        <select
          name="method"
          onChange={handleChange}
          value={selectedOption}
          className="select-half">
          <option value="" disabled>
            Select a Method:
          </option>
          <option value="Active">Active</option>
          <option value="Posting">Posting</option>
          <option value="Memo">Memo</option>
        </select>
        <button className="button-margin">Process Request</button>
      </form>
    </div>
  );
}
