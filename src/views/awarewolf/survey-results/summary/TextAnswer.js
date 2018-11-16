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
  table: {
    width: '100%',
    borderSpacing: 0,
    marginTop: theme.spacing.unit
  },
  row: {
    '&:nth-child(even)': {
      background: '#e3d1f4'
    },
    '&:nth-child(odd)': {
      background: '#ece6f2'
    }
  },
  cell: {
    padding: theme.spacing.unit
  },
  expandedPanel: {
    display: 'flex',
    flexDirection: 'column'
  },
  chip: {
    marginLeft: 'auto',
    marginRight: 50,
    height: 25,
    display: 'flex',
    justifyContent: 'center'
  },
});

const TextAnswer = props => {
  const { index, question, answers, classes } = props;
  const completeAnswers = answers.filter(n => n.text.trim().length > 1);

  return (
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          <span className={classes.index}>{`Q${index}. `}</span>{question.text}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expandedPanel}>
        <Typography className={classes.heading}>
          {`${completeAnswers.length} out of ${answers.length} people answered this question`}
        </Typography>
        <table className={classes.table}>
          <tbody>
            {completeAnswers.map((a, i) => (
              <tr className={classes.row} key={i}>
                <td className={classes.cell}>{a.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

TextAnswer.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    scale: PropTypes.object
  }).isRequired
};

export default withStyles(styles)(TextAnswer);