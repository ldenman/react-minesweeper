import React, { Component } from 'react';

class Tile extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    cell: props.cell,
	}
	this.handleClick = this.handleClick.bind(this)
	this.handleLeftClick = this.handleLeftClick.bind(this)
	this.handleRightClick = this.handleRightClick.bind(this)
    }
    handleClick(e) {
	if (e.type === 'click') {
	    this.handleLeftClick()
	} else if (e.type === 'contextmenu') {
	    this.handleRightClick()
	    e.preventDefault()
	}
    }
    handleLeftClick() {
	this.props.takeTurn(this.state.cell)
    }
    handleRightClick() {
	if (!this.props.isGameOver) {
	    var cell = this.state.cell
	    // toggle flag
	    cell.isFlag = !cell.isFlag
	    this.setState({cell: cell})
	}
    }
    icon() {
	var cell = this.state.cell
	if (cell.isOpen) {
	    if (cell.isMine) {
		return this.props.icons.explodedBomb
	    } else if (!cell.isMine) {
		return this.props.icons.bombs[this.state.cell.mineCount]
	    }
	
	} else if (cell.isFlag) {
	    return this.props.icons.flag
	} else {
	    return this.props.icons.blank
	}
    }
    render() {
	return(
		<img className="cell" onContextMenu={this.handleClick} onClick={this.handleClick} alt="" className="noselect" style={{height: "20px"}} src={this.icon()} />

	)
    }
}

export default Tile;
