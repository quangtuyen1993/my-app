import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import FileSaver from "file-saver";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardLayout from "../../common/layouts/CardLayout";
import MDateTimePicker from "../../components/MDateTimePicker";
import MTableMaterial from "../../components/MTableMaterial";
import PRService from "../../service/pr.service";
import StringUtils from "../../utils/StringConvert";

export default function PRCalculationScreen() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const [state, setState] = useState({
    date: {
      toTime: "",
      fromTime: "",
    },
    g_hor: 0,
    g_inc: 0,
    t_ref: 0,
    results: [],
    dataTable: [],
  });

  const handleInputChange = (e) => {
    console.log(e.target);
    setState((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const getPrParam = useCallback(async () => {
    if (stationSelected.id === undefined) return;
    var res = await PRService.getPRParam({
      stationId: stationSelected.id,
    });
    console.log(res);
    setState((pre) => ({
      ...pre,
      g_inc: res.ginc,
      g_hor: res.gHor,
      t_ref: res.tRef,
    }));
  }, [stationSelected.id]);

  useEffect(() => {
    getPrParam();
  }, [getPrParam]);

  const onFetchData = async () => {
    if (stationSelected.id === undefined) return;
    var res = await PRService.getPRofTime({
      stationId: stationSelected.id,
      fromTime: state.date.fromTime,
      toTime: state.date.toTime,
      g_hor: state.g_hor,
      g_inc: state.g_inc,
      t_ref: state.t_ref,
    });

    var fields = Object.keys(res).filter((i) => i !== "datas");
    var result = getArrayFromField(fields, res);
    var dataTable = res.datas;
    setState((pre) => ({
      ...pre,
      results: result,
      dataTable: dataTable,
    }));
    return res;
  };

  const handleChangeDate = ({ name, value }) => {
    setState((pre) => ({
      ...pre,
      date: {
        fromTime: value.dateFrom,
        toTime: value.dateTo,
      },
    }));
  };

  const onExport = () => {
    var name = "PR Calculate";
    const csv = StringUtils.convertDataToCsv(state.dataTable);
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(csvData, `${name}.csv`);
  };

  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Grid container>
          <Grid item xs={12} lg={12} md={12}>
            <CardLayout title="PR Calculation">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <MDateTimePicker
                    name="date"
                    typeFormat="dd-MM-yyyy HH:mm:ss"
                    onRangeDateChange={handleChangeDate}
                    isSingleDate={false}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    type="number"
                    name="t_ref"
                    onChange={handleInputChange}
                    value={state.t_ref}
                    label="Tref"
                    fullWidth
                    variant="outlined"
                    placeholder="ref"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    name="g_hor"
                    type="number"
                    value={state.g_hor}
                    onChange={handleInputChange}
                    label="G_hor_sim"
                    fullWidth
                    variant="outlined"
                    placeholder="G_hor_sim"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    name="g_inc"
                    type="number"
                    value={state.g_inc}
                    onChange={handleInputChange}
                    label="G_inc_sim"
                    fullWidth
                    variant="outlined"
                    placeholder="G_inc_sim"
                  />
                </Grid>

                {/* button group */}
                <Grid item xs={12} lg={4} md={4}>
                  <Grid
                    direction="row"
                    container
                    spacing={2}
                    justify="center"
                    alignContent="stretch"
                    alignItems="stretch"
                  >
                    <Grid item xs={6} sm={6} lg={6} md={6}>
                      <Button
                        color="primary"
                        fullWidth
                        onClick={onFetchData}
                        variant="contained"
                      >
                        Calculate
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6} md={6}>
                      <Button
                        color="primary"
                        onClick={onExport}
                        fullWidth
                        variant="contained"
                      >
                        Export
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* infor */}
                <Grid item xs={12} sm={12} lg={8} md={8} style={{}}>
                  <MTableMaterial
                    showSearch
                    rowsPerPage={12}
                    isHover
                    dataSource={state.dataTable}
                    fieldArray={[
                      "dateTime",
                      "temp",
                      "radiation",
                      "power",
                      "totalEnergy",
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Card
                    style={{
                      marginTop: sm ? 0 : theme.spacing(9),
                    }}
                  >
                    <CardHeader
                      component={() => {
                        return (
                          <Typography
                            variant="h6"
                            style={{
                              background: theme.palette.primary.main,
                              paddingTop: theme.spacing(2),
                              paddingBottom: theme.spacing(2),
                              paddingLeft: theme.spacing(2),
                              paddingRight: theme.spacing(2),
                            }}
                          >
                            Result
                          </Typography>
                        );
                      }}
                    ></CardHeader>

                    <CardContent>
                      <Grid container direction="column" spacing={2}>
                        {state.results &&
                          state.results.map((item, i) => (
                            <Grid
                              item
                              sm={12}
                              style={{
                                backgroundColor:
                                  i % 2 === 0 ? grey[200] : "white",
                              }}
                              key={i}
                            >
                              <Typography
                                style={{
                                  fontWeight: "normal",
                                }}
                                variant="body2"
                              >
                                {item.name}: {item.value}
                              </Typography>
                            </Grid>
                          ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardLayout>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const getArrayFromField = (fields, obj) => {
  var result = [];
  for (let index = 0; index < fields.length; index++) {
    const f = fields[index];
    var name = "";
    switch (f) {
      case "ginc": {
        name = "G inc,sim";
        break;
      }
      case "t_coe": {
        name = "δ Temperature Coefficient (%/°C)";
        break;
      }
      case "ghor": {
        name = "G hor,sim";
        break;
      }
      case "pR_Correct":
      case "pr":
      case "tcf": {
        name = f.toUpperCase().replaceAll("_", " ");
        break;
      }
      case "energyGeneration": {
        name = "Energy Generation";
        break;
      }
      case "energyCalculated": {
        name = "Energy Calculated";
        break;
      }
      default: {
        name = StringUtils.titleCase(f.replaceAll("_", " "));
      }
    }

    result.push({
      name: name,
      value: obj[f],
    });
  }
  return result;
};
