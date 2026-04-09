// ======================================================================================

// project 14 ====> fitness tracker

// ======================================================================================


type WorkoutId = string & { readonly __brand: "WorkoutId" }
type UserId = string & { readonly __brand: "UerId" }

enum MuscleGroup {
    Chest = "Chest",
    Back = "Back",
    Legs = "Legs",
    Arms = "Arms",
    Core = "Core",
    Shoulders = "Shoulders",
    Cardio = "Cardio"
}

interface Timestamped {
    createdAt: Date,
    updatedAt: Date
}

interface Exercise {
    id: string,
    name: string,
    muscleGroup: MuscleGroup,
    caloriesPerRep: number
}

interface WorkoutSet {
    exerciseId: string,
    reps: number,
    weightKg: number,
    restSeconds: number
}

interface Workout extends Timestamped {
    readonly id: WorkoutId
    userId: UserId,
    sets: WorkoutSet[],
}

interface Workout {
    durationMinutes: number,
    notes?: string
}

type targetType = "reps" | "workouts" | "duration"

interface Goal extends Timestamped {
    id: string,
    userId: UserId,
    targetType: targetType,
    targetValue: number,
    deadline: Date,
    achieved: boolean
}

type SetResult = [exerciseName: string, reps: number, weightKg: number]

type WorkoutEvent =
    | { kind: "workout_started"; workoutId: WorkoutId; userId: UserId }
    | { kind: "set_completed"; workoutId: WorkoutId; result: SetResult }
    | { kind: "workout_finished"; workoutId: WorkoutId; userId: UserId }
    | { kind: "goal_achieved"; userId: UserId }

function logWorkout(userId: UserId, sets: WorkoutSet[]): Workout {
    const workoutId = crypto.randomUUID() as WorkoutId
    return {
        id: workoutId,
        userId,
        sets,
        createdAt: new Date(),
        updatedAt: new Date(),
        durationMinutes: 10,
    }
}

function calculateCalories(workout: Workout, exercises: Exercise[]): number {
    return workout.sets.reduce((total, set) => {
        const exercise = exercises.find(ex => ex.id === set.exerciseId)
        if (!exercise) return total
        return total + set.reps * exercise.caloriesPerRep
    }, 0)
}

function checkGoalProgress(goal: Goal, workouts: Workout[]): boolean {
    const filteredWorkouts = workouts.filter((workout) => {
        return workout.userId === goal.userId
    })

    const targetValue = goal.targetValue
    switch (goal.targetType) {
        case "reps":

            const currentValue = filteredWorkouts.flatMap((w) => w.sets).reduce((acc, cur) => acc + cur.reps, 0)

            const achieved = currentValue >= targetValue

            goal.achieved = achieved
            return achieved

        case "duration":

            const allDurationValue = filteredWorkouts.reduce((acc, cur) => acc + cur.durationMinutes, 0)

            const achievedDuration = allDurationValue >= targetValue

            goal.achieved = achievedDuration
            return achievedDuration

        case "workouts":

            const achievedWorkout = filteredWorkouts.length >= targetValue

            goal.achieved = achievedWorkout
            return achievedWorkout

        default:
            const _: never = goal.targetType
            return _
    }

}

function handleWorkoutEvent(event: WorkoutEvent): void {
    switch (event.kind) {
        case "workout_started":
            console.log(`workout ${event.workoutId} started for user ${event.userId}`)
            return

        case "set_completed":
            console.log(`Set completed: ${event.result[0]} — ${event.result[1]} reps at ${event.result[2]}kg`)
            return

        case "workout_finished":
            console.log(`Workout ${event.workoutId} finished for user ${event.userId}`)
            return

        case "goal_achieved":
            console.log(`goal achieved fro user ${event.userId}`)
            return

        default:
            const _: never = event
            return _
    }
}


// test output

const pushUp: Exercise = {
    id: "e1", name: "Push Up",
    muscleGroup: MuscleGroup.Chest, caloriesPerRep: 0.5
}

const userId = "u_001" as UserId
const set: WorkoutSet = { exerciseId: "e1", reps: 20, weightKg: 0, restSeconds: 60 }
const set2: WorkoutSet = { exerciseId: "e1", reps: 40, weightKg: 0, restSeconds: 60 }

const workout = logWorkout(userId, [set, set2])
// { id: WorkoutId, userId, sets: [set], durationMinutes: 0, createdAt: Date, updatedAt: Date }

const caloriesResult = calculateCalories(workout, [pushUp])
console.log(caloriesResult)
// 20 reps * 0.5 cal = 10 calories

const result: SetResult = ["Push Up", 20, 0]

handleWorkoutEvent({ kind: "set_completed", workoutId: workout.id, result })
// logs: "Set completed: Push Up — 20 reps at 0kg"

handleWorkoutEvent({ kind: "workout_finished", workoutId: workout.id, userId })
// logs: "Workout finished for user u_001"

const goal: Goal = {
    id: "g_1",
    userId,
    targetType: "reps",
    targetValue: 30,
    deadline: new Date("10-5-2026"),
    achieved: false,
    createdAt: new Date(),
    updatedAt: new Date()
}

const goalProgressResult = checkGoalProgress(goal, [workout])
console.log(goalProgressResult)