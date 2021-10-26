let tiles = []
let playerPos
let playerLives = 3
const grid = document.querySelector('.grid_container')
const body = document.body
const message = document.getElementById("messageModal");
const lives = document.querySelector('.life-counter')
const startPos = document.querySelector('.start')
const layout = [
                "AS", "BS",
                "A", "B",
                "A", "B",
                "A", "B",
                "A", "B",
                "A", "B",
                "A", "B",
                "A", "B",
                "A", "B",
                "A", "B",
                "AE", "BE"
]

// Display GameGrid //
function createGrid() {
    for (let i=0; i < layout.length; i++) {
        const tile = document.createElement('div')
        grid.appendChild(tile)
        tiles.push(tile)
    if(layout[i] === "AS") {
            tiles[i].classList.add('square', 'start', 'player_start_dot', i+1)
    }
    if(layout[i] === "A") {
        tiles[i].classList.add('square', 'sqA', i+1)
        if (Math.floor(Math.random() *2) === 0) {
            tiles[i].classList.add('weak')
        }
    }
    else if(layout[i] === "B") {
        tiles[i].classList.add('square', 'sqB', i+1)
        if (!tiles[i-1].classList.contains('weak')) {
            tiles[i].classList.add('weak')
        }
    }
    if(layout[i] === "AE") {
        tiles[i].classList.add('square', 'end', i+1)
    }
    }
}

function gameReset() {
    playerPos = 1
    playerLives = 3
    createGrid()
    updateValid()
    lives.innerHTML = `${playerLives} players`
}

// Menu Modal//
const modal = document.getElementById("myModal");
const startBtn = document.getElementById("startGame_btn")
startBtn.onclick = function() {
    gameReset()
    modal.style.display = "none"
    gamePlay()
}

// Menu Flash //

function animate (node, animation, onEnd = function () {}) {
	node.classList.add(animation);
	node.addEventListener('animationend', function () {
		node.classList.remove(animation);
		onEnd(node, animation);
	}, {once: true});
}

function updateValid(){
     const playerEven = playerPos % 2 === 0 ? true : false
    const playerPosPlus1Str = (playerPos+1).toString()
    const playerPosPlus2Str = (playerPos+2).toString()
    const playerPosPlus3Str = (playerPos+3).toString()
    tiles.forEach(tile => {
            tile.classList.remove('disabled')
            console.log(tile)
            if ((playerEven === true) && !(tile.classList.contains(playerPosPlus1Str) || tile.classList.contains(playerPosPlus2Str))){
            tile.classList.add('disabled')
            }
            else if ((playerEven === false) && !(tile.classList.contains(playerPosPlus2Str) || tile.classList.contains(playerPosPlus3Str))) {
                tile.classList.add('disabled')
            }
        })
            
}

function checkValid(clickTile){
    const playerEven = playerPos % 2 === 0 ? true : false
    const playerPosPlus1Str = (playerPos+1).toString()
    const playerPosPlus2Str = (playerPos+2).toString()
    const playerPosPlus3Str = (playerPos+3).toString()
    if ((playerEven === true) && !(clickTile.classList.contains(playerPosPlus1Str) || clickTile.classList.contains(playerPosPlus2Str))) {
        return true
    }
    else if ((playerEven === false) && !(clickTile.classList.contains(playerPosPlus2Str) || clickTile.classList.contains(playerPosPlus3Str))) {
        return true
    }
    else return false
}

function gamePlay(){
    tiles.forEach(clickTile => {
        clickTile.addEventListener('mousedown', () => {

        // check if the player is standing on an even or odd square
        // const playerEven = playerPos % 2 === 0 ? true : false

        const playerPosStr = (playerPos).toString()
        const playerPosPlus1Str = (playerPos+1).toString()
        const playerPosPlus2Str = (playerPos+2).toString()
        const playerPosPlus3Str = (playerPos+3).toString()
                
        /// checks if move is valid 

            if (!checkValid(clickTile)) {
                tiles.forEach(tile => 
                    tile.classList.remove('player')
                )                                
                if (clickTile.classList.contains('broken') || clickTile.classList.contains('weak')) {
                    clickTile.classList.add('broken')
                    playerPos = 1
                    clickTile.classList.add('player-death')
                    setTimeout(()=>{clickTile.classList.remove('player-death')}, 300)
                    setTimeout(()=>{tiles[0].classList.add('player_start_dot')}, 500)
                    
                    playerLives--
                    lives.innerHTML = `${playerLives} players`
                    animate(body, 'border-flash', function (node, animation) {

                    });
                    message.style.display = "block"
                    setTimeout(function(){ message.style.display = "none" }, 500)
                    updateValid()
                    checkLose()
                    return
                }
                else {
                    tiles[0].classList.remove('player_start_dot')
                    clickTile.classList.add('player')
                    clickTile.classList.contains(playerPosPlus1Str) ? playerPos = playerPos+1 : playerPos = playerPos+2
                    updateValid()
                }
            }
        })
    })
}

// loose modal 

// squid games type letter scrambling?
// animate on hover
// win modal (short delay first) (count the dead and living)
// allow users to select player numbers1
// make glass crack
// player svg
// animate player to the next block?