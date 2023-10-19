const PlayerInfo = document.querySelector("[gameInfo]");
const boxes = document.querySelectorAll(".box");
const newGame = document.querySelector(".button");

//playing user data
let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//function to initialise the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    })

    newGame.classList.remove("active");
    PlayerInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((box)=>{
        box.classList.remove("win");
    })
    
}
initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    PlayerInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkWinner() {

    let answer = "";
    winningPosition.forEach((position) => {

        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else {
                answer = "0";
            }

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    })
    //it means there is a winner
    if (answer !== "") {
        PlayerInfo.innerText = `Winner Player - ${answer}`;
        newGame.classList.add("active");
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })
    }
    // for checking there is a game tied

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    })
    if(fillCount===9 && answer===""){
        PlayerInfo.innerText ="Game Tied!";
        newGame.classList.add(" active");
    }

};

//2 part code
function handleclick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer; //ui update
        gameGrid[index] = currentPlayer; //logic me update
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //check koi jeeta  to nai
        checkWinner();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleclick(index);
    });

});

newGame.addEventListener("click", () => {
    initGame();
})
