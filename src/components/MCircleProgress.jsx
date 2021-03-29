import { Box, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { LIST_COLOR_ACCENT } from "../common/colors";

const initState = {
  max: 100,
  value: 0,
  process: 0,
  radius: 0,
  circumference: 0,
  progressOffset: 0,
  color: LIST_COLOR_ACCENT[5],
};

export default function MCircleProgress(props) {
  const strokeWidth = 20;
  const padding = 5;
  const [state, setState] = useState(initState);

  useEffect(() => {
    var percent = props.value / props.max;
    var positionColor = Math.round(5 * percent);
    var percentProcess = Math.round(percent * 100 * 100) / 100;
    setState((pre) => ({
      ...pre,
      max: props.max,
      value: props.value,
      process: percentProcess,
      color: LIST_COLOR_ACCENT[positionColor],
    }));
    // startTimeout()
  }, [props.value, props.max]);

  useLayoutEffect(() => {
    var w = document.getElementById("svg").clientWidth;
    var h = document.getElementById("svg").clientHeight;
    var min = Math.min(w, h);
    var r = min / 2 - strokeWidth / 2 - padding;
    var circumference = 2 * Math.PI * r;
    var progressOffset = ((100 - state.process) / 100) * circumference;
    setState((pre) => ({
      ...pre,
      radius: r,
      circumference: circumference,
      progressOffset: progressOffset,
    }));
  }, [padding, state.process, state.progressOffset]);

  return (
    <div
      style={{
        border: `1px solid ${grey[300]}`,
        padding: "10px",
        borderRadius: "3px",
        boxShadow: "1 1 1 black",
      }}
    >
      <Box display="flex">
        <Box m="auto">
          <Typography variant="body1">{props.item.name}</Typography>
        </Box>
      </Box>

      <svg id="svg" className="svg" style={{ width: "100%" }}>
        <circle
          style={{ fill: "none" }}
          cx="50%"
          cy="50%"
          r={state.radius}
          stroke={grey[800]}
          strokeWidth={strokeWidth}
          strokeDasharray={state.circumference}
        />
        <circle
          style={{
            fill: "none",
            transition: "all 0.5s",
            strokeLinecap: "round",
            strokeDasharray: state.circumference,
            strokeDashoffset: state.progressOffset,
            stroke: state.color,
          }}
          cx="50%"
          cy="50%"
          r={state.radius}
          strokeWidth={strokeWidth / (3 / 2)}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill={grey[800]}
          strokeWidth="2px"
          dy=".3em"
        >
          {state.process}%
        </text>
      </svg>
    </div>
  );
}
