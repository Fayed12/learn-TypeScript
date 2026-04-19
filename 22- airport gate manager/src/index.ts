// ======================================================================================

// Project 22 ====> Airport Gate Manager

// =====================================================================================


// ── Interfaces (add yours below)
// FlightCode: Branded string — must be 2 letters + 3–4 digits, enforced in...
// GateId: Branded string — e.g. 'B12'; factory validates non-empty.
// FlightState: String enum: Scheduled | Boarding | Departed | Diverted | Ca...
// ScheduledFlight: Interface with state:'Scheduled', readonly flightCode, gate,...

type FlightCode = string & { readonly _branded: "FlightCode" }
type GateId = string & { readonly _branded: "GateId" }

enum FlightState {
    Scheduled = "Scheduled",
    Boarding = "Boarding",
    Departed = "Departed",
    Diverted = "Diverted",
    Cancelled = "Cancelled"
}

interface ScheduledFlight {
    readonly flightCode: FlightCode,
    gate: GateId,
    departureTuple: [label: string, value: number]
    state: FlightState.Scheduled,
}

interface BoardingFlight extends ScheduledFlight {
    state: FlightState.Boarding,
    boardingGroupsTuple: [label: string, groups: string[]]
}

interface DepartedFlight extends BoardingFlight {
    state: FlightState.Departed;
    actualDeparture: number;
}

interface DivertedFlight extends BoardingFlight {
    state: FlightState.Diverted;
    divertedTo: GateId;
    reason: string;
}

interface CancelledFlight {
    state: FlightState.Cancelled,
    flightCode: FlightCode,
    readonly cancelledAt: Date,
    reason: string
}

type Flight = ScheduledFlight | BoardingFlight | DepartedFlight | DivertedFlight | CancelledFlight

type GateLogEntry = [event: string, flightCode: FlightCode, at: number]

interface GateConsole {
    flights: Flight[],
    log: GateLogEntry[]
}

interface GateConsole {
    printSummary(): void
}

function assertNever(x: never): never {
    throw new Error(`Unhandled case: ${x}`);
}

function makeFlightCode(code: string): FlightCode {
    const FlightCodeRegex = /^[A-Z]{2}\d{3,4}$/
    const testInputCode = FlightCodeRegex.test(code)
    if (!testInputCode) {
        throw new Error("invalid code!");
    }

    return code as FlightCode
}

function makeGateId(id: string): GateId {
    if (id.trim().length === 0) {
        throw new Error("invalid ID!");
    }

    return id.trim() as GateId
}

function renderFlightRow(flight: Flight): string {
    switch (flight.state) {
        case FlightState.Scheduled:
            return `[SCHEDULED] ${flight.flightCode} → Gate ${flight.gate}`

        case FlightState.Diverted:
            return `[DIVERTED] ${flight.flightCode} → ${flight.divertedTo} | ${flight.reason}`

        case FlightState.Departed:
            return `[DEPARTED] ${flight.flightCode} ${flight.actualDeparture}`

        case FlightState.Boarding:
            return `[BOARDING] ${flight.flightCode} | Gate ${flight.gate} | Groups ${flight.boardingGroupsTuple[1].join(", ")} now boarding`

        case FlightState.Cancelled:
            return `[CANCELLED] ${flight.flightCode} canceled, ${flight.reason}`

        default:
            const _: never = flight
            assertNever(_)
    }
}

function appendLog(console: GateConsole, entry: GateLogEntry): GateConsole {
    return { ...console, log: [...console.log, entry] }
}

// test output

const fc = makeFlightCode("BA249");
const gateB = makeGateId("B12");
const gateC = makeGateId("C07");

const boardingFlight: BoardingFlight = {
    flightCode: fc,
    gate: gateB,
    departureTuple: ["Departure", Date.now()],
    state: FlightState.Boarding,
    boardingGroupsTuple: ["Groups", ["1", "2", "3"]],
};

const divertedFlight: DivertedFlight = {
    flightCode: fc,
    gate: gateB,
    departureTuple: ["Departure", Date.now()],
    state: FlightState.Diverted,
    boardingGroupsTuple: ["Groups", ["1", "2", "3"]],
    divertedTo: gateC,
    reason: "Weather conditions",
};

const gateConsole: GateConsole = {
    flights: [boardingFlight, divertedFlight],
    log: [],

    printSummary() {
        console.log("===== GATE SUMMARY =====");

        this.flights.forEach((flight) => {
            console.log(renderFlightRow(flight));
        });

        console.log("===== LOG =====");

        this.log.forEach(([event, flightCode, at]) => {
            console.log(`${event} | ${flightCode} | ${new Date(at).toLocaleString()}`);
        });
    }
};

// makeFlightCode validates format
makeFlightCode("BA249");
// ✓ FlightCode: "BA249"
makeFlightCode("9W");
// ✗ Error: invalid flight code format

// renderFlightRow — exhaustive switch
renderFlightRow(boardingFlight);
// → "[BOARDING] BA249 | Gate B12 | Groups 1–3 now boarding"
renderFlightRow(divertedFlight);
// → "[DIVERTED] BA249 → C07 | Weather"

// never guard catches impossible state
// default: assertNever(flight) — TypeScript error if new state added

// appendLog — spread, not push
appendLog(gateConsole, ["Boarded", fc, Date.now()]);
// → { ...console, log: [...console.log, entry] }
