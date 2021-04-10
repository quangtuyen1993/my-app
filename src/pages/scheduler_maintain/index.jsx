import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Container } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { Edit } from "react-feather";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import DialogNote from "../../components/DialogNote";
import MTableMaterial from "../../components/MTableMaterial";
import SchedulerService from "../../service/scheduler.service";

export default function SchedulerMaintain() {
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const [state, setState] = useState({
    data: [],
    noteSelected: {},
    open: false,
    isUpdating: false,
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

  const onSubmit = () => {
    alert("submit");
  };
  const onClose = () => {
    setState((pre) => ({
      ...pre,
      open: false,
    }));
  };

  const onUpdate = (nodeSelected) => {
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
          <Box p={1} width="100%">
            <Button
              fullWidth
              startIcon={<Edit />}
              onClick={() => onUpdate(data)}
              variant="contained"
              color="primary"
            >
              Note
            </Button>
          </Box>
          <Box p={1} width="100%">
            <Button
              fullWidth
              startIcon={<Edit />}
              onClick={() => onDelete(data)}
              variant="contained"
              color="primary"
            >
              Delete
            </Button>
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
        <MTableMaterial
          // showSearch={true}
          isHover
          addControlColumns={[renderControl]}
          dataSource={state.data}
          fieldArray={[
            "createByUser",
            "startTime",
            "endTime",
            "status",
            "content",
          ]}
        />
      </CardLayout>
      <DialogNote
        noteDefault={state.noteSelected}
        open={state.open}
        onSubmit={onSubmit}
        handleClose={onClose}
        onComplete={onFetchScheduler}
      />
    </Container>
  );
}
