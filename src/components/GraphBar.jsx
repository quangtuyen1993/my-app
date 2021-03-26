import { fade } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { LIST_COLOR } from "../common/colors";

export const MONTH_IN_YEAR = "month";
export const DAY_IN_MONTH = "day";


const dataSetPattern = {
  lineTension: 0.5,
  fill: true,
  borderWidth: 2,
};

export default function GraphBar(props) {
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
      item.data.forEach((da) => {
        if (index === 0) {
          var date = moment(da.date).valueOf();
          label.push(date);
        }
        value.push(da.value);
      });

      dataSet.push({
        ...dataSetPattern,
        label: item.name,
        borderColor: LIST_COLOR[index],
        backgroundColor: fade(LIST_COLOR[index], 0.1),
        data: value,
      });
    });
    return {
      label: label,
      dataSet: dataSet,
    };
  };
  useEffect(() => {
    var { label, dataSet } = convertDataToDataGraph(props.data);

    setState((pre) => {
      return {
        ...pre,
        yAxisLabel: label,
        dataSet: dataSet,
      };
    });
  }, [props.data]);

  return (
    <div
      style={{
        minHeight: "30vh",
        position: "relative",
        margin: "auto",
        width: "75vw",
      }}
    >
      <Bar
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
                  unit: state.typeView,
                  round: state.typeView,
                  displayFormats: {
                    month: "MMM",
                    year: "YYYY",
                    day: "MMM DD",
                  },
                },
                gridLines: {
                  display: true,
                },
                distribution: "linear",
                bounds: "tick",
                ticks: {
                  source: "auto",
									scaleOverride: true,
                  min: moment.utc("2021-03-01T00:00:00+0700").valueOf(),
                  max: moment.utc("2021-04-30T23:59:00+0700").valueOf(),
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
