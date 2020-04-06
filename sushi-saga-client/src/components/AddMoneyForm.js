import React from 'react'

export default class AddMoneyForm extends React.Component {
  
  constructor(){
    super()
    this.state = {
      amount: 0
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    this.props.addMoney(this.state.amount)
  }

  changeState = (e) => {
    this.setState({amount: e.target.value})
  }

  render(){
    return (
      <div className = "money-form">
        <form onSubmit = {this.submitForm}>
          <input type="number" onChange = {this.changeState}></input>
          <input type="submit" value = "Add"></input>
        </form>
      </div>
    )
  }
}