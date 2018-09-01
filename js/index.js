let isPlayersTurn = true;

let blocks = document.getElementsByClassName("block")

for(let i = 0; i < blocks.length; i++){
    blocks[i].addEventListener("click", e => {
        if(e.target.innerHTML == "") {
            console.log(`row: ${e.target.parentElement.id} col: ${e.target.id}`)

            //mark block if it's the player's turn
            if(isPlayersTurn) {
                e.target.innerHTML = "X"
                isPlayersTurn = !isPlayersTurn
                cpuTurn()
            }
            
        }

    })
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

function cpuTurn() {
    let freeBlocks = getFreeBlocks()
    let choice = Math.floor(Math.random() * freeBlocks.length)

    freeBlocks[choice].innerHTML = "O"
    isPlayersTurn = !isPlayersTurn
}