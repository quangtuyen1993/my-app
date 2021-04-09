const StringUtils = {
  convertCamelToTextNormal: (text) => {
    var result = text.replace(/([A-Z])/g, " $1");
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  },
  capitalize: (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  },
  convertArrayToCSV: (objArray) => {
    // var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var array = objArray;
    console.info(array);
    var str = "";

    var header = "#, Date,";

    for (let i = 0; i < array.length; i++) {
      header += array[i].name + ",";
    }

    var childArray = array[0];

    var { data } = childArray;

    for (let i = 0; i < data.length; i++) {
      // if (line !== "") line += ",";
      var line = "";
      line += i + 1 + "," + data[i].date + ",";
      for (var n = 0; n < array.length; n++) {
        line += array[n].data[i].value + ",";
      }
      str += line + "\r\n";
    }

    return header + "\r\n" + str;
  },
  numberFromString: (str) => {
    var regex = /\d/g;
    var numS = str.match(/(\d)/g);
    var result = numS.join("");
    return result
  },
};
export default StringUtils;
