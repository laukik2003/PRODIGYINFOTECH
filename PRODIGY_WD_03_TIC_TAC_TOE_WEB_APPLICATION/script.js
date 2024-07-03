document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const mainMenu = document.getElementById('mainMenu');
    const startRegistrationButton = document.getElementById('startRegistration');
    const registrationDiv = document.getElementById('registration');
    const registrationForm = document.getElementById('registrationForm');
    const gameDiv = document.getElementById('game');
    const board = document.getElementById('board');
    const resultDiv = document.getElementById('result');
    const playersDiv = document.getElementById('players');
    const undoButton = document.getElementById('undoButton');
    const redoButton = document.getElementById('redoButton');
    const restartButton = document.getElementById('restartButton');
    const backToMenuFromRegistrationButton = document.getElementById('backToMenuFromRegistration');
    const backToMenuFromGameButton = document.getElementById('backToMenuFromGame');

    // Game state variables
    let player1 = '';
    let player2 = '';
    let currentPlayer = '';
    let boardState = Array(9).fill(null);
    let history = [];
    let future = [];

    // Event listeners
    startRegistrationButton.addEventListener('click', showRegistration);
    backToMenuFromRegistrationButton.addEventListener('click', showMainMenuFromRegistration);
    registrationForm.addEventListener('submit', startGame);
    board.addEventListener('click', handleBoardClick);
    undoButton.addEventListener('click', undoMove);
    redoButton.addEventListener('click', redoMove);
    restartButton.addEventListener('click', restartGame);
    backToMenuFromGameButton.addEventListener('click', showMainMenuFromGame);

    // Functions
    function showRegistration() {
        mainMenu.style.display = 'none';
        registrationDiv.style.display = 'block';
    }

    function showMainMenuFromRegistration() {
        registrationDiv.style.display = 'none';
        mainMenu.style.display = 'block';
    }

    function startGame(e) {
        e.preventDefault();
        player1 = document.getElementById('player1').value;
        player2 = document.getElementById('player2').value;
        currentPlayer = player1;
        playersDiv.textContent = `${currentPlayer}'s turn`;
        registrationDiv.style.display = 'none';
        gameDiv.style.display = 'block';
    }

    function handleBoardClick(e) {
        if (e.target.classList.contains('cell')) {
            const index = e.target.dataset.index;
            if (!boardState[index]) {
                history.push([...boardState]);
                future = [];
                boardState[index] = currentPlayer;
                e.target.textContent = currentPlayer === player1 ? 'X' : 'O';
                if (checkWinner()) {
                    resultDiv.textContent = `${currentPlayer} wins!`;
                    board.removeEventListener('click', handleBoardClick);
                } else if (boardState.every(cell => cell)) {
                    resultDiv.textContent = 'It\'s a draw!';
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    playersDiv.textContent = `${currentPlayer}'s turn`;
                }
            }
        }
    }

    function undoMove() {
        if (history.length) {
            future.push([...boardState]);
            boardState = history.pop();
            updateBoard();
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            playersDiv.textContent = `${currentPlayer}'s turn`;
        }
    }

    function redoMove() {
        if (future.length) {
            history.push([...boardState]);
            boardState = future.pop();
            updateBoard();
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            playersDiv.textContent = `${currentPlayer}'s turn`;
        }
    }

    function restartGame() {
        boardState = Array(9).fill(null);
        history = [];
        future = [];
        Array.from(board.children).forEach(cell => cell.textContent = '');
        resultDiv.textContent = '';
        playersDiv.textContent = '';
        player1 = '';
        player2 = '';
        currentPlayer = '';
    }

    function showMainMenuFromGame() {
        gameDiv.style.display = 'none';
        mainMenu.style.display = 'block';
        restartGame();
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function updateBoard() {
        Array.from(board.children).forEach((cell, index) => {
            cell.textContent = boardState[index] === player1 ? 'X' : boardState[index] === player2 ? 'O' : '';
        });
        resultDiv.textContent = '';
    }
});