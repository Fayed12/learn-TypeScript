var Light;
(function (Light) {
    Light["Red"] = "Red";
    Light["Green"] = "Green";
    Light["Yellow"] = "Yellow";
})(Light || (Light = {}));
function next(current) {
    switch (current) {
        case Light.Red:
            return Light.Green;
        case Light.Green:
            return Light.Yellow;
        case Light.Yellow:
            return Light.Red;
        default:
            const _ = current;
            return _;
    }
}
function canGo(light) {
    return light === Light.Green;
}
function simulate(steps) {
    let current = Light.Red;
    for (let i = 0; i < steps; i++) {
        if (current === Light.Red) {
            console.log(`${current} → stop`);
        }
        else if (current === Light.Green) {
            console.log(`${current} → go`);
        }
        else {
            console.log(`${current} → slow down`);
        }
        current = next(current);
    }
}
const nextColor = next(Light.Red);
console.log(nextColor);
const isGo = canGo(Light.Red);
console.log(isGo);
simulate(5);
export {};
//# sourceMappingURL=index.js.map