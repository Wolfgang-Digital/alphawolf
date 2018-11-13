import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({

});

const ScaleAnswer = props => {
  const { classes, question, answers } = props;

  return (
    <>
      <Typography variant="h6">{question.text}</Typography>
      <Typography variant="subtitle1" color='textSecondary'>{`${answers.length} responses`}</Typography>
    </>
  )
}

ScaleAnswer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScaleAnswer);