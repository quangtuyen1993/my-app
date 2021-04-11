import {
  Container,
  Grid,

  TextField,
  useTheme
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { grey } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";

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
    <Container>
      <Dialog
        fullWidth
        maxWidth={"xs"}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ backgroundColor: theme.palette.primary.main }}
          id="alert-dialog-title"
        >
          Confirm Password
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid
              container
              direction="column"
              spacing={2}
              style={{ marginTop: theme.spacing(1) }}
            >
              <Grid item>
                <TextField
                  placeholder="Please enter your password"
                  name="password"
                  onChange={handleChange}
                  value={state.value}
                  type="password"
                  variant="outlined"
                  fullWidth
                  label="Password"
                />
              </Grid>
            </Grid>
          </DialogContentText>
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
    </Container>
  );
}
