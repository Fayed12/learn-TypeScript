// ========================================================================================================================

// project 1  ====> Build a function that converts a temperature value from one scale to another <=======

// ========================================================================================================================

type Scale = "celsius" | "fahrenheit" | "kelvin"

function convert(value: number, from: Scale, to: Scale): number {
    if (from === "celsius") {
        switch (to) {
            case "celsius":
                return value

            case "fahrenheit":

                return (value * (9 / 5)) + 32

            case "kelvin":
                return value + 273.15

            default:
                const x: never = to
                return x
        }
    } else if (from === "fahrenheit") {
        switch (to) {
            case "celsius":
                return (value - 32) * (5 / 9)

            case "fahrenheit":

                return value

            case "kelvin":
                return (value - 32) * (5 / 9) + 273.15

            default:
                const x: never = to
                return x
        }
    } else if (from === "kelvin") {
        switch (to) {
            case "celsius":
                return (value - 273.15)

            case "fahrenheit":

                return ((value - 273.15) * 9 / 5) + 32

            case "kelvin":
                return value

            default:
                const x: never = to
                return x
        }
    } else {
        const _: never = from
        return _
    }
}

function format(value: number, scale: Scale): string {
    switch (scale) {
        case "celsius":
            return `${value.toFixed(1)}°C`

        case "fahrenheit":
            return `${value.toFixed(1)}°F`

        case "kelvin":
            return `${value.toFixed(1)}K`

        default:
            const x: never = scale
            return x
    }
}

console.log(convert(100, "celsius", "fahrenheit")) // → 212
console.log(convert(0, "celsius", "kelvin"))   // → 273.15
console.log(format(212, "fahrenheit"))  // → "212.0°F"