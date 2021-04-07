import React from "react";
import { Box, Button, Container } from "@material-ui/core";
import CardLayout from "../../common/layouts/CardLayout";
import IconApp from "../../common/icons";
import MTableMaterial from "../../components/MTableMaterial";
import { Edit } from "react-feather";
const createSchedulerTask = (id, startDate, endDate, deviceId, note) => {
  return {
    id: id,
    startDate: startDate,
    endDate: endDate,
    deviceId: deviceId,
    note: note,
  };
};
const listTask = [
  createSchedulerTask(
    1,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    "fix update",
    "12",
    ""
  ),
  createSchedulerTask(
    2,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    "fix ",
    "12",
    ""
  ),
  createSchedulerTask(
    3,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    " update",
    "12",
    ""
  ),
  createSchedulerTask(
    4,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    "fix update",
    "12",
    ""
  ),
  createSchedulerTask(
    5,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    "fix ",
    "12",
    ""
  ),
  createSchedulerTask(
    6,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    " update",
    "12",
    ""
  ),
  createSchedulerTask(
    11,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    "fix update",
    "12",
    ""
  ),
  createSchedulerTask(
    22,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    "fix ",
    "12",
    ""
  ),
  createSchedulerTask(
    33,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    " update",
    "12",
    ""
  ),
  createSchedulerTask(
    44,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    "fix update",
    "12",
    ""
  ),
  createSchedulerTask(
    55,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    "fix ",
    "12",
    ""
  ),
  createSchedulerTask(
    66,
    "2021-04-05 00:00:00",
    "2021-05-05 00:00:00",
    " update",
    "12",
    ""
  ),
];

const renderControl = {
  name: "Controls",
  component: (data, index) => {
    return (
      <Box
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
  return (
    <Container maxWidth={false}>
      <CardLayout title="Scheduler Task" icon={IconApp.CALENDAR}>
        <MTableMaterial
          // showSearch={true}
          rowsPerPage={5}
          addControlColumns={[renderControl]}
          dataSource={listTask}
          fieldArray={["id", "deviceId", "startDate", "endDate", "note"]}
        />
        Scheduler Maintain
      </CardLayout>
    </Container>
  );
}
