import { Container, Grid } from "@material-ui/core";
import CardLayout from "../../common/layouts/CardLayout";
import TableApp from "../../components/TableApp";

export default function SystemInfoScreen() {
  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Grid container>
          <Grid item xs={12} lg={12} md={12}>
            <CardLayout title="Plant Parameters">
              <TableApp 
                data={data} 
                field={["Name","Value"]}
                index={false}
                />
            </CardLayout>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
const data = [
  {
    Name: "Rated DC Capacity (kWp)",
    Value: 997,
  },
  {
    Name: "Rated AC Capacity (kW)",
    Value: 880,
  },
  {
    Name: "Module Watt",
    Value: 445,
  },
  {
    Name: "Total Modules",
    Value: 2240,
  },
  {
    Name: "Total Inverters",
    Value: 8,
  },
  {
    Name: "Total energy of inverter per year (kWh)",
    Value: 187500,
  },
];
