import React, { Component } from 'react';

export class Private extends Component {

  state = {
    message: '',
    error: null,
  }
  
  componentDidMount() {
    const accessToken = this.props.auth.getAccessToken();
    debugger;
    fetch('/private', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {
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
      <h1>Private</h1>
      <p>{this.state.message}</p>
    </div>
    )
  }
}