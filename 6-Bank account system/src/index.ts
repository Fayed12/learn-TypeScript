// ====================================================================================

// project 6 ===> Model a bank with multiple account types

// ====================================================================================

type Currency = "EGP" | "USD" | "EUR"

type AccountType = "savings" | "checking" | "business"

type OperationResult = { success: true, newBalance: number, message: string } | { success: false, error: string }

type Transaction = [string, "deposit" | "withdraw", number, string]

type Account = {
    id: string;
    owner: string;
    balance: number;
    currency: Currency;
    accountType: AccountType;
    isActive: boolean;
}

// TODO: implement createAccount
function createAccount(owner: string, currency: Currency, accountType: AccountType): Account {
    const newAccount: Account = {
        id: crypto.randomUUID(),
        owner,
        balance: 0,
        currency: currency,
        accountType: accountType,
        isActive: true,
    }
    return newAccount
}

function deposit(account: Account, amount: number): OperationResult {
    if (!account.isActive) {
        return { success: false, error: "your account is inactive!" }
    } else if (amount <= 0) {
        return { success: false, error: "invalid amount!" }
    } else {
        const increaseAccountBalance = account.balance + amount
        account.balance = increaseAccountBalance

        return { success: true, newBalance: increaseAccountBalance, message: `Deposited ${amount} ${account.currency}` }
    }
}

// TODO: implement withdraw — return OperationResult
function withdraw(account: Account, amount: number): OperationResult {
    if (!account.isActive) {
        return { success: false, error: "your account is inactive!" }
    } else if (amount <= 0) {
        return { success: false, error: "invalid amount!" }
    } else if (account.balance < amount) {
        return { success: false, error: "Insufficient funds" }
    } else {
        const decreaseAccountBalance = account.balance - amount
        account.balance = decreaseAccountBalance

        return { success: true, newBalance: decreaseAccountBalance, message: `Withdrew  ${amount} ${account.currency}` }
    }
}

const acc = createAccount("Ahmed", "EGP", "savings")

const r1 = deposit(acc, 5000)
// { success: true, newBalance: 5000, message: "Deposited 5000 EGP" }
console.log(r1)

const r2 = withdraw(acc, 200)
// { success: true, newBalance: 4800, message: "Withdrew 200 EGP" }
console.log(r2)

const r3 = withdraw(acc, 1000)
console.log(r3)
// { success: false, error: "Insufficient funds" }

const log: Transaction = [new Date().toISOString(), "deposit", 5000, acc.id]
// [2024-01-01, "deposit", 5000, "abc123"]
console.log(log)