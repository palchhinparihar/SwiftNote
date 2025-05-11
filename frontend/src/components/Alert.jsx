import React, { useContext } from 'react';
import { capitalize } from '../utils';
import AlertContext from '../context/alert/AlertContext';

const Alert = () => {
  const context = useContext(AlertContext);
  const { alert } = context;

  return (
    <div style={{ height: "40px" }}>
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <span><strong>{capitalize(alert.type === "danger" ? "error" : alert.type)}</strong> : {alert.msg}</span>
        </div>
      )}
    </div>
  )
}

export default Alert;