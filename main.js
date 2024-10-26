let playerCards = [];
let dealerCards = [];
let dealerScore = 0;
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

document.body.onload = () => {
    startCards();
};

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

    //? Filters out Aces
    const withoutAces = playerCards.filter(e => e !== 'A');

    const count = playerCards.length-withoutAces.length;

    //? Adds the aces to the end
    for(let i=0; i<count;i++){
        withoutAces.push('A');
    }

    playerCards = [...withoutAces];

    score = 0;
    playerCards.forEach(e => {
        if(e === 'A'){
            score += (score < 11) ? 11 : 1;
        }else{
            score += isNaN(e) ? 10 : parseInt(e);
        }
    });
    document.querySelector('#playerScore').innerHTML = score;
}

function addDealerScore(num){
    dealerCards.push(num);

    //? Filters out Aces
    const withoutAces = dealerCards.filter(e => e !== 'A');

    const count = dealerCards.length-withoutAces.length;

    //? Adds the aces to the end
    for(let i=0; i<count;i++){
        withoutAces.push('A');
    }

    dealerCards = [...withoutAces];

    dealerScore = 0;
    dealerCards.forEach(e => {
        if(e === 'A'){
            dealerScore += (dealerScore < 11) ? 11 : 1;
        }else{
            dealerScore += isNaN(e) ? 10 : parseInt(e);
        }
    });
    document.querySelector('#dealerScore').innerHTML = dealerScore;
}

function reshuffle(){
    alert('Reshuffling ...')
    currentDeck = deepCopyDeck(Deck);
    setTimeout(200);
}

function createCard(imgSource, people){
    let newCard = document.createElement('img');
    newCard.src = imgSource;
    newCard.classList.add('card');
    if(people === 'human') document.querySelector('.cards2').append(newCard);
    else document.querySelector('.cards1').append(newCard);
}

function cardAvail(num){
    if(score>21) return;
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
    createCard(`./${randomCard}/${card}.png`, 'human');
    currentDeck[randomCard].splice(cardIndex, 1);

    console.log(`Card removed from ${randomCard}: ${card}`);
}

function dealerCardGet(num){
    if(dealerScore>18) return;
    const availableCards = ['Clubs', 'Diamonds', 'Hearts', 'Spades'].filter((suit, idx) => num[idx] > 0);

    if(availableCards.length === 0){
        console.log('No cards available. Deck is empty.');
        return;
    }

    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];

    if(!currentDeck[randomCard] || currentDeck[randomCard].length === 0){
        console.log(`Error: ${randomCard} has no cards left.`);
        return;
    }

    const cardIndex = Math.floor(Math.random()*currentDeck[randomCard].length);
    const card = currentDeck[randomCard][cardIndex];

    addDealerScore(card);
    createCard(`./${randomCard}/${card}.png`);
    currentDeck[randomCard].splice(cardIndex, 1);

    console.log(`Card removed from ${randomCard}: ${card}`);
}

function isDeckEmpty() {
    return ['Clubs', 'Diamonds', 'Hearts', 'Spades'].every(idx => currentDeck[idx].length === 0);
}

function addCard(){
    if(isDeckEmpty()){
        reshuffle();
    }
    cardAvail(cardsleft());
    if(score > 21){
        resultText('lost');
        stand(true);
    }
}

function addCardDealer(option){
    if(isDeckEmpty()){
        reshuffle();
    }
    dealerCardGet(cardsleft());
    if(dealerScore<18 && !(option)){
        addCardDealer();
    }
}

async function resultText(res){
    let text = document.createElement('h1');
    text.classList.add('result');
    if(res==='won'){
        text.classList.add('won');
        text.innerText = "Victory!";
    }else if(res==='lost'){
        text.classList.add('lost');
        text.innerText = "You lost!";
    }else if(res==='bj'){
        text.classList.add('blackjack');
        text.innerText = "BLACKJACK";
    }else if(res==='draw'){
        text.classList.add('draw');
        text.innerHTML = "Push";
    }
    document.body.append(text);
    setTimeout(() => {
        text.remove();
    }, 600);
    document.querySelector('#buttons').style.display = 'none';
    document.querySelector('#reset').style.display = 'flex';
}

function dealerHit(option){
    addCardDealer(option);
}

function hit(){
    addCard();
    if(score === 21 && playerCards.length === 2){
        resultText('bj');
        //- Add 1.5 money
    }
}

function startCards(){
    hit();
    dealerCardGet(cardsleft());
    hit();
}

function stand(option){
    if(score === 0) return;
    dealerHit(option);
    if(score>21 || (score < dealerScore && dealerScore<=21)){
        resultText('lost');
        document.querySelector('.cards2').classList.add('gray');
    }else if(dealerScore>21 || (score > dealerScore && score<=21)){
        resultText('won');
        document.querySelector('.cards1').classList.add('gray');
    }else{
        resultText('draw');
    }
}

function reset(){
    document.getElementById('playerHand').innerHTML = "";
    document.querySelector('.cards1').innerHTML = "";
    score = 0;
    dealerScore = 0;
    playerCards = [];
    dealerCards = [];
    document.querySelector('#playerScore').innerHTML = score;
    document.querySelector('#dealerScore').innerHTML = '???';
    document.querySelector('#buttons').style.display = 'flex';
    document.querySelector('#reset').style.display = 'none';

    document.querySelector('.cards1').classList.remove('gray');
    document.querySelector('.cards2').classList.remove('gray');

    startCards();
}