import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography, Divider } from '@material-ui/core';
import { Reply } from '@material-ui/icons';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  index: {
    marginRight: theme.spacing.unit,
  },
  wrapper: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    display: 'flex',
    flexDirection: 'column'
  },
  icon: {
    transform: 'rotate(180deg)',
    marginRight: theme.spacing.unit * 2,
    fontSize: theme.typography.pxToRem(28)
  },
  response: {
    fontSize: theme.typography.pxToRem(15),
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[500]
  },
  highlight: {
    color: theme.palette.secondary.dark
  }
});

const TextAnswer = props => {
  const { index, question, answer, classes } = props;
  const displayAnswer = answer.length > 1 ? answer : 'No response.';

  return (
    <>
      <Divider light />
      <div className={classes.wrapper}>
        <Typography className={classes.heading} variant='subtitle2'>
          <span className={classes.index}>
            {`Q${index}. `}
          </span>
          {question}
        </Typography>
        <Typography className={classNames(classes.response, answer.length > 1 && classes.highlight)}>
          <Reply className={classes.icon} color={answer.length > 1 ? 'secondary' : 'disabled'} />
          {displayAnswer}
        </Typography>
      </div>
    </>
  );
};

TextAnswer.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextAnswer);