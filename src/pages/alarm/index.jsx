import { Box, Container, Grid, useTheme } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CardLayout from "../../common/layouts/CardLayout";
import MDatePicker from "../../components/MDatePicker";
import MTableMaterial from "../../components/MTableMaterial";
import SearchBar from "../../components/SearchBar";
import TableAppOverSize from "../../components/TableAppOverSize";
import AlarmService from "../../service/alarm.service";

export default function AlarmScreen() {
  const theme = useTheme();
  const boundTable = useRef(null);
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const [state, setState] = useState({
    fromDate: null,
    toDate: null,
    heightTable: 100,
  });

  useEffect(() => {
    const fetchRealTimeData = async () => {
      var data = await AlarmService.fetchRealTime({
        stationId: stationSelected.id,
      });
      return data;
    };

    const fetchHistoricalData = async () => {
      var data = await AlarmService.fetchHistorical({
        stationId: stationSelected.id,
      });
      console.info("HISTORY CALL", data);
      return data;
    };

    fetchRealTimeData();
    fetchHistoricalData();
  });

  useEffect(() => {
    try {
      var newHeight = boundTable.current.getBoundingClientRect();
      if (state.heightTable !== newHeight.height + theme.spacing(2) * 2)
        setState((pre) => {
          return {
            ...pre,
            heightTable: newHeight.height + theme.spacing(2) * 2,
          };
        });
    } catch (e) {}
  }, [state.heightTable, theme]);

  const handleRangeDateChange = (from, to) => {
    setState((pre) => {
      return {
        ...pre,
        fromDate: from,
        toDate: to,
      };
    });
  };

  return (
    <>
      <Container disableGutters direction="row" maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12} lg={12}>
            <CardLayout>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Grid container justify="flex-start" spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <MDatePicker
                        isSingleDate={false}
                        onRangeDateChange={handleRangeDateChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Box style={{ overflowX: "auto" }}></Box>
                </Grid>
              </Grid>
              <MTableMaterial
                rowsPerPage={5}
                dataSource={historical}
                fieldArray={[
                  "Action",
                  "State",
                  "Name",
                  "Incomming Time",
                  "Alarm Text",
                  "Value",
                  "Limit",
                  "Compare Mode",
                  "Outgoing Time",
                  "Ack Time",
                ]}
              />
            </CardLayout>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
const historical = [
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:29:23",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:29:25",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:31:37",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:31:38",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:32:58",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:32:59",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:33:16",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:33:18",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:39:46",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:39:47",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:40:23",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:40:26",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:43:06",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:43:07",
    "Ack Time": "2021-03-23 16:56:28",
  },

  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:29:23",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:29:25",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:31:37",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:31:38",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:32:58",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:32:59",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:33:16",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:33:18",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:39:46",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:39:47",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:40:23",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:40:26",
    "Ack Time": "2021-03-23 16:56:28",
  },
  {
    Action: "Done",
    State: "Ack",
    Name: "Quality_Sensor_Wind",
    "Incomming Time": "2021-03-23 16:43:06",
    "Alarm Text": "Wind sensor was disconnected",
    Value: "Bad",
    Limit: "Bad",
    "Compare Mode": "Equal",
    "Outgoing Time": "2021-03-23 16:43:07",
    "Ack Time": "2021-03-23 16:56:28",
  },
];
