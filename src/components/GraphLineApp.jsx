import { fade } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {  getColorTrend } from "../common/colors";

const initialState = {
  yAxisLabel: [],
  dataSet: [],
};

const GraphLineApp = ({ data, typeView, minDate, maxDate }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (data.length === 0) return;
    let label = [];
    let dataSet = [];
    data.forEach((item, index) => {
      var value = [];
      if (item.data === undefined) return;
      item.data.forEach((da, i) => {
        if (index === 0) {
          var date = moment
            .utc(da.date, "YYYY-MM-DD HH:mm:ss")
            .format("l LT")
            .valueOf();
          label.push(date);
        }
        value.push(da.value);
      });
      var colorLine = getColorTrend(item.name);

      let enabledFill = true;
      if (data.length > 1) {
        enabledFill = false;
      }

      dataSet.push({
        label: item.name,
        lineTension: 0.5,
        fill: enabledFill,
        borderColor: colorLine,
        backgroundColor:   fade(colorLine, 0.4),
        borderWidth: 2,
        data: value,
      });
    });

    setState((pre) => {
      return {
        ...pre,
        yAxisLabel: label,
        dataSet: dataSet,
      };
    });
  }, [data]);

  useEffect(() => {
    setState((pre) => ({
      ...pre,
      typeView,
    }));
  }, [typeView]);

  return (
    <div
      style={{
        minHeight: "30vh",
        position: "relative",
        margin: "auto",
        width: "90vw",
      }}
    >
      <Line
        type="line"
        data={{
          labels: state.yAxisLabel,
          datasets: state.dataSet,
        }}
        options={{
          tooltips: {
            enabled: true,
            mode: "nearest",
            intersect: false,
          },

          elements: {
            point: {
              radius: 0,
            },
          },
          animation: false,
          interaction: {
            intersect: false,
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
                type: "time",
                time: {
                  adapters: moment,
                  tooltipFormat: "DD-MM-YYYY HH:mm",
                  displayFormats: {
                    hour: "HH:mm",
                  },
                  unit: "hour",
                },
                gridLines: {
                  display: true,
                },
                distribution: "linear",
                bounds: "ticks",
                ticks: {
                  display: true,
                  scaleOverride: true,
                  min: moment
                    .utc(minDate, "YYYY-MM-DD HH:mm:ss")
                    .format("l LT")
                    .valueOf(),
                  max: moment
                    .utc(maxDate, "YYYY-MM-DD HH:mm:ss")
                    .format("l LT")
                    .valueOf(),
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                },
                bounds: "ticks",
                ticks: {
                  beginAtZero: false,
                  suggestedMin: 0,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};
export default GraphLineApp;
