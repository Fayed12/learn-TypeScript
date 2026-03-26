var Status;
(function (Status) {
    Status["Todo"] = "TODO";
    Status["InProgress"] = "IN_PROGRESS";
    Status["Done"] = "DONE";
})(Status || (Status = {}));
var Priority;
(function (Priority) {
    Priority["Low"] = "LOW";
    Priority["Medium"] = "MEDIUM";
    Priority["High"] = "HIGH";
})(Priority || (Priority = {}));
let tasks = [];
function createTask(title, priority) {
    const newTask = { title, status: Status.Todo, priority };
    tasks.push(newTask);
    return newTask;
}
function updateStatus(task, newStatus) {
    return { ...task, status: newStatus };
}
function filterByPriority(tasks, priority) {
    return tasks.filter(task => task.priority === priority);
}
const t = createTask("Fix bug", Priority.High);
console.log(t);
const updated = updateStatus(t, Status.Done);
console.log(updated);
export {};
//# sourceMappingURL=index.js.map