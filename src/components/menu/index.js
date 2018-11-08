import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Avatar
} from '@material-ui/core';
import { ChevronLeft, Forum, BarChart, ExitToApp } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './styles';
import logo from '../../images/logo.svg';

class Menu extends React.Component {
  state = {
    open: false
  };

  openMenu = () => this.setState({ open: true });

  closeMenu = () => this.setState({ open: false });

  render() {
    const { classes, userLogout } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.openMenu}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" noWrap>
              Wolfgang Digital Dashboard
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <Avatar className={classes.avatar}>
              <img src={logo} alt='Wolfgang Logo' />
            </Avatar>
            <IconButton onClick={this.closeMenu}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>
            <Link to='/manage-posts'>
              <ListItem button>
                <ListItemIcon><Forum /></ListItemIcon>
                <ListItemText primary='Manage Posts' />
              </ListItem>
            </Link>
            <Link to='/survey-results'>
              <ListItem button>
                <ListItemIcon><BarChart /></ListItemIcon>
                <ListItemText primary='Survey Results' />
              </ListItem>
            </Link>
            <Divider className={classes.pushBottom}/>
            <ListItem button onClick={userLogout}>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  userLogout: PropTypes.func.isRequired
};

export default withStyles(styles)(Menu);