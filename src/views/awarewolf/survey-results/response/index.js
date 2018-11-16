import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CardContent, IconButton } from '@material-ui/core';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';
import TextAnswer from './TextAnswer';
import ScaleAnswer from './ScaleAnswer';
import ChoiceAnswer from './ChoiceAnswer';

const styles = theme => ({
  header: {
    display: 'flex'
  },
  title: {
    display: 'flex',
    flexDirection: 'column'
  },
  controls: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  }
});

const getPanel = (q, a, i) => {
  return q.type === 'text' ?
    (<TextAnswer
      key={q.id}
      index={i}
      question={q.text}
      answer={a.text}
    />) :
    q.type === 'scale' ?
    (<ScaleAnswer
      key={q.id}
      index={i}
      question={q}
      answer={a}
    />) :
    q.type === 'multiple' ? 
    (<ChoiceAnswer
      key={q.id}
      index={i}
      question={q}
      answer={a}
    />) : null;
};

const getNumQuestionsAnswered = (q, a) => {
  return a.reduce((acc, curr) => {
    const question = q.find(n => n.id === curr.questionId);
    if (question.type === 'text' && curr.text.length > 1) return acc + 1;
    if (question.type === 'scale' && curr.scaleValue > 0) return acc + 1;
    if (question.type === 'multiple' && curr.options.length > 0) return acc + 1;
    return acc;
  }, 0);
};

class InidividualResponse extends Component {
  state = {
    index: 0
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  adjustIndex = value => {
    const max = this.props.survey.answers.length;
    const index = (((this.state.index + value) % max) + max) % max;
    this.setState({ index });
  };

  setIndex = index => this.setState({ index });

  handleKeyPress = e => {
    if (e.code === 'ArrowRight') {
      this.adjustIndex(1);
    } else if (e.code === 'ArrowLeft') {
      this.adjustIndex(-1);
    }
  };

  render() {
    const { classes, survey } = this.props;
    const { index} = this.state;
    const response = survey.answers[index];

    return (
      <>
        <CardContent className={classes.header} onKeyDown={this.handleKeyPress}>
          <div className={classes.title}>
            <Typography variant="h6">{survey.title}</Typography>
            <Typography variant="subtitle1">{`${getNumQuestionsAnswered(survey.questions, response)} answers out of ${survey.questions.length}`}</Typography>
          </div>
          <div className={classes.controls}>
            <IconButton onClick={() => this.adjustIndex(-1)}>
              <NavigateBefore />
            </IconButton>
            <Typography variant="subtitle1">{`Showing ${index + 1} of ${survey.answers.length}`}</Typography>
            <IconButton onClick={() => this.adjustIndex(1)}>
              <NavigateNext />
            </IconButton>
          </div>
        </CardContent>
        {survey.questions.map((q, i) => {
          const a = response.find(n => n.questionId === q.id);
          return getPanel(q, a, i + 1);
        })}
      </>
    );
  }
}

InidividualResponse.propTypes = {
  classes: PropTypes.object.isRequired,
  survey: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    answers: PropTypes.arrayOf(PropTypes.array).isRequired
  }).isRequired
};

export default withStyles(styles)(InidividualResponse);