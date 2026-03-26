var Suit;
(function (Suit) {
    Suit["Hearts"] = "\u2665";
    Suit["Diamonds"] = "\u2666";
    Suit["Clubs"] = "\u2663";
    Suit["Spades"] = "\u2660";
})(Suit || (Suit = {}));
var Rank;
(function (Rank) {
    Rank["Ace"] = "A";
    Rank["Two"] = "2";
    Rank["Three"] = "3";
    Rank["Four"] = "4";
    Rank["Five"] = "5";
    Rank["Six"] = "6";
    Rank["Seven"] = "7";
    Rank["Eight"] = "8";
    Rank["Nine"] = "9";
    Rank["Ten"] = "10";
    Rank["Jack"] = "J";
    Rank["Queen"] = "Q";
    Rank["King"] = "K";
})(Rank || (Rank = {}));
function buildDeck() {
    const allRanks = Object.values(Rank);
    const allSuit = Object.values(Suit);
    let results = [];
    allRanks.forEach((rank) => {
        allSuit.forEach((suit) => {
            const card = { suit, rank };
            results.push(card);
        });
    });
    return results;
}
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}
function draw(randomDeck) {
    if (randomDeck.length !== 0) {
        return randomDeck.shift();
    }
    else {
        return undefined;
    }
}
const deck = buildDeck();
const shuffled = shuffle(deck);
const card = draw(shuffled);
console.log(card);
export {};
//# sourceMappingURL=index.js.map