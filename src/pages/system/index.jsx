import { Container, CssBaseline, Grid, Typography } from "@material-ui/core";
import CardLayout from "../../common/layouts/CardLayout";
import { useCallback, useEffect, useState } from "react";
import TableApp from "../../components/TableApp";
import IconApp from "../../common/icons";
import { useSelector } from "react-redux";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import StationService from "../../service/station.service";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    // 10.715632448971512, 106.93676260189989
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
))


export default function SystemInfoScreen() {

  const { stationSelected } = useSelector((state) => state.stationReducer);

  const [state, setState] = useState({
    LAT: 10.715632448971512,
    LNG: 106.93676260189989,
    Station: null,
  });

  useEffect(() => {

    const onFetchData = async () => {
      var station = await StationService.getStationById(
        stationSelected.id
      );

      if (station != null) {
        
        // station.data.geoLocation chứa tọa độ google map format theo dạng LAT,LNG
        // Vd: 10.715632448971512,106.93676260189989 => LAT = 10.715632448971512 & LNG = 106.93676260189989
        console.log("info_station", station.data.geoLocation);
      }

      setState((pre) => ({
        ...pre,
        LAT: 10.715632448971512
      }));
      setState((pre) => ({
        ...pre,
        LNG: 106.93676260189989
      }));
    };

    onFetchData();

    return () => {
    };
  }, [stationSelected]);



  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
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

          {/* Chỗ này để đia chỉ của trạm và thông tin liên hệ */}
          <Grid item xs={12} lg={12} md={12}>
            <CardLayout title="Contact" icon={IconApp.INFO}>
              
            </CardLayout>
          </Grid>


          <Grid item xs={12} lg={12} md={12}>
            <MyMapComponent
              isMarkerShown
              zoom={16}
              lat={state.LAT}
              lng={state.LNG}
              googleMapsApiKey="AIzaSyBZGTmCYONTRG6a304G1NtC8slduyCUcXk"
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBZGTmCYONTRG6a304G1NtC8slduyCUcXk"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
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
