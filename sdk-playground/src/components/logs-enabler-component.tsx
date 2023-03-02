import React from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  enableLogs: boolean;
  setEnableLogs: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogsEnablerComponent = ({ setEnableLogs, enableLogs }: Props) => {
  return (
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
          defaultChecked
          onChange={(e) => setEnableLogs(e.target.checked)}
        />
      </Form.Group>
    </Form>
  );
};

export default LogsEnablerComponent;
