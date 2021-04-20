import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputAdornment, TextField, useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { grey } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import IconApp from "../common/icons";

export default function ConfirmDialog({ onSubmit, onClose, open, name }) {
  const theme = useTheme();
  const [state, setState] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setState((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = () => {
    onSubmit(state.password);
  };

  return (
    <React.Fragment>
      <Dialog fullWidth maxWidth={"xs"} open={open}>
        <DialogTitle style={{ backgroundColor: theme.palette.primary.main }}>
          Confirm Password
        </DialogTitle>
        <DialogContent style={{ padding: theme.spacing(2) }}>
          <TextField
            placeholder="Please enter your password"
            name="password"
            onChange={handleChange}
            value={state.value}
            type="password"
            fullWidth
            variant="outlined"
            label="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={IconApp.SECURITY} />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions style={{ background: grey[300] }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            autoFocus
          >
            Accept
          </Button>
          <Button onClick={onClose} variant="contained" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
