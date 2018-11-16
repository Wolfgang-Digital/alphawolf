import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Divider, Radio } from '@material-ui/core';
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
  one: {
    color: '#acacac',
    '&$checked': {
      color: '#112F41'
    }
  },
  two: {
    color: '#acacac',
    '&$checked': {
      color: '#068587'
    }
  },
  three: {
    color: '#acacac',
    '&$checked': {
      color: '#4FB99F'
    }
  },
  four: {
    color: '#acacac',
    '&$checked': {
      color: '#F2B134'
    }
  },
  five: {
    color: '#acacac',
    '&$checked': {
      color: '#ED553B'
    }
  },
  checked: {},
  scale: {
    display: 'flex'
  },
  minLabel: {
    color: '#112F41',
    marginRight: theme.spacing.unit * 5
  },
  maxLabel: {
    color: '#ED553B',
    marginLeft: theme.spacing.unit * 5
  }
});

const getSlider = (q, a, classes) => {
  return (
    <div className={classes.scale}>
      <Radio
        checked={a.scaleValue === 1}
        classes={{
          root: classes.one,
          checked: classes.checked,
        }}
      />
      <Radio
        checked={a.scaleValue === 2}
        classes={{
          root: classes.two,
          checked: classes.checked,
        }}
      />
      <Radio
        checked={a.scaleValue === 3}
        classes={{
          root: classes.three,
          checked: classes.checked,
        }}
      />
      <Radio
        checked={a.scaleValue === 4}
        classes={{
          root: classes.four,
          checked: classes.checked,
        }}
      />
      <Radio
        checked={a.scaleValue === 5}
        classes={{
          root: classes.five,
          checked: classes.checked,
        }}
      />
    </div>
  );
};

const ScaleAnswer = props => {
  const { index, question, answer, classes } = props;

  return (
    <>
      <Divider light />
      <div className={classes.wrapper}>
        <Typography className={classes.heading} variant='subtitle2'>
          <span className={classes.index}>
            {`Q${index}. `}
          </span>
          {question.text}
        </Typography>
        <Typography component='div' className={classes.response}>
          <Reply className={classes.icon} color={answer.scaleValue > 0 ? 'secondary' : 'disabled'} />
          {
            answer.scaleValue > 0 ?
            <>
              <span className={classes.minLabel}>{question.scale.minLabel}</span>
              {getSlider(question, answer, classes)}
              <span className={classes.maxLabel}>{question.scale.maxLabel}</span>
            </> :
            'No response.'
          }
        </Typography>
      </div>
    </>
  );
};

ScaleAnswer.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScaleAnswer);