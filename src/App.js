import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Menu, ProtectedRoute } from './components';
import { Login, Home, Users } from './views';
import { Posts, Surveys, SurveyResults } from './views/awarewolf';
import { constants } from './utils';

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const userCookie = document.cookie.split(';')
      .find(n => n.includes('wolfganger='));

    if (userCookie) {
      const user = JSON.parse(userCookie.replace('wolfganger=', ''));
      if (user.roles.includes('admin')) {
        this.setState({ user });
      }
    }
  }

  userLogin = user => {
    this.setState({ user });
    document.cookie = `wolfganger=${JSON.stringify(user)};`;
  };

  userLogout = () => {
    this.setState({ user: null });
    const cookies = document.cookie.split(';');
    cookies.forEach(c => {
      const eqPos = c.indexOf('=');
      const name = eqPos > -1 ? c.substr(0, eqPos) : c;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  };

  isValidUser = () => {
    const { user } = this.state;
    return !!user && !!user.username && !!user.id && !!user.token && user.roles.includes('admin');
  };

  render() {
    const { user } = this.state;
    const isAuthorised = this.isValidUser(user);

    return (
      <Router>
        <Menu userLogout={this.userLogout} isAuthorised={isAuthorised}>
          <Switch>
            <Route
              exact path='/'
              render={() =>
                isAuthorised ?
                  <Home user={user} userLogout={this.userLogout} /> :
                  <Login userLogin={this.userLogin} />
              }
            />
            <ProtectedRoute
              path='/survey-results/:id'
              component={() => <SurveyResults user={user} />}
              isAuthorised={isAuthorised}
              redirectTo='/'
              timeout={constants.REDIRECT_TIMEOUT}
            />
            <ProtectedRoute
              exact path='/manage-posts'
              component={() => <Posts user={user} />}
              isAuthorised={isAuthorised}
              redirectTo='/'
              timeout={constants.REDIRECT_TIMEOUT}
            />
            <ProtectedRoute
              exact path='/survey-results'
              component={() => <Surveys user={user} />}
              isAuthorised={isAuthorised}
              redirectTo='/'
              timeout={constants.REDIRECT_TIMEOUT}
            />
            <ProtectedRoute
              path='/manage-users'
              component={() => <Users user={user} />}
              isAuthorised={isAuthorised}
              redirectTo='/'
              timeout={constants.REDIRECT_TIMEOUT}
            />
          </Switch>
        </Menu>
      </Router>
    );
  }
}

export default App;
