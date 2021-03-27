import {
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardLayout from "../../../common/layouts/CardLayout";
import TableApp from "../../../components/TableApp";
import PowerTrend from "../../dashboards/components/PowerTrend";

var modal = {
  dc_input: "99.533 w",
  ac_output: "97.077 w",
  frequency: "49.91 hz",
  internal_temp: "56.9 °c 46.5",
  energy_to_day: " 238.9 kwh  83.8",
  energy_this_month: "13.35 mwh 23.8",
  energy_this_year: "44.72 mwh",
  total_energy_production: "63.64 mwh",
};
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

export default function DetailScreen(props) {
  let { id } = useParams();

  const [device, setDevice] = useState({});
  const [keys, setKey] = useState([]);

  useEffect(() => {
    setDevice(modal);
    setKey(Object.keys(modal));
  }, [modal]);

  return (
    <Container disableGutters direction="row" maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CardLayout title="General Info">
            <Grid container spacing={2}>
              {keys.map((k, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3} p={2}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="body1">
                          {k.replace("_", " ").toUpperCase()}
                        </Typography>
                        <BorderLinearProgress
                          variant="determinate"
                          value={50}
                        />
                        <Typography variant="body1">{device[k]}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CardLayout>
        </Grid>

        <Grid item sm={12}>
          <Grid container spacing={2} direction="row">
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <CardLayout title="DC Input">
                <TableApp data={dcInput} field={["DC", "Voltage", "Current"]} />
              </CardLayout>
            </Grid>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <CardLayout title="DC OutPut">
                <TableApp
                  pagination={true}
                  chipField={["AC"]}
                  chipComponent={(item, f) => (
                    <Chip label={item[f]} style={{ backgroundColor: "red" }} />
                  )}
                  data={dcOutPut}
                  field={["AC", "Voltage", "Current"]}
                />
              </CardLayout>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12}>
          <PowerTrend />
        </Grid>
      </Grid>
    </Container>
  );
}

const dcInput = [
  {
    DC: "MPPT1",
    Voltage: "753.8 V",
    Current: "6.3 A",
  },
  {
    DC: "MPPT2",
    Voltage: "752.1 V",
    Current: "6.2 A",
  },
  {
    DC: "MPPT3",
    Voltage: "755.5 V",
    Current: "6.4 A",
  },
  {
    DC: "MPPT4",
    Voltage: "754.6 V",
    Current: "6.4 A",
  },
  {
    DC: "MPPT5",
    Voltage: "753 V",
    Current: "6.6 A",
  },
  {
    DC: "MPPT6",
    Voltage: "755.8 V",
    Current: "3.3 A",
  },
  {
    DC: "MPPT7",
    Voltage: "755.6 V",
    Current: "3.1 A",
  },
  {
    DC: "MPPT8",
    Voltage: "753.9 V",
    Current: "3.1 A",
  },
  {
    DC: "MPPT9",
    Voltage: "751.1 V",
    Current: "3 A",
  },
];

const dcOutPut = [
  {
    AC: "Phase A",
    Voltage: "240.8 V",
    Current: "132.8 A",
  },
  {
    AC: "Phase B",
    Voltage: "240.6 V",
    Current: "132.8 A",
  },
  {
    AC: "Phase C",
    Voltage: "240.7 V",
    Current: "132.7 A",
  },
];
