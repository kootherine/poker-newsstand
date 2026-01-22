// Zine data for Poker Night Newsstand
// Add new zines to this array to display them on the newsstand

const zines = [
    {
        id: 1,
        title: "The River Rat",
        subtitle: "When the River Decides Everything",
        date: "2024-01-15",
        issueNumber: 1,
        cover: "images/covers/issue1.png",
        coverColor: "#FF6B6B",
        comic: "images/comics/comic1.png",
        comicTitle: "When Mike went all-in with 7-2 offsuit",
        stats: {
            winner: "Sarah",
            winnings: "$47.50",
            biggestPot: "$23.00",
            bestHand: "Full House (Aces over Kings)",
            players: [
                { name: "Sarah", chips: "+$47.50", position: 1 },
                { name: "Tom", chips: "+$12.00", position: 2 },
                { name: "Lisa", chips: "-$8.50", position: 3 },
                { name: "Mike", chips: "-$51.00", position: 4 }
            ],
            highlights: [
                "Mike's legendary 7-2 bluff that actually worked... once",
                "Sarah's epic comeback from 3 big blinds",
                "Tom accidentally showed his cards twice",
                "Lisa's unbreakable poker face (she was just tired)"
            ]
        }
    },
    {
        id: 2,
        title: "All-In Antics",
        subtitle: "The Night of Reckless Bets",
        date: "2024-01-22",
        issueNumber: 2,
        cover: "images/covers/issue2.png",
        coverColor: "#4ECDC4",
        comic: "images/comics/comic2.png",
        comicTitle: "Tom's 'I definitely have pocket aces' face",
        stats: {
            winner: "Mike",
            winnings: "$62.00",
            biggestPot: "$35.00",
            bestHand: "Four of a Kind (Jacks)",
            players: [
                { name: "Mike", chips: "+$62.00", position: 1 },
                { name: "Sarah", chips: "+$5.00", position: 2 },
                { name: "Lisa", chips: "-$22.00", position: 3 },
                { name: "Tom", chips: "-$45.00", position: 4 }
            ],
            highlights: [
                "Mike hit quad Jacks and nobody believed him",
                "Tom went all-in 7 times (won twice)",
                "The great chip spill of 2024",
                "Lisa's strategic bathroom break during a big hand"
            ]
        }
    },
    {
        id: 3,
        title: "Bluff Boulevard",
        subtitle: "Where Truth Goes to Die",
        date: "2024-01-29",
        issueNumber: 3,
        cover: "images/covers/issue3.png",
        coverColor: "#FFE66D",
        comic: "images/comics/comic3.png",
        comicTitle: "The moment everyone realized Lisa wasn't bluffing",
        stats: {
            winner: "Lisa",
            winnings: "$38.00",
            biggestPot: "$28.50",
            bestHand: "Straight Flush (5-9 of Hearts)",
            players: [
                { name: "Lisa", chips: "+$38.00", position: 1 },
                { name: "Tom", chips: "+$15.50", position: 2 },
                { name: "Mike", chips: "-$18.00", position: 3 },
                { name: "Sarah", chips: "-$35.50", position: 4 }
            ],
            highlights: [
                "Lisa's straight flush shocked everyone",
                "Mike tried the same bluff 3 times in a row",
                "Sarah's 'tell' was actually just allergies",
                "Tom's victory dance after a $2 pot"
            ]
        }
    }
];

// Helper function to get a zine by ID
function getZineById(id) {
    return zines.find(zine => zine.id === parseInt(id));
}

// Helper function to format date nicely
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function to get all zines sorted by date (newest first)
function getAllZines() {
    return [...zines].sort((a, b) => new Date(b.date) - new Date(a.date));
}
