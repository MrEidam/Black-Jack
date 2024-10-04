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

let currentDeck = deepCopyDeck(Deck);  // Initialize with a deep copy

// Function to deeply copy the deck
function deepCopyDeck(deck){
    return {
        Clubs: [...deck.Clubs],
        Diamonds: [...deck.Diamonds],
        Hearts: [...deck.Hearts],
        Spades: [...deck.Spades]
    };
}
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
            score += (score < 11) ? 11 : 1;
        }else{
            score += isNaN(e) ? 10 : parseInt(e);
        }
    });
    
}

function reshuffle(){
    alert('Reshuffling ...')
    currentDeck = deepCopyDeck(Deck);
    setTimeout(200);
}

function createCard(imgSource){
    let newCard = document.createElement('img');
    newCard.src = imgSource;
    newCard.classList.add('card');
    document.querySelector('.cards2').append(newCard);
}

function cardAvail(num){
    const availableCards = ['Clubs', 'Diamonds', 'Hearts', 'Spades'].filter((suit, idx) => num[idx] > 0);

    // Check if there are any available cards
    if(availableCards.length === 0){
        console.log('No cards available. Deck is empty.');
        return;
    }

    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];

    // Ensure that currentDeck[randomCard] exists and has cards
    if(!currentDeck[randomCard] || currentDeck[randomCard].length === 0){
        console.log(`Error: ${randomCard} has no cards left.`);
        return;
    }
    
    const cardIndex = Math.floor(Math.random() * currentDeck[randomCard].length);
    const card = currentDeck[randomCard][cardIndex];

    addScore(card);

    createCard(`./${randomCard}/${card}.png`);

    /*document.querySelectorAll('.card').forEach(e => {
        e.src = `./${randomCard}/${card}.png`;
    });*/

    currentDeck[randomCard].splice(cardIndex, 1);

    console.log(`Card removed from ${randomCard}: ${card}`);
    console.log(currentDeck);
}

function isDeckEmpty() {
    return ['Clubs', 'Diamonds', 'Hearts', 'Spades'].every(suit => currentDeck[suit].length === 0);
}

function addCard(){
    if(isDeckEmpty()){
        reshuffle();
    }
    cardAvail(cardsleft());
}


function hit(){
    addCard();
    document.querySelector('h2').innerHTML = score;
}