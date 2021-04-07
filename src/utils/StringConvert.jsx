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
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";
    var fields = Object.keys(array[0]);
    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line !== "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return fields.join(",") + "\r\n" + str;
  },
};
export default StringUtils;
