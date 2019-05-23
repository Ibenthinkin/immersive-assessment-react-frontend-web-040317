import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'

class AccountContainer extends Component {

  constructor() {
    super()
      this.state = {
        data: [],
        filtered: []
      }
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://boiling-brook-94902.herokuapp.com/transactions')
      const result = await response.json()
      await this.setState({
        data: result,
        filtered: result
      })
    } catch(error) {
      alert(error)
    }
}

handleChange = (event) => {
  const { data } = this.state
  const { value } = event.target

    const filteredAccounts = data.filter(transaction => {
      return transaction.description.toLowerCase()
      .includes(value.toLowerCase())
    })
      this.setState({
        filtered: filteredAccounts
      })
}


  render() {
    return (
      <div>
      <Search handleChange={this.handleChange}/>
      <TransactionsList data={this.state.filtered}/>
      </div>
    )
  }
}

export default AccountContainer
