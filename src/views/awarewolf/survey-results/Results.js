import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Paper, CircularProgress, Divider } from '@material-ui/core';
import { Dvr, Equalizer } from '@material-ui/icons';
import Summary from './summary';
import IndividialResponse from './response';

const styles = {
  root: {
    flexGrow: 1
  },
  wrapper: {
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    margin: 'auto'
  }
};

class Results extends Component {
  state = {
    value: 0
  };

  handleChange = (e, value) => this.setState({ value });

  render() {
    const { classes, survey, loading } = this.props;
    const { value } = this.state;

    if (loading || !survey) {
      return (
        <>
          {loading &&
            <div className={classes.wrapper}>
              <CircularProgress size={52} className={classes.progress} />
            </div>
          }
        </>
      )
    }

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor='secondary'
          textColor='secondary'
        >
          <Tab label='SUMMARY' icon={<Equalizer />} />
          <Tab label='INDIVIDUAL RESPONSES' icon={<Dvr />} />
        </Tabs>
        <Divider />
        {value === 0 && <Summary survey={survey} />}
        {value === 1 && <IndividialResponse survey={survey} />}
      </Paper>
    );
  }
}

Results.propTypes = {
  classes: PropTypes.object.isRequired,
  survey: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    answers: PropTypes.arrayOf(PropTypes.array)
  })
};

export default withStyles(styles)(Results);