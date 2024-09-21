const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('glowing-btn');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] !== '' || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    // Apply color based on the current player
    if (currentPlayer === 'X') {
        cell.style.color = 'blue';
    } else {
        cell.style.color = 'red';
    }

    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        alert(`${currentPlayer} wins!`);
    } else if (!boardState.includes('')) {
        gameActive = false;
        alert('It\'s a draw!');
    }
}

function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';  // Reset color to default
    });
}

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
