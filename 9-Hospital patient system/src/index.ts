// ======================================================================================

// project 9 =====> Hospital patient system

// ======================================================================================

enum BloodType {
    A_POS = "A+",
    A_NEG = "A-",
    B_POS = "B+",
    B_NEG = "B-",
    O_POS = "O+",
    O_NEG = "O-",
    AB_POS = "AB+",
    AB_NEG = "AB-"
}

enum PatientStatus {
    Admitted = "admitted",
    OutPatient = "outPatient",
    Discharged = "discharged",
    Emergency = "emergency"
}

// TODO: VitalSigns tuple [systolic, diastolic, heartRate]
type VitalSigns = [systolic: number, diastolic: number, heartRate: number]

type Patient = {
    readonly id: string,
    name: string
    age: number
    readonly bloodType: BloodType
    status: PatientStatus
}

type Appointment =
    | { kind: "scheduled"; date: Date }
    | { kind: "completed"; date: Date; notes: string }
    | { kind: "cancelled"; reason: string }

type RecordDetails = {
    appointments: Appointment[]
    vitals: VitalSigns
    admittedAt: Date
}

type MedicalRecord = Patient & RecordDetails

// TODO: updateStatus with exhaustive never check
function updateStatus(patient: Patient, newStatus: PatientStatus): Patient {
    switch (newStatus) {
        case PatientStatus.Admitted:
            return { ...patient, status: newStatus }

        case PatientStatus.Discharged:
            return { ...patient, status: newStatus }

        case PatientStatus.Emergency:
            return { ...patient, status: newStatus }

        case PatientStatus.OutPatient:
            return { ...patient, status: newStatus }

        default:
            const _check: never = newStatus
            return _check
    }
}

const patient: Patient = {
    id: "p001",
    name: "mohamed fayed",
    age: 34,
    bloodType: BloodType.O_POS,
    status: PatientStatus.Admitted
}

const vitals: VitalSigns = [120, 80, 72]

const appt: Appointment = { kind: "completed", date: new Date(), notes: "Follow-up in 2 weeks" }

const record: MedicalRecord = {
    ...patient,
    appointments: [appt],
    vitals,
    admittedAt: new Date()
}

const re = updateStatus(patient, PatientStatus.Admitted)
console.log(re)
console.log(record)
// { ...patient, status: PatientStatus.Discharged }