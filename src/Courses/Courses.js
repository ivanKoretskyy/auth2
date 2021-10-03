import React, { Component } from 'react';

export class Courses extends Component {

  state = {
    courses: [],
    error: null,
  }
  
  componentDidMount() {
    const accessToken = this.props.auth.getAccessToken();
    fetch('/course', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {
      if(res.ok) {
        return res.json()
      }
      throw new Error('Request failed')
    })
    .then(response => {this.setState({courses: response.courses})})
    .catch(error => { this.setState({error})})
  }
  render() {
    return (
    <div>
      <h1>Courses</h1>
      <ul>{this.state.courses.map(course => (<div key={course.id}>{course.name}</div>))}</ul>
    </div>
    )
  }
}