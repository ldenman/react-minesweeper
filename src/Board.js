import React, { Component } from 'react';
import Tile from './Tile';
const helpers = require('./Helpers');

class Board extends Component {
    reset(e) {
	var newState = this.getInitialState()
	this.setState({...newState})
	return
    }
    
    getInitialState() {
	return { cells: helpers.initializeCells({size: this.props.size,
						 mineCount: this.props.mineCount}),
		 icons: this.props.icons,
		 turnCount: 0,
		 isWin: false,
		 isGameOver: false
	       }
    }

    constructor(props) {
	super(props)
	this.turnCounter = helpers.makeCounter()
	this.state = this.getInitialState()
	this.takeTurn = this.takeTurn.bind(this)
	this.incrementTurnCounter = this.incrementTurnCounter.bind(this)
	this.firstMoveReset = this.firstMoveReset.bind(this)
	this.openTile = this.openTile.bind(this)
	this.getInitialState = this.getInitialState.bind(this)
	this.reset = this.reset.bind(this)
    }
    
    firstMoveReset(cell) {
	this.setState({cells: helpers.firstMoveReplaceMine(this.state.cells, cell)})
    }
    incrementTurnCounter() {
	this.setState({turnCount: this.turnCounter()})
	return
    }
    openTile(cell) {
	if (cell.isFlag) {
	    return
	} else {
	    var cells = this.state.cells
	    // set cell to open state
	    cell.isOpen = true
	    // open up safe neighbors neighbors
	    if (cell.mineCount === 0 && !cell.isMine) {
		for (let neighbor of helpers.safeNeighbors(cells, cell).filter(cell => !cell.isOpen)) {
		    if (neighbor.mineCount === 0) {
			this.openTile(neighbor)
		    } else {
			neighbor.isOpen = true
		    }
		}
	    }
	}
	return
    }
    
    endGameIfWin() {
	var isWin = this.state.cells.flat().
	    filter(cell => !cell.isOpen).
	    every(cell => cell.isMine)
	if (isWin) {
	    this.setState({isGameOver: true, isWin: isWin})
	}
	return
    }

    takeTurn(cell) {
	if (!this.state.isGameOver) {
	    if (!cell.isOpen && !cell.isFlag) {
		this.incrementTurnCounter()
		if (this.state.turnCount === 0 && cell.isMine) {
		    //First turn, mine check
		    this.firstMoveReset(cell)
		    this.openTile(cell)
		} else if (cell.isMine) {
		    // Mine clicked, game over!
		    this.openTile(cell)
		    this.setState({isGameOver: true, isWin: false})
		} else {
		    this.openTile(cell)
		}
		this.endGameIfWin()
	    }
	}
    }


    isGameWon() {
	return this.state.isGameOver && this.state.isWin
    }
    isGameLost() {
	return this.state.isGameOver && !this.state.isWin
    }
    gameOverMessage() {
	if (this.state.isGameOver) {
	    if (this.isGameWon()) {
		return "Yay! You won!"
	    } else if (this.isGameLost()) {
		return "Sorry, you lost!"
	    }
	}
    }

    render() {
	var _component = this
	var myTiles = this.state.cells.map(function (item, i){
            var entry = item.map(function (cell, j) {
                return ( 
			<td key={j}> <Tile key={cell.id}
	    takeTurn={_component.takeTurn}
	    isGameOver={_component.state.isGameOver}
	    incrementTurnCounter={_component.incrementTurnCounter}
	    cell = {cell}
	    icons={_component.state.icons}/> </td>
                );
            });
            return (
                    <tr key={i}> {entry} </tr>
            );
        });

	return(
		<div>
	        <button type="button" onClick={this.reset} >
		New Game
	    </button>
		<div>
		{this.gameOverMessage()}
	    </div>
		<table className="Board">
		{myTiles}
	    </table>
		</div>
	);
    }
}
export default Board
