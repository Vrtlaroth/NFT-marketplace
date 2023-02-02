import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "./ActionDialogue.scss";
import store from "../../store/index";
import { handleDialogResult } from "../../store/actions/dialogue";

export default function ActionDialogue() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [action, setAction] = React.useState("Ok");
  const [data, setData] = React.useState({});
  const [input, setInput] = React.useState({
    show: false,
    type: "text",
    placeholder: "Insert value here...",
  });

  const inputRef = React.createRef();
  const errorRef = React.createRef();

  React.useEffect(() => {
    store.subscribe(() => {
      let state = store.getState();
      setOpen(state.dialogue.open);
      setTitle(state.dialogue.title);
      setSubtitle(state.dialogue.subtitle);
      setContent(state.dialogue.content);
      setAction(state.dialogue.action);
      setData(state.dialogue.data);
      setInput(state.dialogue.input);
    });

  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    let price = inputRef.current ? inputRef.current.value : 0;
    if (price || action === "Cancel") {
      store.dispatch(handleDialogResult(action, data, price));
      setOpen(false);
    } else {
      inputRef.current.className = "input-error";
      errorRef.current.style.display = "block";
    }
  };

  const handleInputChange = (event) => {
    inputRef.current.className = "";
    errorRef.current.style.display = "none";
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog"
        aria-describedby="dialog-content"
      >
        <DialogTitle className="dialog-title">{title}</DialogTitle>
        <DialogContent>
          <h3 className="dialog-subtitle">{subtitle}</h3>
          <DialogContentText id="dialog-description">
            {content}
          </DialogContentText>
          {input && input.show && (
            <input
              type={input.type}
              id="dialog-input"
              placeholder={input.placeholder}
              ref={inputRef}
              onChange={handleInputChange}
            ></input>
          )}
          <div className="dialog-errors" ref={errorRef}>
            You must name the price before the listing!
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAction} autoFocus>
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
