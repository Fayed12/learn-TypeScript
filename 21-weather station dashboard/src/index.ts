// ======================================================================================================

// Project 21 ===> Weather Station Dashboard

// ======================================================================================================


type StationId = string & { readonly _brand: "StationId" }
type Celsius = number & { readonly _brand: "Celsius" }

enum SensorKind {
    Temperature = "Temperature",
    Humidity = "Humidity",
    Pressure = "Pressure",
    WindSpeed = "WindSpeed"
}

enum SensorStatus {
    Online = "Online",
    Offline = "Offline",
    Degraded = "Degraded",
    Calibrating = "Calibrating"
}

interface Reading {
    readonly stationId: StationId,
    readonly timestamp: number,
    readonly status: SensorStatus,
    readonly label: [string, string]
}

interface TempReading extends Reading {
    kind: SensorKind.Temperature,
    celsius: [label: string, value: Celsius]
}

interface HumidReading extends Reading {
    kind: SensorKind.Humidity,
    percent: [label: string, value: number]
}

interface PressReading extends Reading {
    kind: SensorKind.Pressure,
    hPa: [label: string, value: number]
}

interface WindReading extends Reading {
    kind: SensorKind.WindSpeed,
    direction: string,
    kph: [label: string, value: number]
}

type AnyReading = TempReading | HumidReading | PressReading | WindReading

interface StationModule {
    readonly id: StationId
    readonly name: string
    readonly status: SensorStatus
    sensors: SensorKind[]
}

interface StationModule {
    calibrate(): void
}

function assertNever(x: never): never {
    throw new Error(`Unhandled case: ${x}`);
}

// ── Functions
function makeStationId(id: string): StationId {
    if (id.trim().length !== 0) {
        return id as StationId
    } else {
        throw new Error("something went wrong!");
    }
}

function makeCelsius(c: number): Celsius {
    if (c >= -60 && c <= 60) {
        return c as Celsius
    } else {
        throw new Error("something went wrong!");
    }
}

function formatReading(reading: AnyReading): string {
    switch (reading.kind) {
        case SensorKind.Temperature:
            return `🌡 ${reading.stationId} | Temperature: ${reading.celsius[1]}°C | ${reading.status}`

        case SensorKind.Humidity:
            return `💦 ${reading.stationId} | Humidity: ${reading.percent[1]} % | ${reading.status}`

        case SensorKind.Pressure:
            return `🌡️ ${reading.stationId} | Pressure: ${reading.hPa[1]} hPa | ${reading.status} `

        case SensorKind.WindSpeed:
            return `💨 ${reading.stationId} | Wind: ${reading.kph[1]} kph ${reading.direction}  | ${reading.status}`

        default:
            const _: never = reading
            assertNever(_)
    }
}

function updateStationStatus(station: StationModule, newStatus: SensorStatus): StationModule {

    const newStation: StationModule = { ...station, status: newStatus }

    return newStation
}

// test output

// makeStationId & makeCelsius factories
const sid = makeStationId("WS-001");
const temp = makeCelsius(21.4);
// ✓ StationId: "WS-001"  Celsius: 21.4

const tempReading: TempReading = {
    stationId: sid,
    timestamp: Date.now(),
    status: SensorStatus.Online,
    label: ["sensor", "temperature"],
    kind: SensorKind.Temperature,
    celsius: ["engine temp", temp],
};

const windReading: WindReading = {
    stationId: sid,
    timestamp: Date.now(),
    status: SensorStatus.Online,
    label: ["sensor", "wind"],
    kind: SensorKind.WindSpeed,
    direction: "North-East",
    kph: ["wind speed", 40],
};

const station: StationModule = {
    id: sid,
    name: "main",
    status: SensorStatus.Online,
    sensors: [SensorKind.Temperature],
    calibrate() { },
};

console.log(formatReading(tempReading))
// → "🌡 WS-001 | Temperature: 21.4 °C | Online"

console.log(formatReading(windReading));
// → "💨 WS-001 | Wind: 34 kph NW | Online"

// branded bypass bug (caught!)
// const bad = -999 as Celsius;  // skips validation
// makeCelsius(-999) → throws RangeError

console.log(updateStationStatus(station, SensorStatus.Calibrating))
// → { ...station, status: "Calibrating" } 