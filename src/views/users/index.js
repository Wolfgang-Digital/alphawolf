import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { awarewolfAPI, errorHandler, constants, format } from '../../utils';
import { Button, Avatar } from '@material-ui/core';
import { ResultsTable } from '../../components';
import { withStyles } from '@material-ui/core/styles';
import Person from '@material-ui/icons/Person';

const styles = theme => ({
  avatar: {
    width: 24,
    height: 24,
    marginRight: 4,
    background: theme.palette.secondary.main
  },
  image: {
    width: '100%',
    margin: 'auto'
  },
  user: {
    display: 'flex',
    alignItems: 'center'
  }
});

const snackbarOptions = {
  variant: 'error',
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top'
  },
  autoHideDuration: constants.SNACKBAR_DURATION,
  action: <Button size="small">Dismiss</Button>
};

const rows = [
  { id: 'user', numeric: false, disablePadding: false, label: 'User' },
  { id: 'roles', numeric: false, disablePadding: false, label: 'Roles' }
];

class Users extends Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    const { user, enqueueSnackbar, classes } = this.props;

    this.setState({ loading: true }, async () => {

      this.timer = setTimeout(() => {
        this.setState({ loading: false });
        enqueueSnackbar('Connection timeout.', snackbarOptions);
      }, constants.FETCH_TIMEOUT);

      const res = await awarewolfAPI.fetchUsers(user.token);

      clearTimeout(this.timer);
      this.setState({ loading: false });

      if (res && res.success) {
        this.setState({
          users: res.data.map(n => {
            return {
              _id: n._id,
              roles: format.toTitleCase(n.roles.join(', ')),
              user: 
              <div className={classes.user}>
                <Avatar className={classes.avatar}>
                  {!!n.avatar ?<img className={classes.image} src={n.avatar} alt='User Avatar' /> :<Person />}
                </Avatar>
                {format.toTitleCase(n.username)}
              </div>
            };
          })
        });
      } else {
        const error = errorHandler.parseServerMessage(res);
        enqueueSnackbar(error, snackbarOptions);
      }
    });
  }

  render() {
    const { users, loading } = this.state;

    return (
      <ResultsTable
        tableTitle='Manage Users'
        data={users}
        rows={rows}
        loading={loading}
      />
    );
  }
}

Users.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(withSnackbar(Users));