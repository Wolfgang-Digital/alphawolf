import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  CircularProgress
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import logo from '../../images/logo.svg';

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
  form: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '90%'
  },
  avatar: {
    background: '#fff',
    '& img': {
      width: '100%'
    }
  }
});

const LoginForm = props => {
  const { email, password, handleChange, handleSubmit, loading, classes } = props;

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={logo} alt='Wolfgang Logo' />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form}>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input
              id='email'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={handleChange('email')}
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              name='password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={handleChange('password')}
            />
          </FormControl>
          <div className={classes.wrapper}>
            <Button
              type='submit'
              variant='contained'
              fullWidth
              color='primary'
              className={classes.submit}
              onClick={handleSubmit}
              disabled={loading}
            >
              Login
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </form>
      </Paper>
    </main>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(LoginForm);