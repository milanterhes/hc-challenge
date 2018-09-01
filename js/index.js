let isPlayersTurn = true;
let resetButton = document.getElementById("resetButton")
let alertPanel = document.getElementById("alertPanel")
let blocks = document.getElementsByClassName("block")

for(let i = 0; i < blocks.length; i++){
    blocks[i].addEventListener("click", e => {
        if(e.target.innerHTML == "") {

            //mark block if it's the player's turn
            if(isPlayersTurn) {
                e.target.innerHTML = '<i class="fas fa-times"></i>'
                e.target.classList.add("blue")
                isPlayersTurn = !isPlayersTurn
                let winner = checkIfWinner()
                if(winner){
                    announceWinner(winner)
                } else {
                    cpuTurn()
                }
            }
            
        }

    })
}

function reset(){
    for(let i = 0; i < blocks.length; i++){
        blocks[i].innerHTML = ""
        blocks[i].classList.remove("red","blue")
    }
    isPlayersTurn = true
    alertPanel.innerHTML = ""
}

function cpuTurn() {
    let freeBlocks = getFreeBlocks()
    let choice = Math.floor(Math.random() * freeBlocks.length)

    if(freeBlocks.length > 0) {
        freeBlocks[choice].innerHTML = '<i class="far fa-circle"></i>'
        freeBlocks[choice].classList.add("red")
        isPlayersTurn = !isPlayersTurn
        let winner = checkIfWinner()
        if(winner){
            announceWinner(winner)
            isPlayersTurn = false
        }
    } else {
        let winner = checkIfWinner()
        if(winner) announceWinner(winner)
        else announceWinner("draw")
    }
}

function checkIfWinner(){
    let board = getAllBlocks()
    let results = {
        rows: checkRows(board),
        diagonal: checkDiagonal(board),
        columns: checkColumns(board)
    }

    let winner = Object.values(results).find(element => {
        return element != false
    })

    if(winner) return(winner)
    else return(false)
}

function announceWinner(winner){

    switch(winner){
        case "X":
            alertPanel.innerHTML = '<span style= "color: green">You won!</span>'
            break;
        case "O":
            alertPanel.innerHTML = '<span style= "color: red">The computer won!</span>'
            break;
        case "draw":
            alertPanel.innerHTML = '<span>It\'s a draw! Try again.</span>'
    }
}


function checkRows(board){
    for(let i = 0; i < board.length; i++) {
        if( areEqual(...board[i]) ){
            return(board[i][0].innerHTML)
        }
    }
    return false;
}

function checkColumns(board){
    for(let i = 0; i < 3; i++){
        if( areEqual(board[0][i], board[1][i], board[2][i]) ){
            return(board[0][i].innerHTML)
        }
    }
    return false;
}

function checkDiagonal(board){
    if(areEqual(board[0][0], board[1][1], board[2][2]) ||
       areEqual(board[0][2] ,board[1][1], board[2][0]) ) {
           return(board[1][1].innerHTML)
       }
    return false
}

function getAllBlocks(){
    let matrix = []
    let rows = document.getElementsByClassName("row")
    
    for(let i = 0; i < rows.length; i++) {
        matrix.push(rows[i].children)
    }

    return matrix;
}

function getFreeBlocks(){
    let freeBlocks = []
    for(let i = 0; i < blocks.length; i++){
        if(blocks[i].innerHTML === "") {
            freeBlocks.push(blocks[i])
        }
    }
    return freeBlocks
}

function areEqual(){
    var len = arguments.length;
    for (var i = 1; i< len; i++){
        if (arguments[i].innerHTML === "" || arguments[i].innerHTML !== arguments[i-1].innerHTML)
            return false;
    }
    return true;
}