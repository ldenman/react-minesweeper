import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    size: 8,
	    mineCount: 10,
    	    icons: {
		blank: 'http://i.imgur.com/HM1e3Tbb.jpg',
		pressed: 'http://i.imgur.com/bGT8xGEb.jpg',
		exposedBomb: 'http://i.imgur.com/pTJ8Swhb.jpg',
		explodedBomb: 'http://i.imgur.com/UFmXprFb.jpg',
		flag: 'http://i.imgur.com/nLPvW15b.jpg',
		// Index is # of adjacent bombs
		bombs: [
		    'http://i.imgur.com/Flqdqi1b.jpg', // 0
		    'http://i.imgur.com/bM8oExob.jpg', // 1
		    'http://i.imgur.com/bQKSbqYb.jpg', // 2
		    'http://i.imgur.com/5jNcEeVb.jpg', // 3
		    'http://i.imgur.com/BnxjHgHb.jpg', // 4
		    'http://i.imgur.com/RaFrMYcb.jpg', // 5
		    'http://i.imgur.com/GlwQOy0b.jpg', // 6
		    'http://i.imgur.com/8ngsVa8b.jpg', // 7
		    'http://i.imgur.com/lJ8P1wab.jpg'  // 8
		]
	    }
	};
	this.setSize = this.setSize.bind(this)
	this.setMineCount = this.setMineCount.bind(this)

    }
    setSize(x) {
	this.setState({size: parseInt(x.target.value)}, () => {this.render()})
    }
    setMineCount(x) {
	this.setState({mineCount: parseInt(x.target.value)})
    }
    render() {
	return (
		<div>
		<h1>
		Play MineSweeper!
	    </h1>
		<label>Board size: </label>
		<select onChange={this.setSize}>
		<option value="8" >8x8</option>
		<option value="9" >9x9</option>
		<option value="10" >10x10</option>
		<option value="11" >11x11</option>
		<option value="12" >12x12</option>
		<option value="13" >13x13</option>
		<option value="14" >14x14</option>
		<option value="15" >15x15</option>
		<option value="16" >16x16</option>
		</select>
		<br />
		<label>Mines : </label>
		<select onChange={this.setMineCount}>
		<option value="10" >10</option>
		<option value="11" >11</option>
		<option value="12" >12</option>
		<option value="13" >13</option>
		<option value="14" >14</option>
		<option value="15" >15</option>
		<option value="16" >16</option>
		<option value="17" >17</option>
		<option value="18" >18</option>
		<option value="19" >19</option>
		<option value="20" >20</option>
		</select>

	    <Board mineCount={this.state.mineCount} icons={this.state.icons} size={this.state.size}/>
	    </div>
	);
    }
}

export default App;
