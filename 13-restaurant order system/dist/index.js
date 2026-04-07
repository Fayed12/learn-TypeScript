// ================================================================================
// 13 ====> restaurant ordering system
// ================================================================================
var MenuCategory;
(function (MenuCategory) {
    MenuCategory["Starter"] = "Starter";
    MenuCategory["Main"] = "Main";
    MenuCategory["Dessert"] = "Dessert";
    MenuCategory["Drink"] = "Drink";
})(MenuCategory || (MenuCategory = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "Pending";
    OrderStatus["Preparing"] = "Preparing";
    OrderStatus["Ready"] = "Ready";
    OrderStatus["Delivered"] = "Delivered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
function placeOrder(tableNumber, items) {
    return {
        id: crypto.randomUUID(),
        tableNumber,
        items,
        status: OrderStatus.Pending,
        createdAt: new Date()
    };
}
function updateOrderStatus(order, status) {
    return {
        ...order,
        status
    };
}
function calculateBill(order) {
    const total = order.items.reduce((acc, cur) => {
        return +acc + +(cur.price * cur.quantity);
    }, 0);
    const itemsBillLine = order.items.flatMap((item) => {
        return Array(item.quantity).fill([order.tableNumber, item.name, item.price]);
    });
    return [total, itemsBillLine];
}
function handleKitchenEvent(event) {
    switch (event.kind) {
        case "order_received":
            console.log(`Order received for table ${event.order.tableNumber}`);
            return;
        case "item_ready":
            console.log(`${event.itemName} is ready for order ${event.orderId}`);
            return;
        case "order_cancelled":
            console.log(`Order ${event.orderId} cancelled — ${event.message}`);
            return;
        default:
            const _event = event;
            return _event;
    }
}
// test output
const pasta = {
    id: "m1", name: "Pasta", price: 85,
    category: MenuCategory.Main, isAvailable: true
};
const orderItem = { ...pasta, quantity: 2, specialNotes: "no onion" };
const order = placeOrder(5, [orderItem]);
console.log(order);
// { id: "...", tableNumber: 5, items: [...], status: OrderStatus.Pending, createdAt: Date }
const updateResult = updateOrderStatus(order, OrderStatus.Preparing);
console.log(updateResult);
// { ...order, status: OrderStatus.Preparing }
const billResult = calculateBill(order);
console.log(billResult);
// [170, [[5, "Pasta", 85], [5, "Pasta", 85]]]
// total = 170, one line per quantity unit
handleKitchenEvent({ kind: "order_received", order });
// logs: "Order received for table 5"
handleKitchenEvent({ kind: "item_ready", orderId: order.id, itemName: "Pasta" });
export {};
// logs: "Pasta is ready for order ..."
//# sourceMappingURL=index.js.map