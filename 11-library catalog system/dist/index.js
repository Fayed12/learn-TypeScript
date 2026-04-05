var BookStatus;
(function (BookStatus) {
    BookStatus["Available"] = "Available";
    BookStatus["Borrowed"] = "Borrowed";
    BookStatus["Reserved"] = "Reserved";
    BookStatus["Lost"] = "Lost";
})(BookStatus || (BookStatus = {}));
function borrowBook(member, book) {
    if (!book.isAvailable) {
        return { success: false, error: "Book is not available" };
    }
    book.isAvailable = false;
    book.status = BookStatus.Borrowed;
    return { success: true, record: { memberId: member.id, bookId: book.id, dueDate: new Date("4-10-2026"), borrowedAt: new Date() } };
}
function returnBook(record) {
    book.isAvailable = true;
    book.status = BookStatus.Available;
    return { ...record, returnedAt: new Date() };
}
function getOverdueBooks(records) {
    const results = records.filter((record) => {
        return (record.dueDate < new Date()) && record.returnedAt === undefined;
    });
    return results;
}
const book = {
    id: "b1", title: "Clean Code", author: "Robert Martin",
    isbn: "978-0132350884", isAvailable: true, status: BookStatus.Available
};
const member = {
    id: "m1", name: "Ahmed", email: "ahmed@mail.com",
    memberSince: new Date("2023-01-01")
};
const result = borrowBook(member, book);
if (result.success) {
    let returnResult = returnBook(result.record);
    console.log(returnResult);
}
else {
    console.log(result.error);
}
borrowBook(member, { ...book, isAvailable: false });
console.log(result);
const receipt = ["m1", "b1", new Date()];
console.log(receipt);
const records = [
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
];
const overdueResult = getOverdueBooks(records);
console.log(overdueResult);
export {};
//# sourceMappingURL=index.js.map