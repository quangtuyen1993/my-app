import { fade } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getColorTrend } from "../common/colors";

export const MONTH_IN_YEAR = "month";
export const DAY_IN_MONTH = "day";

export default function GraphBar({ data }) {
  const initialState = {
    yAxis: [],
    dataSet: [],
    typeView: DAY_IN_MONTH,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (data.length === 0) return;
    let yAxis = [];
    let dataSet = [];
    data.forEach((item, index) => {
      var value = [];
      if (item.data === undefined) return;
      item.data.forEach((da, i) => {
        if (index === 0) {
          yAxis.push(da.date);
        }
        value.push(da.value);
      });
      var colorLine = getColorTrend(item.name);
      dataSet.push({
        label: item.name,
        lineTension: 0.5,
        fill: true,
        borderColor: colorLine,
        backgroundColor: fade(colorLine, 0.8),
        borderWidth: 2,
        data: value,
      });
    });

    setState((pre) => {
      return {
        ...pre,
        yAxis: yAxis,
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
          labels: state.yAxis,
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
                gridLines: {
                  display: true,
                },
               
                distribution: "linear",
                bounds: "tick",
                ticks: {
                  source: "auto",
                  scaleOverride: true,
                  stepSize: 1,
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
