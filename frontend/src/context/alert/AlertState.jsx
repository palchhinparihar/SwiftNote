import { useState } from "react";
import AlertConext from "./AlertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <AlertConext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertConext.Provider>
  )
}

export default AlertState;
