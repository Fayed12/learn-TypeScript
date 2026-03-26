function convert(value, from, to) {
    if (from === "celsius") {
        switch (to) {
            case "celsius":
                return value;
            case "fahrenheit":
                return (value * (9 / 5)) + 32;
            case "kelvin":
                return value + 273.15;
            default:
                const x = to;
                return x;
        }
    }
    else if (from === "fahrenheit") {
        switch (to) {
            case "celsius":
                return (value - 32) * (5 / 9);
            case "fahrenheit":
                return value;
            case "kelvin":
                return (value - 32) * (5 / 9) + 273.15;
            default:
                const x = to;
                return x;
        }
    }
    else if (from === "kelvin") {
        switch (to) {
            case "celsius":
                return (value - 273.15);
            case "fahrenheit":
                return ((value - 273.15) * 9 / 5) + 32;
            case "kelvin":
                return value;
            default:
                const x = to;
                return x;
        }
    }
    else {
        const _ = from;
        return _;
    }
}
function format(value, scale) {
    switch (scale) {
        case "celsius":
            return `${value.toFixed(1)}°C`;
        case "fahrenheit":
            return `${value.toFixed(1)}°F`;
        case "kelvin":
            return `${value.toFixed(1)}K`;
        default:
            const x = scale;
            return x;
    }
}
console.log(convert(100, "celsius", "fahrenheit"));
console.log(convert(0, "celsius", "kelvin"));
console.log(format(212, "fahrenheit"));
export {};
//# sourceMappingURL=index.js.map