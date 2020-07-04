//for refrence this is what the map looks like 
// 0: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 1: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 2: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 3: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 4: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 5: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 6: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 7: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 8: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 9: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 10: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 11: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 12: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 13: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 14: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 15: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 16: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 17: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 18: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 19: (10) [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

//current problem is something to do with the first column and fitness

//make sure html has correct onresize thingy in real doc
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
const horizSquares = 10
const vertSquares = 20
const blockArray = ["longBlock", "angleBlock", "cubeBlock", "tBlock", "zBlock",]

    
let width = canvas.clientWidth;
let height = canvas.clientHeight;

let map = []
for (let i = 0; i < vertSquares; i++) {
    map.push([])
    for (let j = 0; j < horizSquares; j++) {
        if (i == vertSquares - 1) {
            map[i].push(2) 
        } else {
        map[i].push(0)
        }
    }
}
let mapCleanCopy = map

let blockInMotion = false

let squareWidth = width/horizSquares
let squareHeight = height/vertSquares


window.addEventListener('resize', () => {
    sizeChange()
});

window.addEventListener('fullscreenchange', () => {
    sizeChange()
});

canvas.width = width
canvas.height = height

let ended = false
let collision = false
let timeInterval = 10
let mapState = map

function omegaReset() {
    ended = false
    collision = false
    blockInMotion = false
    fitnessArray = []
    blockInMotion = false
    collision = false
    hasHitOne = false
    hasHitZero = false
}

draw()

//---------------------------------------------------------------------------------------------------------------------------------------

