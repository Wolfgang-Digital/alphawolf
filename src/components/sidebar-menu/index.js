import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Drawer } from '@material-ui/core';

class SidebarMenu extends React.Component {
  state = {
    open: false
  };

  toggleMenu = () => this.setState(prev => ({ open: !prev.open }));

  render() {
    return (
      <>
        <Drawer open={this.state.open} onClose={this.toggleMenu}>
          <div>
            HELLO
          </div>
        </Drawer>
      </>
    ); 
  }
}

export default SidebarMenu;