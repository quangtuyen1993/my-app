import IconApp from "../../../common/icons";
import CardLayout from "../../../common/layouts/CardLayout";
import GraphBar from "../../../components/GraphBar";
import MYearMonthPicker from "../../../components/MYearMonthPicker";
export default function EnergyTrend() {
  return (
    <CardLayout icon={IconApp.BOTH} title="Historical Energy Trend">
      <MYearMonthPicker showControl={true} type={"month"} />
      <GraphBar data={[listData_1]} />
    </CardLayout>
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
      date: "2021-03-25T08:47:21+0700",
      value: 1590.62827417463,
    },
    {
      date: "2021-03-25T08:47:21+0700",
      value: 1366.8652333397,
    },
    {
      date: "2021-03-25T09:47:21+0700",
      value: 1599.5579591784,
    },
    {
      date: "2021-03-25T10:47:21+0700",
      value: 1261.06248709331,
    },
    {
      date: "2021-03-25T11:47:21+0700",
      value: 1100.55752541558,
    },
    {
      date: "2021-03-25T12:47:21+0700",
      value: 1408.34691682212,
    },
    {
      date: "2021-03-25T13:47:21+0700",
      value: 1358.54880124382,
    },
    {
      date: "2021-03-25T14:47:21+0700",
      value: 1589.24026375938,
    },
    {
      date: "2021-03-25T015:47:21+0700",
      value: 1078.95355730707,
    },
    {
      date: "2021-03-25T16:47:21+0700",
      value: 1937.29400870586,
    },
    {
      date: "2021-03-25T17:47:21+0700",
      value: 1619.25576594587,
    },
    {
      date: "2021-03-25T18:47:21+0700",
      value: 1786.66417814591,
    },
    {
      date: "2021-03-25T19:47:21+0700",
      value: 1784.25154110894,
    },
    {
      date: "2021-03-25T20:47:21+0700",
      value: 1791.64107647077,
    },
  ],
}