var BloodType;
(function (BloodType) {
    BloodType["A_POS"] = "A+";
    BloodType["A_NEG"] = "A-";
    BloodType["B_POS"] = "B+";
    BloodType["B_NEG"] = "B-";
    BloodType["O_POS"] = "O+";
    BloodType["O_NEG"] = "O-";
    BloodType["AB_POS"] = "AB+";
    BloodType["AB_NEG"] = "AB-";
})(BloodType || (BloodType = {}));
var PatientStatus;
(function (PatientStatus) {
    PatientStatus["Admitted"] = "admitted";
    PatientStatus["OutPatient"] = "outPatient";
    PatientStatus["Discharged"] = "discharged";
    PatientStatus["Emergency"] = "emergency";
})(PatientStatus || (PatientStatus = {}));
function updateStatus(patient, newStatus) {
    switch (newStatus) {
        case PatientStatus.Admitted:
            return { ...patient, status: newStatus };
        case PatientStatus.Discharged:
            return { ...patient, status: newStatus };
        case PatientStatus.Emergency:
            return { ...patient, status: newStatus };
        case PatientStatus.OutPatient:
            return { ...patient, status: newStatus };
        default:
            const _check = newStatus;
            return _check;
    }
}
const patient = {
    id: "p001",
    name: "mohamed fayed",
    age: 34,
    bloodType: BloodType.O_POS,
    status: PatientStatus.Admitted
};
const vitals = [120, 80, 72];
const appt = { kind: "completed", date: new Date(), notes: "Follow-up in 2 weeks" };
const record = {
    ...patient,
    appointments: [appt],
    vitals,
    admittedAt: new Date()
};
const re = updateStatus(patient, PatientStatus.Admitted);
console.log(re);
console.log(record);
export {};
//# sourceMappingURL=index.js.map