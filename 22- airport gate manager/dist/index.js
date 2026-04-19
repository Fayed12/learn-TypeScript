var FlightState;
(function (FlightState) {
    FlightState["Scheduled"] = "Scheduled";
    FlightState["Boarding"] = "Boarding";
    FlightState["Departed"] = "Departed";
    FlightState["Diverted"] = "Diverted";
    FlightState["Cancelled"] = "Cancelled";
})(FlightState || (FlightState = {}));
function assertNever(x) {
    throw new Error(`Unhandled case: ${x}`);
}
function makeFlightCode(code) {
    const FlightCodeRegex = /^[A-Z]{2}\d{3,4}$/;
    const testInputCode = FlightCodeRegex.test(code);
    if (!testInputCode) {
        throw new Error("invalid code!");
    }
    return code;
}
function makeGateId(id) {
    if (id.trim().length === 0) {
        throw new Error("invalid ID!");
    }
    return id.trim();
}
function renderFlightRow(flight) {
    switch (flight.state) {
        case FlightState.Scheduled:
            return `[SCHEDULED] ${flight.flightCode} → Gate ${flight.gate}`;
        case FlightState.Diverted:
            return `[DIVERTED] ${flight.flightCode} → ${flight.divertedTo} | ${flight.reason}`;
        case FlightState.Departed:
            return `[DEPARTED] ${flight.flightCode} ${flight.actualDeparture}`;
        case FlightState.Boarding:
            return `[BOARDING] ${flight.flightCode} | Gate ${flight.gate} | Groups ${flight.boardingGroupsTuple[1].join(", ")} now boarding`;
        case FlightState.Cancelled:
            return `[CANCELLED] ${flight.flightCode} canceled, ${flight.reason}`;
        default:
            const _ = flight;
            assertNever(_);
    }
}
function appendLog(console, entry) {
    return { ...console, log: [...console.log, entry] };
}
const fc = makeFlightCode("BA249");
const gateB = makeGateId("B12");
const gateC = makeGateId("C07");
const boardingFlight = {
    flightCode: fc,
    gate: gateB,
    departureTuple: ["Departure", Date.now()],
    state: FlightState.Boarding,
    boardingGroupsTuple: ["Groups", ["1", "2", "3"]],
};
const divertedFlight = {
    flightCode: fc,
    gate: gateB,
    departureTuple: ["Departure", Date.now()],
    state: FlightState.Diverted,
    boardingGroupsTuple: ["Groups", ["1", "2", "3"]],
    divertedTo: gateC,
    reason: "Weather conditions",
};
const gateConsole = {
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
makeFlightCode("BA249");
makeFlightCode("9W");
renderFlightRow(boardingFlight);
renderFlightRow(divertedFlight);
appendLog(gateConsole, ["Boarded", fc, Date.now()]);
export {};
//# sourceMappingURL=index.js.map