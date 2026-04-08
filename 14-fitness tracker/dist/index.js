var MuscleGroup;
(function (MuscleGroup) {
    MuscleGroup["Chest"] = "Chest";
    MuscleGroup["Back"] = "Back";
    MuscleGroup["Legs"] = "Legs";
    MuscleGroup["Arms"] = "Arms";
    MuscleGroup["Core"] = "Core";
    MuscleGroup["Shoulders"] = "Shoulders";
    MuscleGroup["Cardio"] = "Cardio";
})(MuscleGroup || (MuscleGroup = {}));
function logWorkout(userId, sets) {
    const workoutId = crypto.randomUUID();
    return {
        id: workoutId,
        userId,
        sets,
        createdAt: new Date(),
        updatedAt: new Date(),
        durationMinutes: 10,
    };
}
function calculateCalories(workout, exercises) {
    return workout.sets.reduce((total, set) => {
        const exercise = exercises.find(ex => ex.id === set.exerciseId);
        if (!exercise)
            return total;
        return total + set.reps * exercise.caloriesPerRep;
    }, 0);
}
function checkGoalProgress(goal, workouts) {
    const filteredWorkouts = workouts.filter((workout) => {
        return workout.userId === goal.userId;
    });
    const targetValue = goal.targetValue;
    switch (goal.targetType) {
        case "reps":
            const currentValue = filteredWorkouts.flatMap((w) => w.sets).reduce((acc, cur) => acc + cur.reps, 0);
            const achieved = currentValue >= targetValue;
            goal.achieved = achieved;
            return achieved;
        case "duration":
            const allDurationValue = filteredWorkouts.reduce((acc, cur) => acc + cur.durationMinutes, 0);
            const achievedDuration = allDurationValue >= targetValue;
            goal.achieved = achievedDuration;
            return achievedDuration;
        case "workouts":
            const achievedWorkout = filteredWorkouts.length >= targetValue;
            goal.achieved = achievedWorkout;
            return achievedWorkout;
        default:
            const _ = goal.targetType;
            return _;
    }
}
function handleWorkoutEvent(event) {
    switch (event.kind) {
        case "workout_started":
            console.log(`workout ${event.workoutId} started for user ${event.userId}`);
            return;
        case "set_completed":
            console.log(`Set completed: ${event.result[0]} — ${event.result[1]} reps at ${event.result[2]}kg`);
            return;
        case "workout_finished":
            console.log(`Workout ${event.workoutId} finished for user ${event.userId}`);
            return;
        case "goal_achieved":
            console.log(`goal achieved fro user ${event.userId}`);
            return;
        default:
            const _ = event;
            return _;
    }
}
const pushUp = {
    id: "e1", name: "Push Up",
    muscleGroup: MuscleGroup.Chest, caloriesPerRep: 0.5
};
const userId = "u_001";
const set = { exerciseId: "e1", reps: 20, weightKg: 0, restSeconds: 60 };
const set2 = { exerciseId: "e1", reps: 40, weightKg: 0, restSeconds: 60 };
const workout = logWorkout(userId, [set, set2]);
const caloriesResult = calculateCalories(workout, [pushUp]);
console.log(caloriesResult);
const result = ["Push Up", 20, 0];
handleWorkoutEvent({ kind: "set_completed", workoutId: workout.id, result });
handleWorkoutEvent({ kind: "workout_finished", workoutId: workout.id, userId });
const goal = {
    id: "g_1",
    userId,
    targetType: "reps",
    targetValue: 30,
    deadline: new Date("10-5-2026"),
    achieved: false,
    createdAt: new Date(),
    updatedAt: new Date()
};
const goalProgressResult = checkGoalProgress(goal, [workout]);
console.log(goalProgressResult);
export {};
//# sourceMappingURL=index.js.map