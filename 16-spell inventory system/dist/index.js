var SpellSchool;
(function (SpellSchool) {
    SpellSchool["Fire"] = "Fire";
    SpellSchool["Ice"] = "Ice";
    SpellSchool["Arcane"] = "Arcane";
    SpellSchool["Nature"] = "Nature";
})(SpellSchool || (SpellSchool = {}));
function toManaCost(n) {
    if (n >= 0) {
        return n;
    }
    else {
        return -n;
    }
}
function castSpell(spell, currentMana) {
    if (currentMana >= spell.manaCost) {
        return { kind: "success", damageDealt: spell.damageRoll, remainingMana: currentMana - spell.manaCost };
    }
    else {
        return { kind: "failure", reason: "insufficient_mana" };
    }
}
function describeSchool(school) {
    switch (school) {
        case SpellSchool.Fire:
            return "Fire magic burns enemies with intense heat";
        case SpellSchool.Ice:
            return "Ice magic slows and freezes enemies";
        case SpellSchool.Arcane:
            return "Arcane magic bends reality itself";
        case SpellSchool.Nature:
            return "Nature magic heals and empowers life";
        default:
            const _exhaustive = school;
            return _exhaustive;
    }
}
function addSpellToSlot(spellBook, slot, spell) {
    const newSlot = { index: slot.index, spell };
    spellBook.slots[slot.index] = newSlot;
    return spellBook;
}
const fireball = {
    id: "spell_001",
    name: "Fireball",
    school: SpellSchool.Fire,
    manaCost: toManaCost(18),
    components: [true, true],
    description: "Throws a blazing fireball that explodes on impact",
    damageRoll: 45,
    lastCastAt: 0
};
const blizzard = {
    id: "spell_002",
    name: "Blizzard",
    school: SpellSchool.Ice,
    manaCost: toManaCost(25),
    components: [true, true],
    description: "Summons a freezing storm of ice shards",
    damageRoll: 20,
    lastCastAt: 0
};
const heal = {
    id: "spell_003",
    name: "Nature Heal",
    school: SpellSchool.Nature,
    manaCost: toManaCost(12),
    components: [true, false],
    description: "Restores health using nature energy",
    buffTarget: "self",
    lastCastAt: 0
};
const spellBook = {
    slots: [
        { index: 0, spell: fireball },
        { index: 1, spell: blizzard },
        { index: 2 }
    ]
};
console.log(castSpell(fireball, 30));
console.log(castSpell(blizzard, 5));
console.log(describeSchool(SpellSchool.Arcane));
console.log(addSpellToSlot(spellBook, { index: 2 }, heal));
spellBook.slots[0];
export {};
//# sourceMappingURL=index.js.map