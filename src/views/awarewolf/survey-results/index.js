import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { awarewolfAPI, errorHandler, constants } from '../../../utils';
import { Button } from '@material-ui/core';

const snackbarOptions = {
  variant: 'error',
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top'
  },
  autoHideDuration: constants.SNACKBAR_DURATION,
  action: <Button size="small">Dismiss</Button>
};

class SurveyResults extends Component {
  state = {
    survey: null,
    loading: false
  };

  componentDidMount() {
    const { user, enqueueSnackbar, match } = this.props;

    this.setState({ loading: true }, async () => {

      this.timer = setTimeout(() => {
        this.setState({ loading: false });
        enqueueSnackbar('Connection timeout.', snackbarOptions);
      }, constants.FETCH_TIMEOUT);

      const res = await awarewolfAPI.fetchData({
        endpoint: `surveys/${match.params.id}`,
        token: user.token
      });

      clearTimeout(this.timer);
      this.setState({ loading: false });

      if (res && res.success) {
        this.setState({ survey: res.data });
      } else {
        const error = errorHandler.parseServerMessage(res);
        enqueueSnackbar(error, snackbarOptions);
      }
    });
  }

  render() {
    const { survey, loading } = this.state;
    
    return (
      <>
        { (!survey && !loading) && <>No results.</> }
      </>
    );
  }
}

SurveyResults.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(withSnackbar(SurveyResults));