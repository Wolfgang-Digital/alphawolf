import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './components';
import { Login, Home } from './views';
import { Posts } from './views/awarewolf';

const REDIRECT_TIMEOUT = 1000 * 2;

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const user = document.cookie.split(';')
      .find(n => n.includes('wolfganger='));

    if (user) {
      this.setState({
        user: JSON.parse(user.replace('wolfganger=', ''))
      });
    }
  }

  userLogin = user => {
    this.setState({ user });
    document.cookie = `wolfganger=${JSON.stringify(user)};`;
  };

  userLogout = () => {
    this.setState({ user: null });
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
            path='/manage-posts'
            component={() => <Posts user={user} />}
            isAuthorised={isAuthorised}
            redirectTo='/'
            timeout={REDIRECT_TIMEOUT}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
