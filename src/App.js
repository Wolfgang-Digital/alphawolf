import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Menu, ProtectedRoute } from './components';
import { Login } from './views';
import { Posts } from './views/awarewolf';

const REDIRECT_TIMEOUT = 1000 * 2;

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const user = document.cookie.split(';')
      .find(n => n.includes('alphawolf='));
    
    if (user) {
      this.setState({
        user: JSON.parse(user.replace('alphawolf=', ''))
      });
    }
  }

  userLogin = user => {
    this.setState({ user });
    document.cookie = `alphawolf=${JSON.stringify(user)};`;
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

    return (
      <Router>
        <>
          <Route
            path='/'
            render={() => this.isValidUser(user) && <Menu />}
          />
          <Switch>
            <Route
              exact path='/'
              render={() => <Login userLogin={this.userLogin} />}
            />
            <ProtectedRoute
              path='/manage-posts'
              component={() => <Posts user={user} />}
              isAuthorised={this.isValidUser(user)}
              redirectTo='/'
              timeout={REDIRECT_TIMEOUT}
            />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
