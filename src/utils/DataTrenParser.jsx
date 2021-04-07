const DataTrendParser = {
  parserTrend: (columns, rows) => {
    var resCols = columns;
    var cols = [];

    for (var i = 1; i < resCols.length; i++) {
      var name = "";
      if (resCols[i] === "total_active_power") {
        name = "Power Trend";
      } else {
        name = resCols[i];
      }
      cols.push({
        name: name,
        data: [],
      });
    }

    rows.forEach((item) => {
      cols.forEach((table, index) => {
        table.data = [
          ...table.data,
          {
            date: item[0],
            value: item[index + 1],
          },
        ];
      });
    });
    return cols;
  },
};
export default DataTrendParser;
