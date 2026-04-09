var UserRole;
(function (UserRole) {
    UserRole["Owner"] = "Owner";
    UserRole["Admin"] = "Admin";
    UserRole["Editor"] = "Editor";
    UserRole["Viewer"] = "Viewer";
})(UserRole || (UserRole = {}));
function inviteUser(org, currentUsers, plan, email, role) {
    if (currentUsers.length >= plan.maxUsers) {
        return {
            success: false,
            error: `Plan limit reached: max ${plan.maxUsers} users on ${plan.tier} plan`
        };
    }
    const newUser = {
        id: crypto.randomUUID(),
        orgId: org.id,
        email,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: org.createdBy
    };
    return { success: true, user: newUser };
}
function upgradePlan(org, currentUsers, newPlan) {
    if (currentUsers.length > newPlan.maxUsers) {
        return { error: `Too many users (${currentUsers.length}) for plan limit (${newPlan.maxUsers})` };
    }
    return {
        ...org,
        plan: newPlan.tier,
        updatedAt: new Date()
    };
}
function handlePlatformEvent(event) {
    switch (event.kind) {
        case "org_created":
            console.log(`Organization ${event.org.name} created`);
            break;
        case "user_invited":
            console.log(`User ${event.user.email} invited to org ${event.orgId}`);
            break;
        case "user_removed":
            console.log(`User ${event.userId} removed from org ${event.orgId}`);
            break;
        case "plan_upgraded":
            console.log(`${event.orgId} upgraded to ${event.newPlan.tier} plan`);
            break;
        case "plan_downgraded":
            console.log(`${event.orgId} downgraded to ${event.newPlan.tier} plan`);
            break;
        case "org_suspended":
            console.log(`Organization ${event.orgId} suspended`);
            break;
        default:
            const _exhaustive = event;
            return _exhaustive;
    }
}
const orgId = "org_001";
const userId = "u_001";
const org = {
    id: orgId, name: "TechCorp", plan: "starter", isActive: true,
    createdAt: new Date(), updatedAt: new Date(), createdBy: userId,
    metadata: { region: "EG", timezone: "Africa/Cairo" }
};
const plan = {
    id: "p1", name: "Starter", tier: "starter",
    maxUsers: 5, maxStorage: 10, pricePerMonth: 29,
    createdAt: new Date(), updatedAt: new Date(), createdBy: userId
};
const users = [];
inviteUser(org, users, plan, "sara@mail.com", UserRole.Editor);
const fullUsers = Array(5).fill(users[0]);
inviteUser(org, fullUsers, plan, "extra@mail.com", UserRole.Viewer);
handlePlatformEvent({ kind: "org_created", org });
handlePlatformEvent({ kind: "plan_upgraded", orgId, newPlan: plan });
export {};
//# sourceMappingURL=index.js.map