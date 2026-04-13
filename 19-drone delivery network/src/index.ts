// ====================================================================================

// project 19-Drone delivery network

// ====================================================================================


enum DroneStatus { Idle = "IDLE", InFlight = "IN_FLIGHT", Charging = "CHARGING", Maintenance = "MAINTENANCE" }

type BatteryLevel = number & { readonly __brand: "BatteryLevel" };

function toBatteryLevel(pct: number): BatteryLevel {
    if (pct < 0 || pct > 100) throw new Error("Battery % must be 0-100");
    return pct as BatteryLevel;
}

type DronePosition = [lat: number, lng: number, altitudeMeters: number];

interface Drone {
    readonly id: string;
    readonly model: string;
    status: DroneStatus;
    batteryLevel: BatteryLevel;   // remember to update after flight!
    position: DronePosition;
    readonly maxRangeKm: number;
}

interface CargoDrone extends Drone { maxPayloadKg: number; currentPayloadKg: number; }

interface ScoutDrone extends Drone { cameraResolution: string; streamUrl: string; }

type DeliveryOutcome =
    | { result: "delivered"; droneId: string; deliveredAt: number; finalBattery: BatteryLevel }
    | { result: "failed"; droneId: string; reason: "battery_low" | "obstacle" | "weather" }
    | { result: "rerouted"; droneId: string; newDestination: DronePosition; eta: number };

interface Drone { diagnostics?: { lastPingMs: number; signalStrength: number } }

type DispatchResult = {
    outcome: DeliveryOutcome;
    updatedDrone: CargoDrone;
};

function createDrone(model: string, batteryPct: BatteryLevel): Drone {
    return {
        id: crypto.randomUUID(),
        model,
        status: DroneStatus.Idle,
        batteryLevel: batteryPct,
        position: [0, 0, 0],
        maxRangeKm: 10,
    }
}

function registerDrone(model: string, batteryPct: BatteryLevel): CargoDrone {
    const newDrone: CargoDrone = {
        ...createDrone(model, batteryPct),
        maxPayloadKg: 0,
        currentPayloadKg: 0
    }

    return newDrone
}

function createScoutDrone(model: string, batteryPct: BatteryLevel, streamUrl: string, cameraResolution: string): ScoutDrone {
    return {
        ...createDrone(model, batteryPct),
        streamUrl,
        cameraResolution
    }
}

function dispatchDelivery(drone: CargoDrone, destination: DronePosition): DispatchResult {

    // calculate battery simulate
    // here battery maybe greater than 100% so we make condition when needed > battery level so it failed
    const latDiff = destination[0] - drone.position[0];
    const lngDiff = destination[1] - drone.position[1];

    const distance = Math.sqrt(latDiff ** 2 + lngDiff ** 2) * 111;
    const batteryNeeded = distance * 2

    if (batteryNeeded > drone.batteryLevel) {

        return {
            outcome: {
                result: "failed",
                droneId: drone.id,
                reason: "battery_low"
            },
            updatedDrone: { ...drone, status: DroneStatus.Idle }
        }
    }

    const remaining = drone.batteryLevel - batteryNeeded;
    const finalBattery = toBatteryLevel(Math.max(0, remaining));

    const stationDestination: DronePosition = [20, 20, 0]
    if (finalBattery < 20) {

        return {
            outcome: {
                result: "rerouted",
                droneId: drone.id,
                newDestination: stationDestination,
                eta: 10
            },
            updatedDrone: { ...drone, status: DroneStatus.Charging, batteryLevel: finalBattery }
        }
    } else {

        return {
            outcome: {
                result: "delivered",
                droneId: drone.id,
                deliveredAt: Date.now(),
                finalBattery
            },
            updatedDrone: { ...drone, batteryLevel: finalBattery, status: DroneStatus.Idle }
        }
    }
}

function describeStatus(s: DroneStatus): string {
    switch (s) {
        case DroneStatus.Charging:
            return "Drone is recharging at base station"

        case DroneStatus.Idle:
            return "Drone is idle now, its not working right now"

        case DroneStatus.InFlight:
            return "Drone in flight mode status now"

        case DroneStatus.Maintenance:
            return "Drone in Maintenance mode now, it will be available later"

        default: const _n: never = s; return _n;
    }
}

// test output

const lowBatteryDrone = registerDrone("Mini X", toBatteryLevel(10));
const destination: DronePosition = [28.0444, 41.2357, 60];

const drone = registerDrone("DJI Cargo X2", toBatteryLevel(95))
console.log(drone)
// → { id: "e5f6-...", model: "DJI Cargo X2", status: "IDLE", batteryLevel: 95, ... }

console.log(dispatchDelivery(drone, [30.0444, 31.2357, 50]))
// → { result: "delivered", droneId: "e5f6-...", finalBattery: 71, deliveredAt: 1712... }

console.log(dispatchDelivery(lowBatteryDrone, destination))
// → { result: "failed", droneId: "a1b2-...", reason: "battery_low" }

console.log(describeStatus(DroneStatus.Charging))
// → "Drone is recharging at base station"
