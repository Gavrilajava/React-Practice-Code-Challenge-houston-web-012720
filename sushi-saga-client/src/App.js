import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor() {
    super()
    this.state = {
      money: 100,
      sushis: [],
      current: 0,
      eaten: []
    }
  }

  componentDidMount() {
    fetch(API)
      .then(resp => resp.json())
      .then(sushis => this.setState({sushis}))
  }

  eatSushi = (id) => {
    let sushi = this.state.sushis.find(s => s.id === id)
    if (sushi.price <= this.state.money){
      this.setState({
        money: this.state.money - sushi.price,
        eaten: [...this.state.eaten, sushi]
      })
    }
  }
    

  
  moreSushi = () => {
    if (this.state.current + 4 < this.state.sushis.length){
      this.setState({current: this.state.current + 4})
    }
  }

  getNextSushis = () => {
    return this.state.sushis.slice(this.state.current, this.state.current+ 4).map(sushi => {
      if (this.state.eaten.find(s => s.id === sushi.id)){
        return {...sushi, eaten: true}
      }
      else {
        return {...sushi, eaten: false}
      }
    })
  }

  addMoney = (amount) => {
    this.setState({money: this.state.money + parseInt(amount)})
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis = {this.getNextSushis()} moreSushi = {this.moreSushi} eatSushi = {this.eatSushi}/>
        <Table money = {this.state.money} eaten = {this.state.eaten} addMoney = {this.addMoney}/>
      </div>
    );
  }
}

export default App;