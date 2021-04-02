import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DeviceService from "../../../service/device.service";
import { CookieManger } from "../../../utils/CookieManager";

export default function PowerMeterDetail() {
  let location = useLocation();
  const [state, setState] = useState({
    deviceId: "",
    pw:{}
  });

  useEffect(() => {
    let { deviceId } = location;
    if (deviceId === undefined) {
      deviceId = CookieManger.getCurrentDevicePowerMeter();
    } else {
      CookieManger.revokeCurrentDevicePowerMeter();
      CookieManger.setCurrentDevicePowerMeter(deviceId);
    }
    setState((pre) => ({
      ...pre,
      deviceId: deviceId,
    }));
    return () => {};
  }, [location]);

  useEffect(() => {
    const onFetchData = () => {
      var pws = DeviceService.fetchAllPowerMeterDetail(state.deviceId);
      console.log(pws)
      setState(pre=>({
        ...pre,
        pws:pws
      }))
    };
    onFetchData();
  }, [state.deviceId]);

  return (
    <div style={{ height: "100vh", color: "red", width: "100%" }}>
      {JSON.stringify(location)}
    </div>
  );
}
