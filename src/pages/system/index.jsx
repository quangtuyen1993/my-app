import { Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import MTableInfo from "../../components/MTableInfo";
import MTableMaterial from "../../components/MTableMaterial";
import StationService from "../../service/station.service";
import StringUtils from "../../utils/StringConvert";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
      center={{ lat: props.lat, lng: props.lng }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      )}
    </GoogleMap>
  ))
);

export default function SystemInfoScreen() {
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const [state, setState] = useState({
    LAT: 10.715632448971512,
    LNG: 106.93676260189989,
    Station: null,
    data: [],
    headers: [],
    bodyRows: [],
    bodyFooter: [],
    bodyLabel: [],
    stationInfo: {
      address: "",
      contact: "",
      lat: 0.0,
      lng: 0.0,
    },
  });


  useEffect(() => {
    if (stationSelected.id === undefined) return;
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
      ...pre,
      data: data,
    }));
  }, [stationSelected]);

  useEffect(() => {
    const fetchStationInfo = async () => {
      if (stationSelected.id === undefined) return;
      var data = await StationService.getStationInfo(stationSelected.id);
      var pvInfoModel = data.pvInfoModel;
      var bodyFooter = [];
      bodyFooter.push(pvInfoModel.stC_Description);
      bodyFooter.push(pvInfoModel.noC_Description);
      setState((pre) => ({
        ...pre,
        stationInfo: data,
        headers: pvInfoModel.columns,
        bodyRows: pvInfoModel.rows,
        bodyFooter: bodyFooter,
        bodyLabel: ["ModelNumber", pvInfoModel.model_Number],
      }));
    };
    fetchStationInfo();
  }, [stationSelected.id]);
  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12} md={12}>
            <CardLayout title="Plant Parameters">
              <MTableMaterial
                isHover
                dataSource={state.data}
                fieldArray={["parameter", "value"]}
              />
            </CardLayout>
          </Grid>

          <Grid item xs={12} lg={12} md={12}>
            <CardLayout title="PV Information">
              <MTableInfo
                bodyRows={state.bodyRows}
                bodyFooter={state.bodyFooter}
                bodyLabel={state.bodyLabel}
              />
            </CardLayout>
          </Grid>
          {/* Chỗ này để đia chỉ của trạm và thông tin liên hệ */}
          <Grid item xs={12} lg={12} md={12}>
            <CardLayout title="Contact" icon={IconApp.INFO}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <MyMapComponent
                    isMarkerShown
                    zoom={16}
                    lat={parseFloat(state.stationInfo.lat)}
                    lng={parseFloat(state.stationInfo.lng)}
                    googleMapsApiKey="AIzaSyBZGTmCYONTRG6a304G1NtC8slduyCUcXk"
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBZGTmCYONTRG6a304G1NtC8slduyCUcXk"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </Grid>
                <Grid item>
                  <p>Address: {state.stationInfo.address}</p>{" "}
                  <p>
                    Contact:{" "}
                    {state.stationInfo.contact
                      ? state.stationInfo.contact
                      : "Updating..."}
                  </p>{" "}
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
    var name = StringUtils.convertCamelToTextNormal(f);
    result.push({
      parameter: name,
      value: obj[f],
    });
  }
  return result;
};
