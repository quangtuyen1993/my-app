import { Container, Grid } from "@material-ui/core";
import { useCallback, useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { useSelector } from "react-redux";
import CardLayout from "../../common/layouts/CardLayout";
import MonitorService from "../../service/monitor.service";

export default function InverterStringScreen() {
  const [state, setState] = useState({
    data: {},
  });

  const timer = useRef(null);

  const { stationSelected } = useSelector((state) => state.stationReducer);
  const fetchMonitorString = useCallback(async () => {
    if (stationSelected.id === undefined) return;
    var data = await MonitorService.fetchData(stationSelected.id);
    setState((pre) => ({
      ...pre,
      data: data,
    }));
  }, [stationSelected]);
  useEffect(() => {
    if (timer.current !== null) {
      clearInterval(timer.current);
    }
    fetchMonitorString();

    timer.current = setInterval(() => {
      fetchMonitorString();
    }, 10000);

    return () => {
      clearInterval(timer.current);
    };
  }, [fetchMonitorString]);

  const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const containerRef = useCallback((containerElem) => {
      if (containerElem !== null) {
        const { width, height } = containerElem.getBoundingClientRect();
        setTranslate({ x: width / 2, y: 12 });
      }
    }, []);
    return [translate, containerRef];
  };

  const [translate, containerRef] = useCenteredTree();
  // Here we're using `renderCustomNodeElement` to represent each node
  // as an SVG `rect` instead of the default `circle`.
  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <rect
        fill={nodeDatum.background}
        width="150"
        height="30"
        x="-75"
        y="0"
        onClick={toggleNode}
      >
        <title>{nodeDatum.description}</title>
      </rect>

      <text fill="White" strokeWidth="0" x="-0" y="20" textAnchor="middle">
        <title>{nodeDatum.description}</title>
        {nodeDatum.value}
      </text>
    </g>
  );

  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12} md={12}>
            <CardLayout title="Inverter Strings">
              <div
                id="treeWrapper"
                ref={containerRef}
                style={{ width: "100%", height: "100%", minHeight: "700px" }}
              >
                <Tree
                  data={state.data}
                  zoomable={true}
                  collapsible={false}
                  translate={translate}
                  orientation={"vertical"}
                  depthFactor={"50"}
                  pathFunc={"step"}
                  zoom={0.65}
                  renderCustomNodeElement={renderRectSvgNode}
                />
              </div>
            </CardLayout>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
