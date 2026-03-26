// ========================================================================================================================

// project 2 =====> card game deck builder

// ========================================================================================================================

enum Suit {
    Hearts = "♥",
    Diamonds = "♦",
    Clubs = "♣",
    Spades = "♠"
}

enum Rank {
    Ace = "A",
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",
    Ten = "10",
    Jack = "J",
    Queen = "Q",
    King = "K"
}

type card = { suit: Suit, rank: Rank }

// create deck
function buildDeck(): card[] {
    // get all values
    const allRanks = Object.values(Rank)
    const allSuit = Object.values(Suit)

    let results: card[] = []

    // loop to all values and create all cards
    allRanks.forEach((rank) => {
        allSuit.forEach((suit) => {
            const card = { suit, rank }
            results.push(card)
        })
    })

    return results
}

// random deck order
function shuffle(deck: card[]): card[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));

        const temp: card = deck[i]!;
        deck[i] = deck[j]!;
        deck[j] = temp;
    }

    return deck;
}

// get the value
function draw(randomDeck: card[]): card | undefined {
    if (randomDeck.length !== 0) {
        return randomDeck.shift()
    } else {
        return undefined
    }
}

const deck = buildDeck()   // 52 cards
const shuffled = shuffle(deck)
const card = draw(shuffled)
console.log(card)