import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from 'recharts';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panel: {
    borderRadius: 0
  },
  index: {
    marginRight: theme.spacing.unit,
    fontWeight: 'bold'
  },
  expandedPanel: {
    display: 'flex',
    flexDirection: 'column'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 40
  },
  labels: {
    display: 'flex',
    color: theme.palette.secondary.main,
    width: 600
  }
});

const COLOURS = [
  '#b56e8e', '#6c718e'
];

const formatData = (question, answers) => {
  return question.options.map((q, i) => {
    return {
      name: q,
      value: answers.filter(a => a.options.includes(i)).length
    };
  })
};

const MultipleChoiceAnswer = props => {
  const { index, classes, question, answers } = props;
  const completedAnswers = answers.filter(n => n.options.length > 0).length;
  const data = formatData(question, answers);

  return (
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          <span className={classes.index}>{`Q${index}. `}</span>{question.text}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expandedPanel}>
        <Typography className={classes.heading}>
          {`${completedAnswers} out of ${answers.length} people answered this question`}
        </Typography>
          <div className={classes.wrapper}>
            <BarChart 
              data={data} 
              width={800} 
              height={question.options.length * 55} 
              layout='vertical'
            >
              <YAxis dataKey='name' type='category' width={205} />
              <XAxis  type='number' />
              <Tooltip />
              <Bar dataKey='value'>
                {data.map((n, i) => {
                  return <Cell key={i} fill={COLOURS[i % COLOURS.length]} />;
                })}
              </Bar>
            </BarChart>
          </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

MultipleChoiceAnswer.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    scale: PropTypes.object
  }).isRequired
};

export default withStyles(styles)(MultipleChoiceAnswer);