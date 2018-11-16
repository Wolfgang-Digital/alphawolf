import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography, Divider, List, ListItem, ListItemText } from '@material-ui/core';
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
  },
  listItem: {
    padding: 0
  },
  listText: {
    color: theme.palette.grey[500]
  }
});

const getSelectedOptions = (q, a, classes) => {
  return (
    <List>
      {q.options.map((n, i) => {
        return (
          <ListItem key={i} className={classes.listItem}>
            <ListItemText 
              primary={n} 
              classes={{
                primary: a.options.includes(i) ? classes.highlight : classes.listText
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const ChoiceAnswer = props => {
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
        <Typography component='div' className={classNames(classes.response, answer.length > 1 && classes.highlight)}>
          <Reply className={classes.icon} color={answer.options.length > 0 ? 'secondary' : 'disabled'} />
          {answer.options.length > 0 ? getSelectedOptions(question, answer, classes) : 'No response.'}
        </Typography>
      </div>
    </>
  );
};

ChoiceAnswer.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChoiceAnswer);