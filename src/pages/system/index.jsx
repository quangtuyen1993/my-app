import { Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardLayout from "../../common/layouts/CardLayout";
import MTableMaterial from "../../components/MTableMaterial";
import StringUtils from "../../utils/StringConvert";

export default function SystemInfoScreen() {
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const [state, setState] = useState({
    data: [],
  });

  useEffect(() => {
    if (stationSelected === undefined) return;
    var data = getArrayFromField(
      [
        "ratedDccapacity",
        "ratedAccapacitor",
        "moduleWatt",
        "totalModules",
        "totalInverters",
      ],
      stationSelected
    );
    setState((pre) => ({
      data: data,
    }));
  }, [stationSelected]);

  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Grid container>
          <Grid item xs={12} lg={12} md={12}>
            <CardLayout title="Plant Parameters">
              <MTableMaterial
                showIndex
                isHover
                dataSource={state.data}
                fieldArray={["name", "value"]}
              />
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
    var name = StringUtils.convertCamelToTextNormal(f);
    result.push({
      name: name,
      value: obj[f],
    });
  }
  return result;
};
