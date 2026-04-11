// ==============================================================================

// project 17 ====> space mission planner

// ==============================================================================

enum MissionStatus { Planning = "PLANNING", Active = "ACTIVE", Aborted = "ABORTED", Complete = "COMPLETE" }

type FuelBudget = number & { readonly __brand: "FuelBudget" };

function toFuelBudget(n: number):FuelBudget {
    if (n >= 0) {
        return n as FuelBudget
    } else {
        throw new Error("number must be positive")
    }
}

type CrewManifest = [commanderId: string, pilotId: string, missionSpecialistId: string];

interface Mission {
    readonly id: string;
    name: string;
    status: MissionStatus;
    crew?: CrewManifest;
    fuelBudget: FuelBudget;
    readonly launchSite: string;
}

interface PlannedMission extends Mission { targetOrbit: string; }

interface ActiveMission extends Mission { launchedAt: number; fuelConsumed: FuelBudget; }

type MissionEvent =
    | { type: "launch"; missionId: string; timestamp: number; fuelUsed: FuelBudget }
    | { type: "abort"; missionId: string; timestamp: number; reason: string }
    | { type: "landing"; missionId: string; timestamp: number; successScore: number };

interface Mission { lastTelemetry?: number; }

function createMission(name: string, launchSite: string, targetOrbit: string): PlannedMission {
    const newMission: PlannedMission = {
        id: crypto.randomUUID(),
        name,
        status: MissionStatus.Planning,
        fuelBudget: toFuelBudget(0),
        launchSite,
        targetOrbit
    }

    return newMission
}

function logEvent(event: MissionEvent): string {
    switch (event.type) {
        case "launch":
            return `mission ${event.missionId} launched, fuel used: ${event.fuelUsed} units`

        case "abort":
            return `Mission aborted: ${event.reason}`

        case "landing":
            return `mission ${event.missionId} landing successfully with score: ${event.successScore} `

        default:
            const _: never = event;
            return _
    }
}

function describeStatus(s: MissionStatus): string {
    switch (s) {
        case MissionStatus.Planning:
            return "mission planning done successfully"

        case MissionStatus.Active:
            return "mission has been activate successfully"

        case MissionStatus.Complete:
            return "Mission concluded successfully"

        case MissionStatus.Aborted:
            return "mission has been aborted"

        default: const _n: never = s;
            return _n;
    }
}

function consumeFuel(mission: Mission, amount: FuelBudget): ActiveMission {
    if (amount > mission.fuelBudget) {
        throw new Error("not enough fuel!")
    }

    const newActiveMission: ActiveMission = {
        ...mission,
        status: MissionStatus.Active,
        fuelConsumed: toFuelBudget(amount),
        fuelBudget: toFuelBudget(mission.fuelBudget - amount),
        launchedAt: Date.now(),
    }

    return newActiveMission
}

// test output

const mission1: Mission = {
    id: crypto.randomUUID(),
    name: "Mars Exploration Alpha",
    status: MissionStatus.Planning,
    crew: ["u1", "Alice", "Commander"],
    fuelBudget: toFuelBudget(5000),
    launchSite: "Cape Canaveral"
}

console.log(createMission("Artemis VII","Cape Canaveral","Earth"))
// → { id: "a1b2-...", name: "Artemis VII", status: "PLANNING", ... }

console.log(logEvent({ type: "launch", missionId: "a1b2", fuelUsed: toFuelBudget(84000), timestamp: 12 }))
// → "Mission Artemis VII launched. Fuel used: 84000 units."

console.log(logEvent({ type: "abort", missionId: "a1b2-...", reason: "engine anomaly", timestamp: 14 }))
// → "Mission aborted: engine anomaly"

console.log(describeStatus(MissionStatus.Complete))
// → "Mission concluded successfully"

console.log(consumeFuel(mission1, toFuelBudget(2000)))