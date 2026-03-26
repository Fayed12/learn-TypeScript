var Size;
(function (Size) {
    Size["Small"] = "Small";
    Size["Medium"] = "Medium";
    Size["Large"] = "Large";
})(Size || (Size = {}));
var Crust;
(function (Crust) {
    Crust["Thin"] = "Thin";
    Crust["Thick"] = "Thick";
})(Crust || (Crust = {}));
const prices = {
    [Size.Small]: 5,
    [Size.Medium]: 8,
    [Size.Large]: 11,
    topping: 1,
    ThickCrust: 1.5
};
function createOrder(size, crust, toppings) {
    const newOrder = { size, crust, toppings };
    return newOrder;
}
function getPrice(order) {
    const sizePrice = prices[order.size];
    const crust = order.crust;
    const crustPrice = crust === Crust.Thick ? prices.ThickCrust : 0;
    const topping = order.toppings;
    const toppingPrice = topping.length * prices.topping;
    const totalPrice = sizePrice + crustPrice + toppingPrice;
    return totalPrice;
}
function describe(order) {
    const toppingText = order.toppings.join(", ");
    const orderDescription = `${order.size} ${order.crust} pizza with ${toppingText}`;
    return orderDescription;
}
const newOrder = createOrder(Size.Large, Crust.Thick, ["cheese", "sausage"]);
console.log(newOrder);
const orderPrice = getPrice(newOrder);
console.log(orderPrice);
const orderDescription = describe(newOrder);
console.log(orderDescription);
export {};
//# sourceMappingURL=index.js.map