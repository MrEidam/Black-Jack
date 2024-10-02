let playerCards = [];
let score = 0;

const Deck = {
    Clubs:[
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
        'J',
        'K',
        'Q',
    ],
    Diamonds:[
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
        'J',
        'K',
        'Q',
    ],
    Hearts:[
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
        'J',
        'K',
        'Q',
    ],
    Spades:[
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
        'J',
        'K',
        'Q',
    ]
}

const emptyDeck = {
    Clubs: [],
    Diamonds: [],
    Hearts: [],
    Spades: []
}

let currentDeck = Deck;

function cardsleft(){
    return [
        currentDeck.Clubs.length,
        currentDeck.Diamonds.length,
        currentDeck.Hearts.length,
        currentDeck.Spades.length
    ];
}

function addScore(num){
    playerCards.push(num);

    score = 0;
    playerCards.forEach(e => {
        if(e === 'A'){
            score += (score < 11) ? 10 : 1;
        }else{
            score += isNaN(e) ? 10 : parseInt(e);
        }
    });
    
}

function cardAvail(num){
    // Filter available suits that still have cards left
    const availableCards = ['Clubs', 'Diamonds', 'Hearts', 'Spades'].filter((suit, idx) => num[idx] > 0);

    // Check if there are any available cards
    if(availableCards.length === 0){
        console.log('No cards available. Deck is empty.');
        return;  // Prevent further execution if no cards are left
    }

    // Select a random suit from available suits
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];

    // Ensure that currentDeck[randomCard] exists and has cards
    if(!currentDeck[randomCard] || currentDeck[randomCard].length === 0){
        console.log(`Error: ${randomCard} has no cards left.`);
        return;  // Exit if there's an issue with the selected suit
    }
    
    const cardIndex = Math.floor(Math.random() * currentDeck[randomCard].length);
    const card = currentDeck[randomCard][cardIndex];

    addScore(card);

    document.getElementById('card').src = `./${randomCard}/${card}.png`;

    currentDeck[randomCard].splice(cardIndex, 1);

        console.log(`Card removed from ${randomCard}: ${card}`);
        console.log(currentDeck);
}

function isDeckEmpty() {
    return ['Clubs', 'Diamonds', 'Hearts', 'Spades'].every(suit => currentDeck[suit].length === 0);
}

function addCard(){
    if (isDeckEmpty()) {
        currentDeck = {...Deck};  // Reset to the original deck if empty
    }
    cardAvail(cardsleft());
}


function hit(){
    addCard();
    document.querySelector('h2').innerHTML = score;
}