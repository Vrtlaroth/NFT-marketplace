import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import store from "../../store/index";

export default function StatusMessage() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  React.useEffect(() => {
    store.subscribe(() => {
      var state = store.getState();

      if (state.errors.message && state.errors.message.severity) {
        setMessage(state.errors.message);
        setSeverity(state.errors.severity);
      }

      if (message && severity) {
        setOpen(true);
      }
    });
  }, [message, severity]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="status-message">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
