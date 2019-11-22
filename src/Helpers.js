// General helpers
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const makeCounter = () => {
    var count = 0
    return () => {
	count = count + 1;
	return count;
    }
}
const shuffleArray = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;
	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
    }
    return array;
}

// Board and 2d coordinate Helpers
const isCoordInBoundary = (board, coord) => {
    return coord.x >= 0 &&
	coord.y >= 0 &&
	coord.x <= board.length-1 &&
	coord.y <= board.length-1
}
const neighborsCoords = (coord) => {
    return [
	{x: coord.x, y: coord.y+1}, //N
	{x: coord.x, y: coord.y-1},  //S
	{x: coord.x+1, y: coord.y},   //E
	{x: coord.x-1, y: coord.y},   //W
	{x: coord.x+1, y: coord.y+1},   //NE
	{x: coord.x-1, y: coord.y+1},   //NW
	{x: coord.x+1, y: coord.y-1},   //SE
	{x: coord.x-1, y: coord.y-1}    //SW
    ]}
const cellNeighborsCoords = (board, coord) => {
    return neighborsCoords(coord).
	filter(coord => isCoordInBoundary(board, coord)).
	map(coord => board[coord.x][coord.y])
}
const safeNeighbors = (board, cell) => {
    return cellNeighborsCoords(board, cell).filter(cell => !cell.isMine)
}
const randomCells = (board, numberOfCells) => {
    return shuffleArray(board.flat()).slice(0, numberOfCells)
}
const neighborMines = (board, cell) => {
    return cellNeighborsCoords(board, cell).
	filter(cell => cell.isMine)
}
const setMineCounts = (board) => {
    for (let i of board) {
	for (let cell of i) {
	    cell.mineCount = neighborMines(board, cell).length
	}
    }
    return board
}
const setMines = (board, n) => {
    for (let cell of randomCells(board, n)) {
	cell.isMine = true
    }
    setMineCounts(board)
    return board;
}

// Swap the first move mine tile with a random, safe tile
const firstMoveReplaceMine = (board, coord) => {
    var original = board[coord.x][coord.y]
    var replacement = randomCells(board, 1)[0]
    if (replacement.isMine) {
	// try again
	firstMoveReplaceMine(board, coord)
	return board
    } else {
	original.isMine = false
	replacement.isMine = true
	setMineCounts(board)
	return board
    }
}

const make2dArray = (opts, initializeFn) => {
    var cellArray = []
    for (var x=0; x < opts.size; x++) {
	cellArray[x] = []
	for (var y = 0; y < opts.size; y++) {
	    cellArray[x][y] = initializeFn({x: x, y: y})
	}
    }
    return cellArray
}

const initializeCells = (opts) => {
    var cells = make2dArray({size: opts.size},
			  (opts) => {
			      return {id: uuidv4(),
				      x: opts.x,
				      y: opts.y,
				      isMine: false,
				      isOpen: false}})
    cells = setMines(cells, opts.mineCount)
    return cells;
}


module.exports = {
    makeCounter: makeCounter,
    shuffleArray: shuffleArray,
    setMines: setMines,
    firstMoveReplaceMine: firstMoveReplaceMine,
    safeNeighbors: safeNeighbors,
    initializeCells: initializeCells,
    uuidv4: uuidv4
}
