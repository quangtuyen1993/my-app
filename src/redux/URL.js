//server product
// 171.244.203.200:5003
export const BASE_URL = "http://171.244.203.200:5003/";
export const URL_LOGIN = BASE_URL + "accounts/authenticate";
export const URL_REFRESH_TOKEN = BASE_URL + "accounts/refresh-token";
export const URL_REVOKE_TOKEN = BASE_URL + "accounts/revoke-token";
export const URL_STATIONS = "/Stations/GetAccountStations";
export const URL_GET_STATION = "/Stations/";
export const URL_OVERVIEW = "/Overview";
export const URL_DEVICES = "/Inverters/GetInvertersOfStation";
export const URL_DEVICES_DETAIL = "/Inverters/GetInverterDetail";
export const URL_SENSOR = "/Sensors/GetSensorsOfStation";
export const URL_POWER_METER = "/PowerMeters/GetPowerMetersOfStation";
export const URL_POWER_METER_DETAIL = "/PowerMeters/GetPowerMetersDetail";
export const URL_HISTORICAL = "/Historical/";
export const URL_MCCB = "/MccbAcbs/GetMccbAcbOfStation/";

export const URL_ALARM_REALTIME = "/Alarms/GetRealtimeAlarmOfStation";
export const URL_ALARM_HISTORY = "/Alarms/GetHistoricalAlarmOfStation";

export const URL_ALARM_ACK = "/Alarms/AckAlarm";
export const URL_ALARM_ALL = "/Alarms/AckAll";
export const URL_ALARM_COUNT = "/alarms/countalarm";

export const URL_PR_MONTH = "/PR/GetPrOfMonth";
export const URL_PR_DATE = "/PR/GetPrOfDay";
export const URL_PR_OF_TIME = "/pr/getprbytime";
export const URL_PR_PARAM = "prparameters/GetCurrentPrParameter";

export const URL_CLIENT = "/Accounts";

export const URL_ENERGY = "/Energy/GetEnergy";

export const URL_SCHEDULER_TASK = "/SchedulerTasks/GetSchedulerTaskOfStation";

export const URL_SCHEDULER = "/SchedulerTasks";

export const URL_STATION_INFO = "/stations";

export const URL_STRING_MONITOR = "/StringMonitor/GetInverterStrings";

export const URL_MCCB_ACB_SEND_NOTIFY = "/MccbAcbs/SendCommand/";

export const URL_STATIONS_USERS ="/Stations/GetAvailableStations";

export const URL_STATIONS_USERS_UPDATE ="/Stations/UpdateAccountStations";
