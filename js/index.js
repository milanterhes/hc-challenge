let currentPlayer = "X";

let blocks = document.getElementsByClassName("block")

for(let i = 0; i < blocks.length; i++){
    blocks[i].addEventListener("click", e => {
        if(e.target.innerHTML == "") {
            console.log(`row: ${e.target.parentElement.id} col: ${e.target.id}`)
            e.target.innerHTML = currentPlayer
    
            currentPlayer = currentPlayer === "X" ? "O" : "X"
        }

    })
}