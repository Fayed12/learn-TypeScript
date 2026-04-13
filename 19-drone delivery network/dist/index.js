var DroneStatus;
(function (DroneStatus) {
    DroneStatus["Idle"] = "IDLE";
    DroneStatus["InFlight"] = "IN_FLIGHT";
    DroneStatus["Charging"] = "CHARGING";
    DroneStatus["Maintenance"] = "MAINTENANCE";
})(DroneStatus || (DroneStatus = {}));
function toBatteryLevel(pct) {
    if (pct < 0 || pct > 100)
        throw new Error("Battery % must be 0-100");
    return pct;
}
function createDrone(model, batteryPct) {
    return {
        id: crypto.randomUUID(),
        model,
        status: DroneStatus.Idle,
        batteryLevel: batteryPct,
        position: [0, 0, 0],
        maxRangeKm: 10,
    };
}
function registerDrone(model, batteryPct) {
    const newDrone = {
        ...createDrone(model, batteryPct),
        maxPayloadKg: 0,
        currentPayloadKg: 0
    };
    return newDrone;
}
function createScoutDrone(model, batteryPct, streamUrl, cameraResolution) {
    return {
        ...createDrone(model, batteryPct),
        streamUrl,
        cameraResolution
    };
}
function dispatchDelivery(drone, destination) {
    const latDiff = destination[0] - drone.position[0];
    const lngDiff = destination[1] - drone.position[1];
    const distance = Math.sqrt(latDiff ** 2 + lngDiff ** 2) * 111;
    const batteryNeeded = distance * 2;
    if (batteryNeeded > drone.batteryLevel) {
        return {
            outcome: {
                result: "failed",
                droneId: drone.id,
                reason: "battery_low"
            },
            updatedDrone: { ...drone, status: DroneStatus.Idle }
        };
    }
    const remaining = drone.batteryLevel - batteryNeeded;
    const finalBattery = toBatteryLevel(Math.max(0, remaining));
    const stationDestination = [20, 20, 0];
    if (finalBattery < 20) {
        return {
            outcome: {
                result: "rerouted",
                droneId: drone.id,
                newDestination: stationDestination,
                eta: 10
            },
            updatedDrone: { ...drone, status: DroneStatus.Charging, batteryLevel: finalBattery }
        };
    }
    else {
        return {
            outcome: {
                result: "delivered",
                droneId: drone.id,
                deliveredAt: Date.now(),
                finalBattery
            },
            updatedDrone: { ...drone, batteryLevel: finalBattery, status: DroneStatus.Idle }
        };
    }
}
function describeStatus(s) {
    switch (s) {
        case DroneStatus.Charging:
            return "Drone is recharging at base station";
        case DroneStatus.Idle:
            return "Drone is idle now, its not working right now";
        case DroneStatus.InFlight:
            return "Drone in flight mode status now";
        case DroneStatus.Maintenance:
            return "Drone in Maintenance mode now, it will be available later";
        default:
            const _n = s;
            return _n;
    }
}
const lowBatteryDrone = registerDrone("Mini X", toBatteryLevel(10));
const destination = [28.0444, 41.2357, 60];
const drone = registerDrone("DJI Cargo X2", toBatteryLevel(95));
console.log(drone);
console.log(dispatchDelivery(drone, [30.0444, 31.2357, 50]));
console.log(dispatchDelivery(lowBatteryDrone, destination));
console.log(describeStatus(DroneStatus.Charging));
export {};
//# sourceMappingURL=index.js.map