async function startThingy() {
    sleep(100)
    while(true) {
        omegaReset()
        let block = randomBlock()
        let fitnessArray = []

        if (!blockInMotion) {
            mapState = map
            for (let i = 0; i < horizSquares; i++) {
                if (block == "angleBlockReverse" && i == 0) {
                    i = 1
                }
                badBlock = createBlock(i, block)
                if (badBlock) {
                    blockInMotion = true
                    break
                }
                
                while (!collision) {
                    this.draw()
                    await sleep(timeInterval)
                    this.clear()
                    fallByOne()
                }
                holesCreated = countHoles()
                sleep(timeInterval)
                fitnessArray.push(holesCreated)
                clean()
                blockInMotion = false
                collision = false
            }
        }
        
        bestRand = findMinIndex(fitnessArray)
        if (bestRand.length > 1 && block == "longBlock") {
            bestPos = getLowest(bestRand)
        } else {
            bestPos = bestRand[Math.floor(Math.random() * bestRand.length)]
        }
        
        for (let i = 0; i < 8; i++) {
                if (map[i].includes(2)) {
                    bestPos = emergency()
                    break
                }
        }


        createBlock(bestPos, block)
        
        while (!collision) {
            this.draw()
            await sleep(timeInterval)
            this.clear()
            fallByOne()
            if (collision) {
                freeze()
                blockInMotion = false
            }
        }
        checkForEnd()
        if(ended) {
            for (let i = 0; i < vertSquares - 1; i++) {
                for (let j = 0; j < horizSquares; j++) {
                    map[i][j] = 0
                }
            }
        }
        checkForRow()
        
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------

function countHoles() {
    hasCubeArray = []
    //finds blocks in each column
    for (let i = vertSquares - 2; i > 0; i--) {
        for (let j = 0; j < horizSquares; j++) {
            if (map[i][j] == 1 && !hasCubeArray.includes(j)) {
                hasCubeArray.push(j)
            }
        }
    }
    
    let hasHitOne = false
    let hasHitZero = false
    let holes = 0
    let tempHoles = 0
    for (let k = 0; k < hasCubeArray.length; k++) {
        for (let i = 0; i < vertSquares; i++) {
            if (map[i][hasCubeArray[k]] == 1) {
                hasHitOne = true
                tempHoles = 0
            }
            if (map[i][hasCubeArray[k]] == 0 && hasHitOne) {
                hasHitZero = true            
                tempHoles += 1
            }
            if(map[i][hasCubeArray[k]] == 1 && hasHitZero) {
                tempHoles = 0
                hasHitZero = false

                tempHoles = 0
                hasHitOne = false
                hasHitZero = false
                break
            }
            if (map[i][hasCubeArray[k]] == 2) {
                holes += tempHoles
                tempHoles = 0
                hasHitOne = false
                hasHitZero = false
            }
        }
    }
    return holes
}

function emergency() {
    depthArray = []
    for (let i = 0; i < horizSquares - 1; i ++) {
        let depth = 0
        for (let j = 0; j < vertSquares; j++) {
            if (map[j][i] == 0) {
                depth += 1
            } else {
                depthArray.push(depth)
                break
            }
        }
    }
    let max = depthArray.indexOf(Math.max.apply(null, depthArray))
    return max
}

function fallByOne() {
    mapState = map
    PosArray = []
    //add current blocks pos to array and clear falling blocks
    for (let i = 0; i < vertSquares; i++) {
        for (let j = 0; j < horizSquares; j++) {
            if (map[i][j] == 1) {
                temp = []
                temp.push(i)
                temp.push(j)
                PosArray.push(temp)
            }
        } 
    }

    //check for collisons
    for (let i = 0; i < vertSquares; i++) {
        for (let j = 0; j < horizSquares; j++) {
            for (let k = 0; k < PosArray.length; k++) {
                if (map[PosArray[k][0] + 1][PosArray[k][1]] == 2) {
                    collision = true
                    
                }
            }
        }
    }

    
    //clean map
    if (!collision) {
        clean()
        map = mapState
    }

    if (!collision) {
        //increment
        for (let k = 0; k < PosArray.length; k ++) {
            PosArray[k][0] = PosArray[k][0] + 1

        for (let i = 0; i < vertSquares; i++) {
            for (let j = 0; j < horizSquares; j++) {
                    map[PosArray[k][0]][PosArray[k][1]] = 1
                }
            }
        }
    }
}

function clean() {
    for (let i = 0; i < vertSquares; i++) {
        for (let j = 0; j <horizSquares; j++) {
            if (map[i][j] == 1) {
                map[i][j] = 0
            }
        }
    }
}

function checkForRow() {
    for (let i = 0; i < vertSquares - 1; i ++) {
        let result = map[i].every(function (e) {
            return e == 2
        })
        if (result) {
            deleteRow(map, i)
            map.unshift([0,0,0,0,0,0,0,0,0,0])
        }
        
    }
}

function deleteRow(map, row) {
    map = map.slice(0)
    map.splice(row - 1, 1)
    return map
}

function draw() {
    
    for (let i = 0; i < vertSquares; i++) {
        for (let j = 0; j < horizSquares; j++) {
            // if(map[i][j] == 0) {
            // ctx.fillStyle = "#aaaaaa"
            // ctx.fillRect(j*squareWidth, i*squareHeight, squareWidth, squareHeight)
            // }

            if(map[i][j] == 2) {
            ctx.fillStyle = "#23272A"
            ctx.fillRect(j*squareWidth, i*squareHeight, squareWidth, squareHeight)
            }
            
            if(map[i][j] == 1) {
                ctx.fillStyle = "#23272A"
                ctx.fillRect(j*squareWidth, i*squareHeight, squareWidth, squareHeight)
                }
    

            // ctx.beginPath();
            // ctx.strokeStyle = "grey"
            // ctx.rect(j*squareWidth, i*squareHeight, squareWidth, squareHeight)
            // ctx.stroke()
        }
        
    }
   
}

function findMinIndex(fitnessArray) {
    let bestRand = []
    let min = fitnessArray[0];
    let minIndex = 0;
    let best = 0

    for (let i = 0; i < fitnessArray.length; i++) {
        if (fitnessArray[i] < min) {
            minIndex = i;
            min = fitnessArray[i];
        }
    }
    
    for (let i = 0; i < fitnessArray.length; i++) {
        if (fitnessArray[i] == min) {
                bestRand.push(i)
            }
        }
    return bestRand    

}

function freeze() {
    for (let i = 0; i < vertSquares; i++) {
        for (let j = 0; j < horizSquares; j++) {
            if (map[i][j] == 1) {
                map[i][j] = 2
            }
        }
    }
}

//Example param [0, 2, 5, 6, 7]
function getLowest(bestRand) {
    let nextStage = []
    let lastStage = []
    for (let i = 0; i < bestRand.length; i++) {
        depth = 0
        for (let j = 0; j < vertSquares; j++) {
            if (map[j][i] == 0) {
                depth += 1
            } else {
                nextStage.push(depth)
                break
            }
        }
    }

    max = Math.max.apply(null, nextStage)
    // console.log(`NEXT STAGE ${nextStage}`)
    for (let i = 0; i < nextStage.length; i++) {
        if (nextStage[i] == max) {
            lastStage.push(i)
        }
    }
    randomFromLast = lastStage[Math.floor(Math.random() * lastStage.length)]
    // console.log(`LAST STAGE ${lastStage}`)
    // console.log(`RANDOM FROM LAST ${randomFromLast}`)
    return randomFromLast
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clear() {
    ctx.clearRect(0,0,width,height)
}

function sizeChange() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    squareWidth = width/horizSquares
    squareHeight = height/vertSquares
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    draw();
}



function randomBlock() {
    return blockArray[Math.floor(Math.random()*blockArray.length)];
}

function createBlock(givenStartPos, givenBlock) {
    

    let startPos = givenStartPos
    let newBlock = givenBlock
    
    switch (newBlock) {
    

    case ("longBlock"):
    
        map[0][startPos] =  1
        map[1][startPos] = 1
        map[2][startPos] = 1
        map[3][startPos] = 1
        blockInMotion = true
        break
    

    case ("tBlock"):
        if ((startPos + 1) >= horizSquares) {
            blockInMotion = false
            break
        } else {
            map[1][startPos + 1] = 1
            map[0][startPos] = 1
            map[1][startPos] = 1
            map[2][startPos] = 1
            blockInMotion = true
        }
        break

    case ("cubeBlock"):
        if ((startPos + 1) >= horizSquares) {
            blockInMotion = false
            break
        } else {
            map[0][startPos + 1] = 1
            map[1][startPos + 1] = 1
            map[0][startPos] = 1
            map[1][startPos] = 1
            blockInMotion = true
        }
        break
    
    

    case ("angleBlock"):
        if((startPos + 1) >= horizSquares) {
            blockInMotion = false
            break
        } else {
            map[0][startPos + 1] = 1
            map[0][startPos] = 1
            map[1][startPos] = 1
            map[2][startPos] = 1
            blockInMotion = true
        }
        break

   

    case ("zBlock"):
        if ((startPos + 1) >= horizSquares) {
            blockInMotion = false
            break
        } else {
            map[1][startPos + 1] = 1
            map[2][startPos + 1] = 1
            map[0][startPos] = 1
            map[1][startPos] = 1
            blockInMotion = true
        }
        break

    default:
        console.log(newBlock)
        console.log("no cube selected")
    
    }
    if (!blockInMotion) {
        return true
    }
}




function checkForEnd() {
    for (let i = 0; i < horizSquares; i++) {
        if (map[0][i] == 2) {
            temp = true
            break
        }
        else {
            temp = false
        }
    }
    if (temp) {
        ended = true
    }
    else {
        ended = false
    }
}
