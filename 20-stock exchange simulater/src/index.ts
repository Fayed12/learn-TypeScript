// =============================================================================

// project 20 ==== > stock exchange simulator

// =============================================================================


enum Market { Equity = "EQUITY", Bond = "BOND", Commodity = "COMMODITY", Crypto = "CRYPTO" }

enum OrderSide { Buy = "BUY", Sell = "SELL" }

type Price = number & { readonly __brand: "Price" };
type Quantity = number & { readonly __brand: "Quantity" };

function toPrice(n: number): Price {
    if (n < 0) throw new Error("number must be positive!")

    return n as Price
}

function toQuantity(n: number): Quantity {
    if (n <= 0) throw new Error("Quantity must be greater than 0")

    return n as Quantity
}

// [open, high, low, close]
type OHLCBar = [open: Price, high: Price, low: Price, close: Price];

interface Instrument {
    readonly ticker: string;
    readonly market: Market;
    readonly currency: string;
    currentPrice: Price;
    readonly listingDate: number;
    ohlc: OHLCBar;
}

interface LimitOrder {
    readonly id: string;
    side: OrderSide;
    ticker: string;
    limitPrice: Price;
    quantity: Quantity;  // ← don't forget to use this in total calc!
    filledQuantity: Quantity;
}

interface MarketOrder {
    readonly id: string;
    side: OrderSide;
    ticker: string;
    quantity: Quantity;
}

interface LimitOrder { riskScore?: number; stopLoss?: Price; }

interface MarketOrder { riskScore?: number; }

type OrderEvent =
    | { type: "place_limit"; order: LimitOrder }
    | { type: "place_market"; order: MarketOrder }
    | { type: "cancel"; orderId: string; reason: string }
    | { type: "partial_fill"; orderId: string; filledQty: Quantity; fillPrice: Price }
    | { type: "full_fill"; orderId: string; fillPrice: Price; totalValue: Price };

type OrderResult =
    | { kind: "accepted"; orderId: string }
    | { kind: "rejected"; reason: "insufficient_funds" | "market_closed" | "invalid_quantity" };

let isMarketOpen: boolean = true;

interface Account {
    balance: number
}

function placeOrder(event: OrderEvent, account: Account): OrderResult {
    if (!isMarketOpen) {
        return { kind: "rejected", reason: "market_closed" }
    }

    switch (event.type) {
        case "place_limit":
            const total: Price = toPrice(event.order.limitPrice * event.order.quantity)

            if (event.order.quantity <= 0) {
                return { kind: "rejected", reason: "invalid_quantity" }
            }

            if (account.balance < total) {
                return { kind: "rejected", reason: "insufficient_funds" }
            }
            return { kind: "accepted", orderId: event.order.id }

        case "place_market":
            if (event.order.quantity <= 0) {
                return { kind: "rejected", reason: "invalid_quantity" }
            }

            return { kind: "accepted", orderId: event.order.id }

        default:
            throw new Error("error in placeOrder!")
    }
}

function processOrderEvent(event: OrderEvent): string {
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
            const _exhaustive: never = event;
            return _exhaustive;
    }
}


// test output

placeOrder({ type: "place_limit", order: { id: crypto.randomUUID(), ticker: "AAPL", side: OrderSide.Buy, limitPrice: toPrice(187.50), quantity: toQuantity(10), filledQuantity: toQuantity(5) } }, { balance: 30 })
// → { kind: "accepted", orderId: "f7g8-..." }

processOrderEvent({ type: "partial_fill", orderId: "f7g8-...", filledQty: toQuantity(4), fillPrice: toPrice(187.20) })
// → "Partial fill: 4 / 10 units @ $187.20. Remaining: 6"

processOrderEvent({ type: "full_fill", orderId: "f7g8-...", fillPrice: toPrice(187.40), totalValue: toPrice(1874.00) })
// → "Order f7g8-... fully filled. Total value: $1874.00"

placeOrder({ type: "place_market", order: { id: crypto.randomUUID(), ticker: "BTC", side: OrderSide.Buy, quantity: toQuantity(0) } }, { balance: 40 })
// → { kind: "rejected", reason: "invalid_quantity" }