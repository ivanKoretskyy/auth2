import React, { Component } from 'react';

export class Public extends Component {

  state = {
    message: '',
    error: null,
  }
  
  componentDidMount() {
    fetch('/public').then(res => {
      if(res.ok) {
        return res.json()
      }
      throw new Error('Request failed')
    })
    .then(response => {this.setState({message: response.message})})
    .catch(error => { this.setState({error})})
  }
  render() {
    return (
    <div>
      <h1>Public</h1>
      <p>{this.state.message}</p>
    </div>
    )
  }
}