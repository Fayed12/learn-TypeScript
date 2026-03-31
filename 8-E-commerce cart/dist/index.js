function addToCart(cart, item) {
    const isExist = cart.find((c) => c.id === item.id);
    if (isExist) {
        isExist.quantity += 1;
        return cart;
    }
    cart.push({ ...item, quantity: 1 });
    return cart;
}
function removeFromCart(cart, productId) {
    const newCartAfterRemoveItem = cart.filter((c) => {
        return c.id !== productId;
    });
    return newCartAfterRemoveItem;
}
function getTotal(cart, discount) {
    const freeCartTotalPrice = cart.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
    }, 0);
    const totalPrice = cart.map((c) => {
        if ("downloadUrl" in c) {
            return c.price * c.quantity;
        }
        else {
            return (c.price + c.shippingCost) * c.quantity;
        }
    }).reduce((acc, cur) => acc + cur, 0);
    if (!discount) {
        return totalPrice;
    }
    else {
        switch (discount) {
            case "FREESHIP":
                return freeCartTotalPrice;
            case "SAVE10":
                return +(totalPrice * .9).toFixed(1);
            case "SAVE20":
                return +(totalPrice * .8).toFixed(1);
            default:
                const _ = discount;
                return _;
        }
    }
}
function parseProductFromAPI(raw) {
    const result = raw;
    return result;
}
const ebook = {
    id: "d1", name: "TS Handbook", price: 29,
    stock: 999, downloadUrl: "https://example.com/ts.pdf"
};
const mug = {
    id: "p1", name: "Dev Mug", price: 15,
    stock: 50, weightKg: 0.4, shippingCost: 5
};
let cart = [];
cart = addToCart(cart, ebook);
cart = addToCart(cart, mug);
console.log(cart);
const re = removeFromCart(cart, "d1");
cart = re;
console.log(cart);
const r1 = getTotal(cart);
const r2 = getTotal(cart, "SAVE10");
const r3 = getTotal(cart, "SAVE20");
const r4 = getTotal(cart, "FREESHIP");
console.log(r1);
console.log(r2);
console.log(r3);
console.log(r4);
export {};
//# sourceMappingURL=index.js.map