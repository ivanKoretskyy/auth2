import { WebAuth } from 'auth0-js'

export class Auth {
  constructor(history) {
    this.history = history; // for communicate with react router
    this.userProfile = null;
    this.auth0 = new WebAuth({
      // settings needed for auth 0
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: "profile openid email",
    })
  }

  login = () => {
    this.auth0.authorize(); // will redirect to aut0 login page
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if(authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push('/');
      } else if(err){
        this.history.push(('/'))
        alert('error: ' + JSON.stringify(err));
      }
    })
  }

  setSession = authResult => {
    console.info(authResult);
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: 'http://localhost:3000'
    })
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');

    if(!accessToken) {
      throw new Error('No access token');
    }

    return accessToken;
  }

  getIdToken = () => {
    const idToken = localStorage.getItem('id_token');

    if(!idToken) {
      throw new Error('No access token');
    }

    return idToken;
  }
  getUserProfile = cb => {
    this.auth0.client.userInfo(this.getAccessToken(), (err, userProfile) => {
      if(userProfile){
        this.userProfile = userProfile
      }
      cb(userProfile, err)
    })
  }
}