import * as React from 'react';

class Profile extends React.Component {

  state = {
    profile: null,
    error: null,
  }

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile() {
    this.props.auth.getUserProfile((profile, error) => this.setState({profile, error}))
  }

  render() {
    return (
    <div>
      <h2>Profile</h2>
      {!this.state.profile
        ? null
        : (
        <div>
          <pre>{JSON.stringify(this.state.profile, null,2)}</pre>
          <img src={this.state.profile.picture}/>
        </div>
        )
      }
    </div>
    )
  }
} 

export default Profile;