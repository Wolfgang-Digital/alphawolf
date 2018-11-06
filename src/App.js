import React, { Component } from 'react';

import { SidebarMenu } from './components';
import { Login } from './views';

class App extends Component {
  state = {
    user: undefined
  };

  userLogin = user => {
    console.log(user);
    this.setState({ user });
  };

  userLogout = () => {
    this.setState({ user: undefined });
  };

  render() {
    return (
      <>
        <SidebarMenu />
        <Login userLogin={this.userLogin} />
      </>
    );
  }
}

export default App;
