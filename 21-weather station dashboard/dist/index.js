var SensorKind;
(function (SensorKind) {
    SensorKind["Temperature"] = "Temperature";
    SensorKind["Humidity"] = "Humidity";
    SensorKind["Pressure"] = "Pressure";
    SensorKind["WindSpeed"] = "WindSpeed";
})(SensorKind || (SensorKind = {}));
var SensorStatus;
(function (SensorStatus) {
    SensorStatus["Online"] = "Online";
    SensorStatus["Offline"] = "Offline";
    SensorStatus["Degraded"] = "Degraded";
    SensorStatus["Calibrating"] = "Calibrating";
})(SensorStatus || (SensorStatus = {}));
function assertNever(x) {
    throw new Error(`Unhandled case: ${x}`);
}
function makeStationId(id) {
    if (id.trim().length !== 0) {
        return id;
    }
    else {
        throw new Error("something went wrong!");
    }
}
function makeCelsius(c) {
    if (c >= -60 && c <= 60) {
        return c;
    }
    else {
        throw new Error("something went wrong!");
    }
}
function formatReading(reading) {
    switch (reading.kind) {
        case SensorKind.Temperature:
            return `🌡 ${reading.stationId} | Temperature: ${reading.celsius[1]}°C | ${reading.status}`;
        case SensorKind.Humidity:
            return `💦 ${reading.stationId} | Humidity: ${reading.percent[1]} % | ${reading.status}`;
        case SensorKind.Pressure:
            return `🌡️ ${reading.stationId} | Pressure: ${reading.hPa[1]} hPa | ${reading.status} `;
        case SensorKind.WindSpeed:
            return `💨 ${reading.stationId} | Wind: ${reading.kph[1]} kph ${reading.direction}  | ${reading.status}`;
        default:
            const _ = reading;
            assertNever(_);
    }
}
function updateStationStatus(station, newStatus) {
    const newStation = { ...station, status: newStatus };
    return newStation;
}
const sid = makeStationId("WS-001");
const temp = makeCelsius(21.4);
const tempReading = {
    stationId: sid,
    timestamp: Date.now(),
    status: SensorStatus.Online,
    label: ["sensor", "temperature"],
    kind: SensorKind.Temperature,
    celsius: ["engine temp", temp],
};
const windReading = {
    stationId: sid,
    timestamp: Date.now(),
    status: SensorStatus.Online,
    label: ["sensor", "wind"],
    kind: SensorKind.WindSpeed,
    direction: "North-East",
    kph: ["wind speed", 40],
};
const station = {
    id: sid,
    name: "main",
    status: SensorStatus.Online,
    sensors: [SensorKind.Temperature],
    calibrate() { },
};
console.log(formatReading(tempReading));
console.log(formatReading(windReading));
console.log(updateStationStatus(station, SensorStatus.Calibrating));
export {};
//# sourceMappingURL=index.js.map