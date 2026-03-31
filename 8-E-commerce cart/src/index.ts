// =======================================================================================

// project 8 ====> E-commerce cart

// =======================================================================================

// base Product type
type Product = {
    id: string,
    name: string,
    price: number,
    stock: number
}

type DigitalProduct = Product & { downloadUrl: string }

type PhysicalProduct = Product & { weightKg: number, shippingCost: number }

type CartItem = (DigitalProduct | PhysicalProduct) & { quantity: number }

type DiscountCode = "SAVE10" | "SAVE20" | "FREESHIP"

// TODO: implement addToCart
function addToCart(cart: CartItem[], item: DigitalProduct | PhysicalProduct): CartItem[] {
    const isExist = cart.find((c) => c.id === item.id)
    if (isExist) {
        isExist.quantity += 1
        return cart
    }

    cart.push({ ...item, quantity: 1 })

    return cart
}

function removeFromCart(cart: CartItem[], productId: string): CartItem[] {
    const newCartAfterRemoveItem: CartItem[] = cart.filter((c) => {
        return c.id !== productId
    })

    return newCartAfterRemoveItem
}

function getTotal(cart: CartItem[], discount?: DiscountCode): number {
    const freeCartTotalPrice = cart.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity
    }, 0)

    const totalPrice = cart.map((c) => {
        if ("downloadUrl" in c) {
            return c.price * c.quantity
        } else {
            return (c.price + c.shippingCost) * c.quantity
        }
    }).reduce((acc, cur) => acc + cur, 0)


    if (!discount) {
        return totalPrice

    } else {
        switch (discount) {
            case "FREESHIP":
                return freeCartTotalPrice

            case "SAVE10":
                return +(totalPrice * .9).toFixed(1)

            case "SAVE20":
                return +(totalPrice * .8).toFixed(1)

            default:
                const _: never = discount
                return _
        }
    }
}

function parseProductFromAPI(raw: unknown): DigitalProduct | PhysicalProduct {

    const result = raw as DigitalProduct | PhysicalProduct

    return result
}


const ebook: DigitalProduct = {
    id: "d1", name: "TS Handbook", price: 29,
    stock: 999, downloadUrl: "https://example.com/ts.pdf"
}
const mug: PhysicalProduct = {
    id: "p1", name: "Dev Mug", price: 15,
    stock: 50, weightKg: 0.4, shippingCost: 5
}

let cart: CartItem[] = []
cart = addToCart(cart, ebook)
cart = addToCart(cart, mug)

console.log(cart)
// [ebook item, mug item]

const re = removeFromCart(cart, "d1")
cart = re
console.log(cart)


const r1 = getTotal(cart)              // 49  (29 + 15 + 5 shipping)
const r2 = getTotal(cart, "SAVE10")    // 44.1  (10% off)
const r3 = getTotal(cart, "SAVE20")    // 39.2  (20% off)
const r4 = getTotal(cart, "FREESHIP")  // 44  (no shipping cost)

console.log(r1)
console.log(r2)
console.log(r3)
console.log(r4)