// ====================================================================================

// project 16 =====>  spell inventory system

// ====================================================================================


enum SpellSchool {
    Fire = "Fire",
    Ice = "Ice",
    Arcane = "Arcane",
    Nature = "Nature"
}

type ManaCost = number & { readonly __brand: "ManaCost" };

function toManaCost(n: number): ManaCost {
    if (n >= 0) {
        return n as ManaCost
    } else {
        return -n as ManaCost
    }
}

type CastingComponents = [verbal: boolean, somatic: boolean];

interface Spell {
    readonly id: string;
    name: string;
    school: SpellSchool;
    manaCost: ManaCost;
    components: CastingComponents;
    readonly description: string;
}

interface AttackSpell extends Spell {
    damageRoll: number,
}

interface UtilitySpell extends Spell {
    buffTarget: string
}


type CastResult =
    | { kind: "success"; damageDealt: number; remainingMana: number }
    | { kind: "failure"; reason: "insufficient_mana" | "silenced" | "on_coolDown" };

interface Spell { lastCastAt?: number; }

interface Slot {
    index: number,
    spell?: Spell
}

interface SpellBook {
    slots: Slot[]
}

function castSpell(spell: AttackSpell, currentMana: number): CastResult {
    if (currentMana >= spell.manaCost) {
        return { kind: "success", damageDealt: spell.damageRoll, remainingMana: currentMana - spell.manaCost }
    } else {
        return { kind: "failure", reason: "insufficient_mana" }
    }
}

function describeSchool(school: SpellSchool): string {
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
            const _exhaustive: never = school;
            return _exhaustive;
    }
}

function addSpellToSlot(spellBook: SpellBook, slot: Slot, spell: Spell): SpellBook {
    const newSlot: Slot = { index: slot.index, spell }

    spellBook.slots[slot.index] = newSlot

    return spellBook
}


// test output

const fireball: AttackSpell = {
    id: "spell_001",
    name: "Fireball",
    school: SpellSchool.Fire,
    manaCost: toManaCost(18),
    components: [true, true],
    description: "Throws a blazing fireball that explodes on impact",
    damageRoll: 45,
    lastCastAt: 0
}

const blizzard: AttackSpell = {
    id: "spell_002",
    name: "Blizzard",
    school: SpellSchool.Ice,
    manaCost: toManaCost(25),
    components: [true, true],
    description: "Summons a freezing storm of ice shards",
    damageRoll: 20,
    lastCastAt: 0
}

const heal: UtilitySpell = {
    id: "spell_003",
    name: "Nature Heal",
    school: SpellSchool.Nature,
    manaCost: toManaCost(12),
    components: [true, false],
    description: "Restores health using nature energy",
    buffTarget: "self",
    lastCastAt: 0
}

const spellBook: SpellBook = {
    slots: [
        { index: 0, spell: fireball },
        { index: 1, spell: blizzard },
        { index: 2 }
    ]
}

console.log(castSpell(fireball, 30))
// → { kind: "success", damageDealt: 45, remainingMana: 12 }

console.log(castSpell(blizzard, 5))
// → { kind: "failure", reason: "insufficient_mana" }

console.log(describeSchool(SpellSchool.Arcane))
// → "Arcane magic bends reality itself"

console.log(addSpellToSlot(spellBook, { index: 2 }, heal))

spellBook.slots[0]
// → { id: "f3a2...", name: "Fireball", school: "Fire", manaCost: 18, ... }