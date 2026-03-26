// ========================================================================================================================

// project 4 ====> Pizza order builder

// ========================================================================================================================

enum Size { Small = "Small", Medium = "Medium", Large = "Large" }
enum Crust { Thin = "Thin", Thick = "Thick" }

type Topping =
    | "cheese"
    | "mushrooms"
    | "pepperoni"
    | "sausage"
    | "onions"
    | "olives"
    | "tomatoes"
    | "bacon"
    | "chicken"
    | "peppers"
    | "pineapple"

type Order = {
    size: Size
    crust: Crust
    toppings: Topping[]
}

const prices = {
    [Size.Small]: 5,
    [Size.Medium]: 8,
    [Size.Large]: 11,
    topping: 1,
    ThickCrust: 1.5
}

function createOrder(size: Size, crust: Crust, toppings: Topping[]): Order {
    const newOrder = { size, crust, toppings }
    return newOrder
}

function getPrice(order: Order): number {
    const sizePrice: number = prices[order.size]

    const crust: Crust = order.crust
    const crustPrice = crust === Crust.Thick ? prices.ThickCrust : 0

    const topping: Topping[] = order.toppings
    const toppingPrice = topping.length * prices.topping

    const totalPrice = sizePrice + crustPrice + toppingPrice

    return totalPrice
}

function describe(order: Order): string {
    const toppingText = order.toppings.join(", ")
    const orderDescription = `${order.size} ${order.crust} pizza with ${toppingText}`

    return orderDescription
}

const newOrder = createOrder(Size.Large, Crust.Thick, ["cheese", "sausage"])
console.log(newOrder)

const orderPrice = getPrice(newOrder)
console.log(orderPrice)

const orderDescription = describe(newOrder)
console.log(orderDescription)