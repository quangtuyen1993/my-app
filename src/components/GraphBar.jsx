import { fade } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { LIST_COLOR } from "../common/colors";

export const MONTH_IN_YEAR = "month";
export const DAY_IN_MONTH = "day";

const dataSetPattern = {
  fill: true,
  borderWidth: 2,
};

export default function GraphBar({ data, typeView, minDate, maxDate }) {
  const initialState = {
    yAxisLabel: [],
    dataSet: [],
    typeView: DAY_IN_MONTH,
  };

  const [state, setState] = useState(initialState);
  const convertDataToDataGraph = (data) => {
    let label = [];
    let dataSet = [];
    data.forEach((item, index) => {
      var value = [];
      if (item.data === undefined) return;
      item.data.forEach((da) => {
        if (index === 0) {
          var date = moment.utc(da.date, "YYYY-MM").format("l LT").valueOf();
          label.push(date);
        }
        value.push(da.value);
      });

      dataSet.push({
        ...dataSetPattern,
        lineTension: 0.5,
        borderColor: LIST_COLOR[index],
        backgroundColor: fade(LIST_COLOR[index], 0.1),
        label: item.name,
        data: value,
      });
    });
    return {
      label: label,
      dataSet: dataSet,
    };
  };
  useEffect(() => {
    var { label, dataSet } = convertDataToDataGraph(data);

    setState((pre) => {
      return {
        ...pre,
        yAxisLabel: label,
        dataSet: dataSet,
      };
    });
  }, [data]);

  return (
    <div
      style={{
        minHeight: "30vh",
        position: "relative",
        margin: "auto",
        width: "90vw",
      }}
    >
      <Bar
        data={{
          labels: ["2021-02","2021-03","2021-04",],
          datasets: state.dataSet,
        }}
        options={{
          tooltips: {
            enabled: true,
            mode: "index",
            intersect: false,
          },
          elements: {
            point: {
              radius: 0,
            },
          },
          hover: {
            animationDuration: 0,
          },
          responsiveAnimationDuration: 0,
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: true,
            position: "top",
          },
          offset: true,
          scales: {
            xAxes: [
              {
                offset: true,
                type: "time",
                time: {
                  adapters: moment,
                  displayFormats: {
                    month: "MMM",
                    // year: "YYYY",
                    // day: "MMM DD",
                  },
                  unit: "month",
                  // round:"month"
                },
                scaleLabel: {
                  display: true,
                  labelString: "Date",
                },
                gridLines: {
                  display: true,
                },
                distribution: "linear",
                bounds: "tick",
                ticks: {
                  source: "auto",
                  scaleOverride: true,
                  stepSize: 1,
                  // autoSkip: true,
                  // min: moment
                  //   .utc(minDate, "YYYY-MM-DD HH:mm:ss")
                  //   .format("l LT")
                  //   .valueOf(),
                  // max: moment
                  //   .utc(maxDate, "YYYY-MM-DD HH:mm:ss")
                  //   .format("l LT")
                  //   .valueOf(),
                  // min: moment
                  //   .utc("2021-02-01 00:00:00", "YYYY-MM-DD HH:mm:ss")
                  //   .format("l LT")
                  //   .valueOf(),
                  // max: moment
                  //   .utc("2021-10-10 23:59:00", "YYYY-MM-DD HH:mm:ss")
                  //   .format("l LT")
                  //   .valueOf(),
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
