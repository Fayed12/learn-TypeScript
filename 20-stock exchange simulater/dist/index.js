var Market;
(function (Market) {
    Market["Equity"] = "EQUITY";
    Market["Bond"] = "BOND";
    Market["Commodity"] = "COMMODITY";
    Market["Crypto"] = "CRYPTO";
})(Market || (Market = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide["Buy"] = "BUY";
    OrderSide["Sell"] = "SELL";
})(OrderSide || (OrderSide = {}));
function toPrice(n) {
    if (n < 0)
        throw new Error("number must be positive!");
    return n;
}
function toQuantity(n) {
    if (n <= 0)
        throw new Error("Quantity must be greater than 0");
    return n;
}
let isMarketOpen = true;
function placeOrder(event, account) {
    if (!isMarketOpen) {
        return { kind: "rejected", reason: "market_closed" };
    }
    switch (event.type) {
        case "place_limit":
            const total = toPrice(event.order.limitPrice * event.order.quantity);
            if (event.order.quantity <= 0) {
                return { kind: "rejected", reason: "invalid_quantity" };
            }
            if (account.balance < total) {
                return { kind: "rejected", reason: "insufficient_funds" };
            }
            return { kind: "accepted", orderId: event.order.id };
        case "place_market":
            if (event.order.quantity <= 0) {
                return { kind: "rejected", reason: "invalid_quantity" };
            }
            return { kind: "accepted", orderId: event.order.id };
        default:
            throw new Error("error in placeOrder!");
    }
}
function processOrderEvent(event) {
    switch (event.type) {
        case "place_limit":
            return `Limit order placed: ${event.order.quantity} x ${event.order.ticker} @ $${event.order.limitPrice}`;
        case "place_market":
            return `order ${event.order.id} is placed`;
        case "cancel":
            return `order ${event.orderId} is canceled and reason is ${event.reason} `;
        case "partial_fill":
            return `Partial fill: ${event.filledQty} units @ $${event.fillPrice}`;
        case "full_fill":
            return `Order ${event.orderId} fully filled. Total value: $${event.totalValue}`;
        default:
            const _exhaustive = event;
            return _exhaustive;
    }
}
placeOrder({ type: "place_limit", order: { id: crypto.randomUUID(), ticker: "AAPL", side: OrderSide.Buy, limitPrice: toPrice(187.50), quantity: toQuantity(10), filledQuantity: toQuantity(5) } }, { balance: 30 });
processOrderEvent({ type: "partial_fill", orderId: "f7g8-...", filledQty: toQuantity(4), fillPrice: toPrice(187.20) });
processOrderEvent({ type: "full_fill", orderId: "f7g8-...", fillPrice: toPrice(187.40), totalValue: toPrice(1874.00) });
placeOrder({ type: "place_market", order: { id: crypto.randomUUID(), ticker: "BTC", side: OrderSide.Buy, quantity: toQuantity(0) } }, { balance: 40 });
export {};
//# sourceMappingURL=index.js.map