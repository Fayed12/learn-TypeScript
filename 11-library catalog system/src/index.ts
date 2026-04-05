// ========================================================================

// project 11 ====> a library system

// ========================================================================

interface Book {
    id: string,
    title: string,
    author: string,
    isbn: string,
    isAvailable: boolean
    status: BookStatus
}

interface Member {
    id: string,
    name: string,
    email: string,
    memberSince: Date
}

interface LibraryTransaction {
    memberId: string
    bookId: string
}

interface BorrowRecord extends LibraryTransaction {
    borrowedAt: Date,
    dueDate: Date,
    returnedAt?: Date
}

enum BookStatus {
    Available = "Available",
    Borrowed = "Borrowed",
    Reserved = "Reserved",
    Lost = "Lost"
}

type BorrowReceipt = [string, string, Date]

type BorrowResult = { success: true, record: BorrowRecord } | { success: false, error: string }

function borrowBook(member: Member, book: Book): BorrowResult {
    if (!book.isAvailable) {
        return { success: false, error: "Book is not available" }
    }

    book.isAvailable = false
    book.status = BookStatus.Borrowed

    return { success: true, record: { memberId: member.id, bookId: book.id, dueDate: new Date("4-10-2026"), borrowedAt: new Date() } }
}

function returnBook(record: BorrowRecord): BorrowRecord {
    book.isAvailable = true
    book.status = BookStatus.Available
    return { ...record, returnedAt: new Date() }
}

// TODO: implement getOverdueBooks
function getOverdueBooks(records: BorrowRecord[]): BorrowRecord[] {
    const results = records.filter((record) => {
        return (record.dueDate < new Date()) && record.returnedAt === undefined
    })

    return results
}


// test code

const book: Book = {
    id: "b1", title: "Clean Code", author: "Robert Martin",
    isbn: "978-0132350884", isAvailable: true, status: BookStatus.Available
}
const member: Member = {
    id: "m1", name: "Ahmed", email: "ahmed@mail.com",
    memberSince: new Date("2023-01-01")
}

const result = borrowBook(member, book)
// { success: true, record: { memberId: "m1", bookId: "b1", borrowedAt: Date, dueDate: Date } }

if (result.success) {
    let returnResult = returnBook(result.record);
    console.log(returnResult)
} else {
    console.log(result.error);
}

borrowBook(member, { ...book, isAvailable: false })
// { success: false, error: "Book is not available" }
console.log(result)

const receipt: BorrowReceipt = ["m1", "b1", new Date()]
console.log(receipt)
// ["m1", "b1", 2024-01-15T...]

const records: BorrowRecord[] = [
    {
        memberId: "m1",
        bookId: "b1",
        borrowedAt: new Date("2024-01-01"),
        dueDate: new Date("2024-01-15"),
    },
    {
        memberId: "m2",
        bookId: "b2",
        borrowedAt: new Date("2024-01-01"),
        dueDate: new Date("2099-01-01"),
    }
]
const overdueResult = getOverdueBooks(records)
console.log(overdueResult)
// returns records where dueDate < today and returnedAt is undefined