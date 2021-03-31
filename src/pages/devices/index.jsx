import { Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import CardLayout from "../../common/layouts/CardLayout";
import TableApp from "../../components/TableApp";

export default function DeviceScreen() {
  const [state, setState] = useState({
    Inverters: [],
    MCCB_ABC:[],
    POWER_METER:[],
    Sensors:[]

  });

  useEffect(() => {
    setState((pre) => {
      return {
        ...pre,
        Inverters: Inverter,
        MCCB_ABC:MCCB_ABC,
        POWER_METER:POWER_METER,
        Sensors:Sensors
    
      };
    });
  }, []);

  return (
    <>
      <Container disableGutters direction="row" maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="Inverters">
                  <TableApp
                    data={state.Inverter}
                    chipField={["Status"]}
                    field={["Name", "Status"]}
                    fieldTitle={["Name", "Status", "Operate"]}
                    link={true}
                    path="/device"
                  />
                </CardLayout>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="MCCB_ABC">
                  <TableApp
                    data={state.MCCB_ABC}
                    chipField={["Status"]}
                    field={["Name", "Status"]}
                    fieldTitle={["Name", "Status"]}
                    path="/device"
                  />
                </CardLayout>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="POWER_METER">
                  <TableApp
                    data={state.POWER_METER}
                    chipField={["Status"]}
                    field={["Name", "Status"]}
                    fieldTitle={["Name", "Status", "Operate"]}
                    link={true}
                    path="/device"
                  />
                </CardLayout>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="Sensors">
                  <TableApp
                    data={state.Sensors}
                    chipField={["Status"]}
                    field={["Name", "Status"]}
                    fieldTitle={["Name", "Status"]}
                    path="/device"
                  />
                </CardLayout>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const Inverter = [
  {
    "#": 1,
    Name: "Inverter 1",
    Status: "Run",
    Operate: "Detail",
  },
  {
    "#": 2,
    Name: "Inverter 2",
    Status: "Run",
    Operate: "Detail",
  },
  {
    "#": 3,
    Name: "Inverter 3",
    Status: "Run",
    Operate: "Detail",
  },
  {
    "#": 4,
    Name: "Inverter 4",
    Status: "Run",
    Operate: "Detail",
  },
  {
    "#": 5,
    Name: "Inverter 5",
    Status: "Run",
    Operate: "Detail",
  },
  {
    "#": 6,
    Name: "Inverter 6",
    Status: "Run",
    Operate: "Detail",
  },
  {
    "#": 7,
    Name: "Inverter 7",
    Status: "Run",
    Operate: "Detail",
  },
  {
    "#": 8,
    Name: "Inverter 8",
    Status: "Run",
    Operate: "Detail",
  },
];
const MCCB_ABC = [
  {
    "#": 1,
    Name: "ACB 1",
    Status: "Closed",
  },
  {
    "#": 2,
    Name: "MCCB 1",
    Status: "Closed",
  },
  {
    "#": 3,
    Name: "MCCB 2",
    Status: "Closed",
  },
  {
    "#": 4,
    Name: "MCCB 3",
    Status: "Closed",
  },
  {
    "#": 5,
    Name: "MCCB 4",
    Status: "Closed",
  },
  {
    "#": 6,
    Name: "MCCB 5",
    Status: "Closed",
  },
  {
    "#": 7,
    Name: "MCCB 6",
    Status: "Closed",
  },
  {
    "#": 8,
    Name: "MCCB 7",
    Status: "Closed",
  },
  {
    "#": 9,
    Name: "MCCB 8",
    Status: "Closed",
  },
];
const POWER_METER = [
  {
    "#": 1,
    Name: "Power Meter1",
    Status: "Online",
    Operate: "Detail",
  },
];
const Sensors = [
  {
    "#": 1,
    Name: "Wind",
    Status: "Online",
  },
  {
    "#": 2,
    Name: "Radiation - Ambient Temp",
    Status: "Online",
  },
];
