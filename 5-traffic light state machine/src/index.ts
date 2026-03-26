// ========================================================================================================================

// project 5 ====> traffic light state machine

// ========================================================================================================================

enum Light {
    Red = "Red",
    Green = "Green",
    Yellow = "Yellow"
}

function next(current: Light): Light {
    switch (current) {
        case Light.Red:
            return Light.Green

        case Light.Green:
            return Light.Yellow

        case Light.Yellow:
            return Light.Red

        default:
            const _: never = current
            return _
    }
}

function canGo(light: Light): boolean {
    return light === Light.Green
}

function simulate(steps: number): void {

    let current: Light = Light.Red

    for (let i = 0; i < steps; i++) {
        if (current === Light.Red) {
            console.log(`${current} → stop`)

        } else if (current === Light.Green) {
            console.log(`${current} → go`)

        } else {
            console.log(`${current} → slow down`)
        }

        current = next(current)
    }
}

const nextColor = next(Light.Red)
console.log(nextColor)

const isGo = canGo(Light.Red)
console.log(isGo)

simulate(5)