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
  '#112F41', '#068587', '#4FB99F', '#F2B134', '#ED553B'
];

const formatData = answers => {
  return [
    { name: '1', value: answers.filter(n => n.scaleValue === 1).length },
    { name: '2', value: answers.filter(n => n.scaleValue === 2).length },
    { name: '3', value: answers.filter(n => n.scaleValue === 3).length },
    { name: '4', value: answers.filter(n => n.scaleValue === 4).length },
    { name: '5', value: answers.filter(n => n.scaleValue === 5).length }
  ];
};

const ScaleAnswer = props => {
  const { index, classes, question, answers } = props;
  const completedAnswers = answers.filter(n => n.scaleValue > 0).length;
  const data = formatData(answers);

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
          <BarChart data={data} width={600} height={250}>
            <XAxis dataKey='name'/>
            <YAxis />
            <Tooltip />
            <Bar dataKey='value'>
              {data.map((n, i) => {
                return <Cell key={i} fill={COLOURS[i]} />;
              })}
            </Bar>
          </BarChart>
        </div>
        <div className={classes.labels}>
          <span>{question.scale.minLabel}</span>
          <span style={{ marginLeft: 'auto' }}>{question.scale.maxLabel}</span>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

ScaleAnswer.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    scale: PropTypes.object
  }).isRequired
};

export default withStyles(styles)(ScaleAnswer);