import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography, useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { grey } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useCallback, useEffect, useState } from "react";
import ColorsApp from "../common/colors";
import IconApp from "../common/icons";

export default function WarningDialog({
  title,
  content,
  onSubmit,
  onClose,
  open,
  noteDefault,
}) {
  const [state, setState] = useState({
    noteDefault: {},
  });

  const theme = useTheme();
  useEffect(() => {
    setState((pre) => ({
      ...pre,
      noteDefault: noteDefault,
    }));
  }, [noteDefault]);

  useEffect(() => {}, [onSubmit, state.noteDefault]);

  const submit = useCallback(() => {
    onSubmit(state.noteDefault);
    onClose();
  }, [onClose, onSubmit, state.noteDefault]);

  return (
    <>
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
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              display="flex"
              minHeight="100px"
              justifyContent="center"
              //   justifyItem="flex-around"
              alignItems="center"
            >
              <Box m={2}>
                <FontAwesomeIcon
                  icon={IconApp.INFO}
                  size="4x"
                  color={ColorsApp.POWER}
                />
              </Box>
              <Box m={2}>
                <Typography variant="subtitle1" style={{color:"black"}}>{content}</Typography>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ background: grey[300] }}>
          <Button
            onClick={submit}
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
    </>
  );
}
