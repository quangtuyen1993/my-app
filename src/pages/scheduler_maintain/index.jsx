import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Container, IconButton } from "@material-ui/core";
import { indigo, red } from "@material-ui/core/colors";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import WarningDialog from "../../components/WarningDialog";
import DialogNote from "../../components/DialogNote";
import MTableMaterial from "../../components/MTableMaterial";
import SchedulerService from "../../service/scheduler.service";

export default function SchedulerMaintain() {
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const { userProfile } = useSelector((state) => state.authorReducer);
  const [state, setState] = useState({
    data: [],
    noteSelected: {},
    open: false,
    isUpdating: false,
    isDeleting: false,
    openConfirm: false,
  });

  const onFetchScheduler = useCallback(async () => {
    if (stationSelected.id === undefined) return;
    var res = await SchedulerService.fetchAll(stationSelected.id);
    console.log(res);
    setState((pre) => ({
      ...pre,
      data: res.data,
    }));
  }, [stationSelected.id]);

  useEffect(() => {
    onFetchScheduler();
    return () => {};
  }, [onFetchScheduler]);

  const onClose = () => {
    setState((pre) => ({
      ...pre,
      open: false,
    }));
  };

  const onUpdate = (nodeSelected) => {
    if (!checkAuthor(nodeSelected)) return;
    setState((pre) => {
      return {
        ...pre,
        noteSelected: nodeSelected,
        isUpdating: true,
      };
    });
  };

  const onInsert = () => {
    setState((pre) => {
      return {
        ...pre,
        noteSelected: {},
        isUpdating: true,
      };
    });
  };

  const onDelete = async (item) => {
    await SchedulerService.remove({ id: item.id });
    onFetchScheduler();
  };

  const openConfirm = (item) => {
    if (!checkAuthor(item)) return;
    setState((pre) => ({
      ...pre,
      noteSelected: item,
      isDeleting: true,
    }));
  };

  useEffect(() => {
    if (!state.isDeleting) return;
    setState((pre) => ({
      ...pre,
      openConfirm: true,
      isDeleting: false,
    }));
  }, [state.isDeleting]);

  const closeConfirm = () => {
    setState((pre) => ({
      ...pre,
      openConfirm: false,
    }));
  };

  const confirmSubmit = (item) => {
    onDelete(item);
  };

  const checkAuthor = (item) => {
    if (userProfile.role === "Admin") {
      return true;
    }
    if (item.accountId === userProfile.id) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (state.isUpdating) {
      setState((pre) => ({
        ...pre,
        open: true,
        isUpdating: false,
      }));
    }
  }, [state.isUpdating]);

  const renderControl = {
    name: "Controls",
    component: (data, index) => {
      return (
        <Box
          key={index}
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1} width="100%">
              <IconButton
                size="medium"
                style={{
                  backgroundColor: indigo[500],
                }}
                onClick={() => onUpdate(data)}
              >
                <FontAwesomeIcon
                  style={{ color: "white" }}
                  icon={IconApp.EDIT}
                />
              </IconButton>
            </Box>
            <Box p={1} width="100%">
              <IconButton
                size="medium"
                style={{
                  backgroundColor: red[500],
                }}
                onClick={() => openConfirm(data)}
                variant="contained"
              >
                <FontAwesomeIcon
                  style={{ color: "white" }}
                  icon={IconApp.DELETE}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      );
    },
  };

  return (
    <Container maxWidth={false}>
      <CardLayout title="Scheduler Task" icon={IconApp.CALENDAR}>
        <Button
          onClick={onInsert}
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={IconApp.ADD} />}
        >
          New scheduler
        </Button>
        <Box mt={2}>
          <MTableMaterial
            noneBorder
            contentField="content"
            showSearch={true}
            rowsPerPage={10}
            isHover
            addControlColumns={[renderControl]}
            dataSource={state.data}
            fieldArray={[
              "createByUser",
              "startTime",
              "endTime",
              "content",
            ]}
          />
        </Box>
      </CardLayout>
      <DialogNote
        noteDefault={state.noteSelected}
        open={state.open}
        handleClose={onClose}
        onComplete={onFetchScheduler}
      />
      <WarningDialog
        noteDefault={state.noteSelected}
        open={state.openConfirm}
        title="Waring"
        content="Are you sure delete this item"
        onSubmit={confirmSubmit}
        onClose={closeConfirm}
      />
    </Container>
  );
}
