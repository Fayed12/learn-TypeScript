function createAccount(owner, currency, accountType) {
    const newAccount = {
        id: crypto.randomUUID(),
        owner,
        balance: 0,
        currency: currency,
        accountType: accountType,
        isActive: true,
    };
    return newAccount;
}
function deposit(account, amount) {
    if (!account.isActive) {
        return { success: false, error: "your account is inactive!" };
    }
    else if (amount <= 0) {
        return { success: false, error: "invalid amount!" };
    }
    else {
        const increaseAccountBalance = account.balance + amount;
        account.balance = increaseAccountBalance;
        return { success: true, newBalance: increaseAccountBalance, message: `Deposited ${amount} ${account.currency}` };
    }
}
function withdraw(account, amount) {
    if (!account.isActive) {
        return { success: false, error: "your account is inactive!" };
    }
    else if (amount <= 0) {
        return { success: false, error: "invalid amount!" };
    }
    else if (account.balance < amount) {
        return { success: false, error: "Insufficient funds" };
    }
    else {
        const decreaseAccountBalance = account.balance - amount;
        account.balance = decreaseAccountBalance;
        return { success: true, newBalance: decreaseAccountBalance, message: `Withdrew  ${amount} ${account.currency}` };
    }
}
const acc = createAccount("Ahmed", "EGP", "savings");
const r1 = deposit(acc, 5000);
console.log(r1);
const r2 = withdraw(acc, 200);
console.log(r2);
const r3 = withdraw(acc, 1000);
console.log(r3);
const log = [new Date().toISOString(), "deposit", 5000, acc.id];
console.log(log);
export {};
//# sourceMappingURL=index.js.map