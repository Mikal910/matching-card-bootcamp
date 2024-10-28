// Array of Font Awesome icons
const icons = [
    'fas fa-spider',     // Spider-Man icon
    'fas fa-hammer',     // Thor's hammer
    'fas fa-shield-alt', // Captain America's shield
    'fas fa-robot',      // Iron Man
    'fas fa-bolt',       // Lightning bolt for Thor
    'fas fa-mask'        // Mask for a generic hero/villain
];

// Duplicate the icons to create pairs and shuffle the array
let cards = [...icons, ...icons];
cards = shuffle(cards);

// Shuffle function
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

// Create the game board
const gameBoard = document.getElementById('game-board');
let firstCard, secondCard;
let lockBoard = false;

cards.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back"><i class="${icon}"></i></div>
        </div>
    `;
    gameBoard.appendChild(card);

    // Add click event to flip the card
    card.addEventListener('click', () => {
        if (lockBoard) return;
        if (card === firstCard) return;

        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        lockBoard = true;

        checkForMatch();
    });
});

// Check if the two selected cards are a match
function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', () => {});
    secondCard.removeEventListener('click', () => {});
    resetBoard();
}

// Unflip cards if they are not a match
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset the board after a match or unflip
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
