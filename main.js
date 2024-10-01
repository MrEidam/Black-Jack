
const Deck = {
    Clubs:[
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
        '10.png',
        'A.png',
        'J.png',
        'K.png',
        'Q.png',
    ],
    Diamonds:[
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
        '10.png',
        'A.png',
        'J.png',
        'K.png',
        'Q.png',
    ],
    Hearts:[
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
        '10.png',
        'A.png',
        'J.png',
        'K.png',
        'Q.png',
    ],
    Spades:[
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
        '10.png',
        'A.png',
        'J.png',
        'K.png',
        'Q.png',
    ]
}

let currentDeck = Deck;

function cardsleft(){
    return currentDeck.Clubs.length// + currentDeck.Diamonds.length + currentDeck.Hearts.length + currentDeck.Spades.length;
}

function cardAvail(num){
    console.log(num);
    console.warn(currentDeck.Clubs);

    let card = Math.floor(Math.random() * num);
    
    document.getElementById('card').src = `./Clubs/${currentDeck.Clubs[card]}`;

    const index = currentDeck.Clubs.indexOf(currentDeck.Clubs[card]);
    if(index > -1){ // only splice array when item is found
        currentDeck.Clubs.splice(index, 1); // Remove one item at the found index
        console.log('Card removed');
    }

    return card;
}

function addCard(){
    cardAvail(cardsleft());
}

function hit(){
    addCard();
}