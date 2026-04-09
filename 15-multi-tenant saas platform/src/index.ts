// ===================================================================================

// project 15 ====> SaaS platform

// ===================================================================================

type OrgId = string & { readonly __brand: "OrgId" }
type UserId = string & { readonly __brand: "UserId" }
type PlanId = string & { readonly __brand: "PlanId" }

enum UserRole {
    Owner = "Owner",
    Admin = "Admin",
    Editor = "Editor",
    Viewer = "Viewer"
}

type PlanTier = "free" | "starter" | "pro" | "enterprise"

interface Auditable {
    createdBy: UserId,
    createdAt: Date,
    updatedAt: Date,
}

interface Organization extends Auditable {
    readonly id: OrgId,
    plan: PlanTier,
    name: string,
    isActive: boolean
}

interface Organization {
    metadata: { region: string, timezone: string }
}

interface OrgUser extends Auditable {
    readonly id: UserId
    readonly orgId: OrgId
    email: string,
    role: UserRole,
    lastLoginAt?: Date
}

interface Plan extends Auditable {
    id: PlanId,
    name: string,
    maxUsers: number,
    maxStorage: number,
    pricePerMonth: number,
    tier: PlanTier
}

type InviteResult =
    | { success: true; user: OrgUser }
    | { success: false; error: string }

type PlatformEvent =
    | { kind: "org_created"; org: Organization }
    | { kind: "user_invited"; orgId: OrgId; user: OrgUser }
    | { kind: "user_removed"; orgId: OrgId; userId: UserId }
    | { kind: "plan_upgraded"; orgId: OrgId; newPlan: Plan }
    | { kind: "plan_downgraded"; orgId: OrgId; newPlan: Plan }
    | { kind: "org_suspended"; orgId: OrgId }

function inviteUser(org: Organization, currentUsers: OrgUser[], plan: Plan, email: string, role: UserRole): InviteResult {
    if (currentUsers.length >= plan.maxUsers) {
        return {
            success: false,
            error: `Plan limit reached: max ${plan.maxUsers} users on ${plan.tier} plan`
        }
    }

    const newUser: OrgUser = {
        id: crypto.randomUUID() as UserId,
        orgId: org.id,
        email,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: org.createdBy
    }

    return { success: true, user: newUser }
}

function upgradePlan(org: Organization, currentUsers: OrgUser[], newPlan: Plan): Organization | { error: string } {
    if (currentUsers.length > newPlan.maxUsers) {
        return { error: `Too many users (${currentUsers.length}) for plan limit (${newPlan.maxUsers})` }
    }

    return {
        ...org,
        plan: newPlan.tier,
        updatedAt: new Date()
    }
}

function handlePlatformEvent(event: PlatformEvent): void {
    switch (event.kind) {

        case "org_created":
            console.log(`Organization ${event.org.name} created`)
            break

        case "user_invited":
            console.log(`User ${event.user.email} invited to org ${event.orgId}`)
            break

        case "user_removed":
            console.log(`User ${event.userId} removed from org ${event.orgId}`)
            break

        case "plan_upgraded":
            console.log(`${event.orgId} upgraded to ${event.newPlan.tier} plan`)
            break

        case "plan_downgraded":
            console.log(`${event.orgId} downgraded to ${event.newPlan.tier} plan`)
            break

        case "org_suspended":
            console.log(`Organization ${event.orgId} suspended`)
            break

        default:
            const _exhaustive: never = event
            return _exhaustive
    }
}

// test output

const orgId = "org_001" as OrgId
const userId = "u_001" as UserId

const org: Organization = {
    id: orgId, name: "TechCorp", plan: "starter", isActive: true,
    createdAt: new Date(), updatedAt: new Date(), createdBy: userId,
    metadata: { region: "EG", timezone: "Africa/Cairo" }  // from interface merging
}

const plan: Plan = {
    id: "p1" as PlanId, name: "Starter", tier: "starter",
    maxUsers: 5, maxStorage: 10, pricePerMonth: 29,
    createdAt: new Date(), updatedAt: new Date(), createdBy: userId
}

const users: OrgUser[] = []  // empty org

inviteUser(org, users, plan, "sara@mail.com", UserRole.Editor)
// { success: true, user: { id: UserId, orgId, email: "sara@mail.com", role: UserRole.Editor, ... } }

const fullUsers = Array(5).fill(users[0])  // 5 users = plan limit
inviteUser(org, fullUsers, plan, "extra@mail.com", UserRole.Viewer)
// { success: false, error: "Plan limit reached: max 5 users on starter plan" }

handlePlatformEvent({ kind: "org_created", org })
// logs: "Organization TechCorp created"

handlePlatformEvent({ kind: "plan_upgraded", orgId, newPlan: plan })
// logs: "org_001 upgraded to starter plan"