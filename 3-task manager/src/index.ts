// ========================================================================================================================

// project 3 ====> task manager

// ========================================================================================================================

enum Status { Todo = "TODO", InProgress = "IN_PROGRESS", Done = "DONE" }

enum Priority { Low = "LOW", Medium = "MEDIUM", High = "HIGH" }

type Task = {
    title: string
    status: Status
    priority: Priority
}

let tasks: Task[] = []

function createTask(title: string, priority: Priority): Task {
    const newTask: Task = { title, status: Status.Todo, priority }
    tasks.push(newTask)
    return newTask
}

function updateStatus(task: Task, newStatus: Status): Task {
    return { ...task, status: newStatus }
}

function filterByPriority(tasks: Task[], priority: Priority): Task[] {
    // switch (priority) {
    //     case Priority.Low:
    //         const lowTasks = tasks.filter((task) => {
    //             return task.priority === Priority.Low
    //         })
    //         return lowTasks

    //     case Priority.Medium:
    //         const mediumTasks = tasks.filter((task) => {
    //             return task.priority === Priority.Medium
    //         })
    //         return mediumTasks

    //     case Priority.High:
    //         const highTasks = tasks.filter((task) => {
    //             return task.priority === Priority.High
    //         })
    //         return highTasks

    //     default:
    //         const _: never = priority
    //         return _
    // }
    return tasks.filter(task => task.priority === priority)
}

const t: Task = createTask("Fix bug", Priority.High)
console.log(t)
const updated = updateStatus(t, Status.Done)
console.log(updated)
