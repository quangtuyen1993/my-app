import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Container } from "@material-ui/core";
import CardLayout from "../../common/layouts/CardLayout";
import IconApp from "../../common/icons";
import MTableMaterial from "../../components/MTableMaterial";
import { Edit } from "react-feather";
import SchedulerService from "../../service/scheduler.service";
import { useSelector } from "react-redux";
const createSchedulerTask = (id, startDate, endDate, deviceId, note) => {
  return {
    id: id,
    startDate: startDate,
    endDate: endDate,
    deviceId: deviceId,
    note: note,
  };
};

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
        <Button startIcon={<Edit />} variant="contained" color="primary">
          Note
        </Button>
      </Box>
    );
  },
};

export default function SchedulerMaintain() {
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const [state, setState] = useState({
    data: [],
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

  return (
    <Container maxWidth={false}>
      <CardLayout title="Scheduler Task" icon={IconApp.CALENDAR}>
        <MTableMaterial
          // showSearch={true}
          isHover
          rowsPerPage={5}
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
        Scheduler Maintain
      </CardLayout>
    </Container>
  );
}
