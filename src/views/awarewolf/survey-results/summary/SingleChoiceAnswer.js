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
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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
  }
});

const COLOURS = [
  '#275B78', '#287A72', '#F2AA2E', '#472650', '#A6261D'
];

const formatData = (question, answers) => {
  return question.options.map((q, i) => {
    return {
      name: q,
      value: answers.filter(a => a.options.includes(i)).length
    };
  })
};

const SingleChoiceAnswer = props => {
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
        <PieChart
          width={500}
          height={280}
        >
          <Pie
            data={data}
            cx={200}
            cy={120}
            outerRadius={100}
            dataKey='value'
          >
            {data.map((n, i) => {
              return <Cell key={i} fill={COLOURS[i % COLOURS.length]} />;
            })}
          </Pie>
          <Tooltip />
          <Legend
            width={800}
            align='left'
            iconType='triangle'
            iconSize={18}
          /> 
        </PieChart>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

SingleChoiceAnswer.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    scale: PropTypes.object
  }).isRequired
};

export default withStyles(styles)(SingleChoiceAnswer);