// =========================================================================================

// project 12 ====> Jop board

// =========================================================================================

interface Entity {
    id: string,
    createdAt: Date
    updatedAt: Date
}

interface Company extends Entity {
    name: string,
    industry: string,
    website: string
}

interface JobPost extends Entity {
    title: string,
    companyId: string,
    salaryMin: number,
    salaryMax: number,
    jobType: JobType,
    remote: boolean,
    skills: string[]
}

interface Candidate extends Entity {
    name: string,
    email: string,
    skills: string[],
    yearsOfExp: number
}

enum JobType {
    FullTime = "FullTime",
    PartTime = "PartTime",
    Contract = "Contract",
    Internship = "Internship"
}

type ApplicationStatus = "applied" | "screening" | "interview" | "offer" | "rejected"

type Application = {
    candidateId: string
    jobId: string
    status: ApplicationStatus
    appliedAt: Date
}

type FilterResult =
    | { success: true; jobs: JobPost[] }
    | { success: false; error: string }

function applyToJob(candidate: Candidate, job: JobPost): Application {
    return { candidateId: candidate.id, jobId: job.id, status: "applied", appliedAt: new Date() }
}

function validateFilters(
    jobs: JobPost[],
    skill: string,
    salary: number,
    jobTypeUser: JobType,
    remote: boolean
): string[] {

    const errors: string[] = [];

    if (!jobs.some(job => job.skills.includes(skill))) {
        errors.push("Skill does not match any job");
    }

    if (!jobs.some(job => salary >= job.salaryMin && salary <= job.salaryMax)) {
        errors.push("Salary is not suitable for available jobs");
    }

    if (!jobs.some(job => job.jobType === jobTypeUser)) {
        errors.push("Job type not available");
    }

    if (!jobs.some(job => job.remote === remote)) {
        errors.push("Remote option not available");
    }

    return errors;
}

function filterBySkill(jobs: JobPost[], skill: string, salary: number, jobTypeUser: JobType, remote: boolean): FilterResult {

    const validationErrors = validateFilters(jobs, skill, salary, jobTypeUser, remote);

    if (validationErrors.length > 0) {
        return { success: false, error: validationErrors.join(" | ") };
    }

    const FilteredJobs = jobs.filter(job =>
        job.skills.includes(skill) &&
        salary >= job.salaryMin &&
        job.salaryMax >= salary &&
        job.jobType === jobTypeUser &&
        job.remote === remote
    );
    return { success: true, jobs: FilteredJobs }

}

function getMatchingJobs(candidate: Candidate, jobs: JobPost[]): FilterResult {
    const FilteredJobs: JobPost[] = []
    jobs.forEach((job) => {
        const re = job.skills.every((sk) => (candidate.skills.includes(sk.toLowerCase())))

        if (re) {
            FilteredJobs.push(job)
        }
    })

    if (FilteredJobs.length == 0) {
        return { success: false, error: "no matching jobs for you" }
    } else {
        return { success: true, jobs: FilteredJobs }
    }
}


// test output

const company: Company = {
    id: "c1", createdAt: new Date(), updatedAt: new Date(),
    name: "TechCorp Egypt", industry: "Software", website: "techcorp.eg"
}

const job: JobPost = {
    id: "j1", createdAt: new Date(), updatedAt: new Date(),
    title: "React Developer", companyId: "c1",
    salaryMin: 15000, salaryMax: 25000,
    jobType: JobType.FullTime, remote: true,
    skills: ["React", "TypeScript", "CSS"]
}

const candidate: Candidate = {
    id: "u1", createdAt: new Date(), updatedAt: new Date(),
    name: "Mo", email: "mo@mail.com",
    skills: ["React", "TypeScript", "CSS", "node.js"],
    yearsOfExp: 2
}

const jobs: JobPost[] = [
    {
        id: "j1",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "React Developer",
        companyId: "c1",
        salaryMin: 15000,
        salaryMax: 25000,
        jobType: JobType.FullTime,
        remote: true,
        skills: ["React", "TypeScript", "CSS"]
    },
    {
        id: "j2",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "Backend Developer",
        companyId: "c2",
        salaryMin: 18000,
        salaryMax: 30000,
        jobType: JobType.Contract,
        remote: false,
        skills: ["Node.js", "Express", "MongoDB"]
    },
    {
        id: "j3",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "Frontend Developer",
        companyId: "c3",
        salaryMin: 12000,
        salaryMax: 20000,
        jobType: JobType.PartTime,
        remote: true,
        skills: ["HTML", "CSS", "JavaScript", "TypeScript"]
    },
    {
        id: "j4",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "Full Stack Developer",
        companyId: "c4",
        salaryMin: 20000,
        salaryMax: 35000,
        jobType: JobType.FullTime,
        remote: true,
        skills: ["React", "Node.js", "PostgreSQL", "TypeScript"]
    },
    {
        id: "j5",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "UI/UX Designer",
        companyId: "c5",
        salaryMin: 10000,
        salaryMax: 18000,
        jobType: JobType.Internship,
        remote: false,
        skills: ["Figma", "Adobe XD", "Design Systems"]
    }
];

const applyResult = applyToJob(candidate, job)
console.log(applyResult)
// { candidateId: "u1", jobId: "j1", status: "applied", appliedAt: Date }

const filterResult = filterBySkill(jobs, "js", 15000, JobType.FullTime, true)
console.log(filterResult)
// [job] — jobs that require TypeScript

const matchingResult = getMatchingJobs(candidate, jobs)
console.log(matchingResult)
// [job] — candidate has React, TypeScript, CSS — all required
