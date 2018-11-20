import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { awarewolfAPI, errorHandler, constants, format } from '../../utils';
import { Button } from '@material-ui/core';
import { ResultsTable } from '../../components';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  warning: {
    margin: 'auto',
    textAlign: 'center',
    color: theme.palette.error.main
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
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' }
];

class Users extends Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    const { user, enqueueSnackbar } = this.props;

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
              role: n.roles.includes('admin') && 'Admin',
              user: format.toTitleCase(n.username)
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
    const { classes } = this.props;

    return (
      <>
        <p className={classes.warning}>
          This page is under construction.
        </p>
        <ResultsTable
          tableTitle='Manage Users'
          data={users}
          rows={rows}
          loading={loading}
        />
      </>
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