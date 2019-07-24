import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { awarewolfAPI, errorHandler, constants, format } from '../../../utils';
import { Button } from '@material-ui/core';
import { ResultsTable } from '../../../components';
import { withRouter } from 'react-router-dom';
import Actions from './Actions';

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
  { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
  { id: 'author', numeric: false, disablePadding: true, label: 'Author' },
  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'numQuestions', numeric: true, disablePadding: true, label: 'Questions' },
  { id: 'numResponses', numeric: true, disablePadding: true, label: 'Responses' },
  { id: 'completion', numeric: true, disablePadding: true, label: 'Completion (%)', tooltip: '% of total users that have completed this survey'},
  { id: 'actions', numeric: true, disablePadding: false, label: '' }
];


class Surveys extends Component {
  state = {
    surveys: [],
    loading: false
  };

  componentDidMount() {
    const { user, enqueueSnackbar } = this.props;

    this.setState({ loading: true }, async () => {

      this.timer = setTimeout(() => {
        this.setState({ loading: false });
        enqueueSnackbar('Connection timeout.', snackbarOptions);
      }, constants.FETCH_TIMEOUT);

      const surveyData = await awarewolfAPI.fetchData({
        endpoint: 'surveys',
        token: user.token
      });

      const userData = await awarewolfAPI.fetchUsers(user.token);

      clearTimeout(this.timer);
      this.setState({ loading: false });

      if (surveyData && surveyData.success) {
        this.setState({
          surveys: surveyData.data.filter(survey => {
            if (!user.roles.includes('manager')) {
              return false;
            }
          }).map(n => {
            const  completion = (userData && userData.success) ? 
              ((n.userResponses.length / userData.data.length) * 100).toFixed(2) : 
              'Unavailable'

            return {
              _id: n._id,
              date: Date.parse(n.createdAt),
              title: n.title,
              author: format.toTitleCase(n._author.username),
              numQuestions: n.questions.length,
              numResponses: n.userResponses.length,
              completion 
            };
          })
        });
      } else {
        const error = errorHandler.parseServerMessage(surveyData);
        enqueueSnackbar(error, snackbarOptions);
      }
    });
  }

  open = id => {
    this.props.history.push(`/survey-results/${id}`);
  };

  openInApp = id => {
    window.open(`https://awarewolf.netlify.com/surveys/${id}`, '_blank');
  };

  render() {
    const { surveys, loading } = this.state;

    return (
      <ResultsTable
        tableTitle='Survey Results'
        data={surveys}
        rows={rows}
        actionBar={Actions}
        loading={loading}
        open={this.open}
        openInApp={this.openInApp}
      />
    );
  }
}

Surveys.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withRouter(withSnackbar(Surveys));