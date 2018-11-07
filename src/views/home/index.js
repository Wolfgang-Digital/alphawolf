import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { format } from '../../utils';
import { Button, Paper, Typography, Avatar } from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import { Menu } from '../../components';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit
  },
  image: {
    width: '100%',
    margin: 'auto'
  },
  logout: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit
  }
});

const Home = ({ user, userLogout, classes }) => (
  <Menu>
    <section className={classes.layout}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          {
            !!user.avatar ?
            <img className={classes.image} src={user.avatar} alt='User Avatar'/> :
            <LockIcon />
          }
        </Avatar>
        <Typography component='h1' variant='h5'>
          {`Welcome ${format.toTitleCase(user.username)}`}
        </Typography>
        <Button
          type='submit'
          variant='contained'
          fullWidth
          color='primary'
          className={classes.logout}
          onClick={userLogout}
        >
          Logout
      </Button>
      </Paper>
    </section>
  </Menu>
);

Home.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }).isRequired,
  userLogout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);