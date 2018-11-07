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
  ListItemText
} from '@material-ui/core';
import { ChevronRight, ChevronLeft, Forum, BarChart, ExitToApp } from '@material-ui/icons';

const SIDEBAR_WIDTH = 240;

const styles = theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '& div, span': {
      color: theme.palette.light
    }
  },
  paper: {
    background: theme.palette.dark
  },
  drawerOpen: {
    width: SIDEBAR_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    border: 'none'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    border: 'none',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    background: theme.palette.primary.main
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& > div, a > div': {
      '&:hover': {
        background: theme.palette.secondary.main
      }
    }
  },
  logout: {
    marginTop: 'auto'
  }
});

class Menu extends React.Component {
  state = {
    open: false
  };

  openMenu = () => this.setState({ open: true });

  closeMenu = () => this.setState({ open: false });

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Drawer
        variant='permanent'
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: classNames(classes.paper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={this.state.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={open ? this.closeMenu : this.openMenu}>
            {open ? <ChevronLeft /> : <ChevronRight />}
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
          <Link to='/'>
            <ListItem button>
              <ListItemIcon><BarChart /></ListItemIcon>
              <ListItemText primary='Survey Results' />
            </ListItem>
          </Link>
          <ListItem button className={classes.logout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);