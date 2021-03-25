import { Container, Box } from "@material-ui/core";
import OverView from "./components/OverView.jsx";
import Weather from "./components/Weather.jsx";
import EnergyTrend from "./components/EnergyTrend.jsx";
import PowerTrend from "./components/PowerTrend.jsx";

var list = [OverView, Weather, PowerTrend, EnergyTrend];

function DashBoard(props) {
  return (
    <Container disableGutters maxWidth={false}>
      {list.map((item, index) => (
        <Box mb={2} key={index}>
          {item.call()}
        </Box>
      ))}
    </Container>
  );
}

export default DashBoard
