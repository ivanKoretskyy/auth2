import React from 'react';

class Callback extends React.Component {


  componentDidMount() {
    if(/access_token|id_token|error/.test(this.props.location.hash))
    {
      this.props.auth.handleAuthentication()
    } else {
      throw new Error('incorrect callback');
    }
  }
  render() {
    return (
      <div>Callback</div>
    )
  }
}

export default Callback;