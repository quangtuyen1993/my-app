import {
  pink,
  purple,
  teal,
  amber,
  deepOrange,
} from "@material-ui/core/colors";

export const appointments = [
  {
    id: 0,
    deviceId: 1,
    startDate: new Date(2017, 4, 17, 9, 10),
    endDate: new Date(2017, 4, 17,11, 11),
  },
  {
    id: 10,
    deviceId: 1,
    startDate: new Date(2017, 4, 17, 9, 10),
    endDate: new Date(2017, 4, 17,11, 11),
  },
  {
    id: 1,
    deviceId: 2,
    startDate: new Date(2017, 4, 25, 9, 10),
    endDate: new Date(2017, 4, 26,14, 11),
  },
  {
    id: 2,
    deviceId: 3,
    startDate: new Date(2017, 4, 24, 12, 10),
    endDate: new Date(2017, 4, 24, 13, 10),
  },
  {
    id: 3,
    deviceId: 4,
    startDate: new Date(2017, 4, 23, 9, 0),
    endDate: new Date(2017, 4, 23, 10, 15),
  },
  {
    id: 4,
    deviceId: 5,
    startDate: new Date(2017, 4, 26, 10, 0),
    endDate: new Date(2017, 4, 26, 11, 0),
  },
  {
    id: 5,
    deviceId: 3,
    startDate: new Date(2017, 4, 26, 12, 0),
    endDate: new Date(2017, 4, 26, 13, 35),
  },
  {
    id: 6,
    deviceId: 4,
    startDate: new Date(2017, 4, 19, 14, 30),
    endDate: new Date(2017, 4, 20, 15, 45),
  },
  {
    id: 7,
    deviceId: 5,
    startDate: new Date(2017, 4, 30, 14, 30),
    endDate: new Date(2017, 4, 30, 15,15),
  },
  {
    id: 17,
    deviceId: 3,
    startDate: new Date(2017, 4, 26, 12, 0),
    endDate: new Date(2017, 4, 26, 13, 35),
  },
  {
    id: 8,
    deviceId: 4,
    startDate: new Date(2017, 4, 19, 14, 30),
    endDate: new Date(2017, 4, 20, 15, 45),
  },
  {
    id: 9,
    deviceId: 5,
    startDate: new Date(2017, 4, 30, 14, 30),
    endDate: new Date(2017, 4, 30, 15,15),
  },
];

export const resourcesData = [
  {
    text: "Marvel 101",
    id: 1,
    color: amber,
  },
  {
    text: "DC 102",
    id: 2,
    color: pink,
  },
  {
    text: "P&G 103",
    id: 3,
    color: purple,
  },
  {
    text: "MCCM device",
    id: 4,
    color: deepOrange,
  },
  {
    text: "Super device",
    id: 5,
    color: teal,
  },
];
 function dataShow() {
  console.log("data show");
  var newList = appointments.map((item) => {
    var position = resourcesData.map((rs) => rs.id).indexOf(item.deviceId);
    var title = resourcesData[position];
    return {
      ...item,
      title: title,
    };
  });
  console.log("new list", newList);
  return newList;
}
