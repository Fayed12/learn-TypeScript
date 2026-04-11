var MissionStatus;
(function (MissionStatus) {
    MissionStatus["Planning"] = "PLANNING";
    MissionStatus["Active"] = "ACTIVE";
    MissionStatus["Aborted"] = "ABORTED";
    MissionStatus["Complete"] = "COMPLETE";
})(MissionStatus || (MissionStatus = {}));
function toFuelBudget(n) {
    if (n >= 0) {
        return n;
    }
    else {
        throw new Error("number must be positive");
    }
}
function createMission(name, launchSite, targetOrbit) {
    const newMission = {
        id: crypto.randomUUID(),
        name,
        status: MissionStatus.Planning,
        fuelBudget: toFuelBudget(0),
        launchSite,
        targetOrbit
    };
    return newMission;
}
function logEvent(event) {
    switch (event.type) {
        case "launch":
            return `mission ${event.missionId} launched, fuel used: ${event.fuelUsed} units`;
        case "abort":
            return `Mission aborted: ${event.reason}`;
        case "landing":
            return `mission ${event.missionId} landing successfully with score: ${event.successScore} `;
        default:
            const _ = event;
            return _;
    }
}
function describeStatus(s) {
    switch (s) {
        case MissionStatus.Planning:
            return "mission planning done successfully";
        case MissionStatus.Active:
            return "mission has been activate successfully";
        case MissionStatus.Complete:
            return "Mission concluded successfully";
        case MissionStatus.Aborted:
            return "mission has been aborted";
        default:
            const _n = s;
            return _n;
    }
}
function consumeFuel(mission, amount) {
    if (amount > mission.fuelBudget) {
        throw new Error("not enough fuel!");
    }
    const newActiveMission = {
        ...mission,
        status: MissionStatus.Active,
        fuelConsumed: toFuelBudget(amount),
        fuelBudget: toFuelBudget(mission.fuelBudget - amount),
        launchedAt: Date.now(),
    };
    return newActiveMission;
}
const mission1 = {
    id: crypto.randomUUID(),
    name: "Mars Exploration Alpha",
    status: MissionStatus.Planning,
    crew: ["u1", "Alice", "Commander"],
    fuelBudget: toFuelBudget(5000),
    launchSite: "Cape Canaveral"
};
console.log(createMission("Artemis VII", "Cape Canaveral", "Earth"));
console.log(logEvent({ type: "launch", missionId: "a1b2", fuelUsed: toFuelBudget(84000), timestamp: 12 }));
console.log(logEvent({ type: "abort", missionId: "a1b2-...", reason: "engine anomaly", timestamp: 14 }));
console.log(describeStatus(MissionStatus.Complete));
console.log(consumeFuel(mission1, toFuelBudget(2000)));
export {};
//# sourceMappingURL=index.js.map