import { Container, Box, Grid } from "@material-ui/core";
import { useState } from "react";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import GraphLineApp from "../../components/GraphLineApp";
import GraphBar from "../../components/GraphBar";
import AppDatePicker  from "../../components/MDatePicker";
import MYearMonthPicker, {
  YEAR,
} from "../../components/MYearMonthPicker";
export default function TreendScreen() {
  const [state, setState] = useState({
    data: [],
    dateFrom: null,
    dateTo: null,
  });

  const handleChangeDate = (from, to) => {
    console.log(from, to);
    setState((pre) => {
      return {
        ...pre,
        dateFrom: from,
        dateTo: to,
      };
    });
  };

  return (
    <>
      <Container disableGutters direction="row" maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardLayout icon={IconApp.POWER_TREND} title="Power Trend">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AppDatePicker
                    typeFormat="MM/dd/yyyy HH:mm:ss"
                    isSignleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
              </Grid>

              <GraphLineApp type="HourInDate" data={[listData_1]} />
            </CardLayout>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardLayout icon={IconApp.POWER_TREND} title="Radiation">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AppDatePicker
                    typeFormat="MM/dd/yyyy HH:mm:ss"
                    isSignleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
              </Grid>

              <GraphLineApp type="HourInDate" data={[listData_1]} />
            </CardLayout>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardLayout icon={IconApp.POWER_TREND} title="Cell Temperature ">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AppDatePicker
                    typeFormat="MM/dd/yyyy HH:mm:ss"
                    isSignleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
              </Grid>

              <GraphLineApp  data={[listData_1]} />
            </CardLayout>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardLayout icon={IconApp.POWER_TREND} title="Cell Temperature ">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <MYearMonthPicker
                    type={YEAR}
                    typeFormat="MM/dd/yyyy HH:mm:ss"
                    isSignleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
              </Grid>

              <GraphBar data={[listData_1]} />
            </CardLayout>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
const listData_1 = {
  name: "m2",
  data: [
    {
      date: "2021-03-25T07:47:21+0700",
      value: 1590,
    },
    {
      date: "2021-03-26T08:47:21+0700",
      value: 1590.62827417463,
    },
    {
      date: "2021-03-27T08:47:21+0700",
      value: 1366.8652333397,
    },
    {
      date: "2021-03-28T09:47:21+0700",
      value: 1599.5579591784,
    },
    {
      date: "2021-03-29T10:47:21+0700",
      value: 1261.06248709331,
    },
    {
      date: "2021-03-30T11:47:21+0700",
      value: 1100.55752541558,
    },
    {
      date: "2021-04-01T12:47:21+0700",
      value: 1408.34691682212,
    },
  ],
};
const listData_2 = {
  name: "m2",
  data: [
    {
      date: "2021-04-25T07:47:21+0700",
      value: 1590,
    },
    {
      date: "2021-05-26T08:47:21+0700",
      value: 1590.62827417463,
    },
    {
      date: "2021-06-27T08:47:21+0700",
      value: 1366.8652333397,
    },
    {
      date: "2021-07-28T09:47:21+0700",
      value: 1599.5579591784,
    },
    {
      date: "2021-08-29T10:47:21+0700",
      value: 1261.06248709331,
    },
    {
      date: "2021-09-30T11:47:21+0700",
      value: 1100.55752541558,
    },
    {
      date: "2021-10-01T12:47:21+0700",
      value: 1408.34691682212,
    },
  ],
};
