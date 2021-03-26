import { fade } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { LIST_COLOR } from "../common/colors";

const initialState = {
  yAxisLabel: [],
  dataSet: [],
};

const DatePickerApp = ({ data, typeView }) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    let label = [];
    let dataSet = [];
    data.forEach((item, index) => {
      var value = [];
      item.data.forEach((da, i) => {
        if (index === 0) {
          var date = moment.utc(da.date).valueOf();
          label.push(date);
        }
        value.push(da.value);
      });

      dataSet.push({
        label: item.name,
        lineTension: 0.5,
        fill: true,
        borderColor: LIST_COLOR[index],
        backgroundColor: fade(LIST_COLOR[index], 0.1),
        borderWidth: 2,
        data: value,
      });
    });

    setState((pre) => {
      return {
        yAxisLabel: label,
        dataSet: dataSet,
      };
    });
  }, [data]);

  useEffect(() => {
    setState(pre=>({
      ...pre,
      typeView
    }))
  }, [typeView]);

  return (
    <div
      style={{
        minHeight: "30vh",
        position: "relative",
        margin: "auto",
        width: "75vw",
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
                type: "time",

                time: {
                  adapters: moment,
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
                  stepSize: 1,
                  scaleOverride: true,
                  min: moment.utc("2021-03-24T00:00:00+0700").valueOf(),
                  max: moment.utc("2021-03-25T23:59:00+0700").valueOf(),
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
                  beginAtZero: true,
                  suggestedMax: 1500,
                  max: 3000,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default React.memo(DatePickerApp);
