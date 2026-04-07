// ================================================================================

// 13 ====> restaurant ordering system

// ================================================================================

enum MenuCategory {
    Starter = "Starter",
    Main = "Main",
    Dessert = "Dessert",
    Drink = "Drink"
}

enum OrderStatus {
    Pending = "Pending",
    Preparing = "Preparing",
    Ready = "Ready",
    Delivered = "Delivered",
    Cancelled = "Cancelled"
}

interface MenuItem {
    id: string,
    name: string,
    price: number,
    category: MenuCategory,
    isAvailable: boolean
}

interface OrderItem extends MenuItem {
    quantity: number,
    specialNotes?: string
}

interface Order {
    readonly id: string
    tableNumber: number,
    items: OrderItem[],
    status: OrderStatus,
    createdAt: Date
}

type BillLine = [tableNumber: number, itemName: string, price: number]

type KitchenEvent =
    | { kind: "order_received"; order: Order }
    | { kind: "item_ready"; orderId: string; itemName: string }
    | { kind: "order_cancelled"; orderId: string;  message: string }

function placeOrder(tableNumber: number, items: OrderItem[]): Order {
    return {
        id: crypto.randomUUID(),
        tableNumber,
        items,
        status: OrderStatus.Pending,
        createdAt: new Date()
    }
}

function updateOrderStatus(order: Order, status: OrderStatus): Order {
    return {
        ...order,
        status
    }
}

function calculateBill(order: Order): [number, BillLine[]] {
    const total = order.items.reduce((acc, cur) => {
        return +acc + +(cur.price * cur.quantity)
    }, 0)

    const itemsBillLine: BillLine[] = order.items.flatMap((item) => {
        return Array(item.quantity).fill([order.tableNumber, item.name, item.price])
    })

    return [total, itemsBillLine]
}


function handleKitchenEvent(event: KitchenEvent): void {
    switch (event.kind) {
        case "order_received":
            console.log(`Order received for table ${event.order.tableNumber}`)
            return
        
        case "item_ready":
            console.log(`${event.itemName} is ready for order ${event.orderId}`)
            return
        
        case "order_cancelled":
            console.log(`Order ${event.orderId} cancelled — ${event.message}`)
            return
        
        default:
            const _event: never = event 
            return _event
    }
}


// test output

const pasta: MenuItem = {
    id: "m1", name: "Pasta", price: 85,
    category: MenuCategory.Main, isAvailable: true
}
const orderItem: OrderItem = { ...pasta, quantity: 2, specialNotes: "no onion" }

const order = placeOrder(5, [orderItem])
console.log(order)
// { id: "...", tableNumber: 5, items: [...], status: OrderStatus.Pending, createdAt: Date }

const updateResult = updateOrderStatus(order, OrderStatus.Preparing)
console.log(updateResult)
// { ...order, status: OrderStatus.Preparing }

const billResult = calculateBill(order)
console.log(billResult)
// [170, [[5, "Pasta", 85], [5, "Pasta", 85]]]
// total = 170, one line per quantity unit

handleKitchenEvent({ kind: "order_received", order })
// logs: "Order received for table 5"

handleKitchenEvent({ kind: "item_ready", orderId: order.id, itemName: "Pasta" })
// logs: "Pasta is ready for order ..."