import {
  blue,
  cyan,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@material-ui/core/colors";

const ColorsApp = {
  secondary: "#ffffff",
  primary: "#343a40",
  primaryText: "#000000",
  secondaryText: "#666666",
  POWER_GRADIENT: "linear-gradient(180deg, #e15361 40%,#dc3545 60%)",
  RUNNING_GRADIENT: "linear-gradient(180deg,#3ab0c3 40%,#17a2b8 60%)",
  ENERGY_GRADIENT: "linear-gradient(180deg,#48b461 40%,#28a745 60%)",
  POWER: red[700],
  POWER_LIGHT: red[500],
  ENERGY: green[500],
  RUNNING: blue[500],
};

const power = "#d50000";
const radiation = "#48b461";
const cell = "#ff9800";
const pr = indigo[600];
const en="#64dd17"
export const getColorTrend = (str) => {
  var name = str.toString().toLowerCase();
  if (name.includes("power")) {
    return power;
  } else if (name.includes("radiation")) {
    return radiation;
  } else if (name.includes("temp")) {
    return cell;
  } else if (name.includes("energy")) {
    return en;
  } else {
    return pr;
  }
};

export const getColorCell = (str) => {
  if (str.length > 2) return "white";
  var name = str.charAt(0).toUpperCase();

  switch (name) {
    case "A": {
      return "#ff8a80";
    }
    case "B": {
      return "#ffee58";
    }
    case "C": {
      return "#81d4fa";
    }
    default: {
      return "white";
    }
  }
};

export const LIST_COLOR = [
  green[900],
  red[900],
  purple[900],
  pink[900],
  orange[900],
  lime[900],
  indigo[900],
  lightBlue[900],
  pink[900],
  deepPurple[900],
  blue[900],
  cyan[900],
  teal[900],
  lightGreen[900],
  yellow[600],
  orange[600],
  green[600],
  red[600],
  purple[600],
  pink[600],
  orange[600],
  lime[600],
  indigo[600],
  lightBlue[600],
  pink[600],
  deepPurple[600],
  blue[600],
  cyan[600],
  teal[600],
  lightGreen[600],
  yellow[600],
  orange[600],
];

export const LIST_COLOR_ACCENT = [
  blue[200],
  blue[300],
  lime[400],
  lime[600],
  orange[400],
  orange[900],
  purple[400],
  pink[400],
  indigo[400],
  lightBlue[400],
  pink[400],
  deepPurple[400],
  cyan[400],
  teal[400],
  lightGreen[400],
  yellow[400],
  orange[400],
];
export default ColorsApp;
