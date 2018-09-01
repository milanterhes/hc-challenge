let isPlayersTurn = true;

let blocks = document.getElementsByClassName("block")

for(let i = 0; i < blocks.length; i++){
    blocks[i].addEventListener("click", e => {
        if(e.target.innerHTML == "") {
            console.log(e.target.parentElement.id, e.target.id)

            //mark block if it's the player's turn
            if(isPlayersTurn) {
                e.target.innerHTML = "X"
                isPlayersTurn = !isPlayersTurn
                cpuTurn()
            }
            
        }

    })
}

function cpuTurn() {
    let freeBlocks = getFreeBlocks()
    let choice = Math.floor(Math.random() * freeBlocks.length)

    if(freeBlocks.length > 0) {
        freeBlocks[choice].innerHTML = "O"
        isPlayersTurn = !isPlayersTurn
    } else {
        alert("game is over")
    }
}

function checkIfWinner(){
    let board = getAllBlocks()
    console.log(checkRows(board))
}

function checkRows(board){
    for(let i = 0; i < board.length; i++) {
        if( areEqual(...board[i]) ){
            return(board[i][0].innerHTML)
        }
    }
    return false;
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