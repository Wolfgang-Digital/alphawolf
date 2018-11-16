import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CircularProgress } from '@material-ui/core';
import TextAnswer from './TextAnswer';
import ScaleAnswer from './ScaleAnswer';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';
import SingleChoiceAnswer from './SingleChoiceAnswer';

const CHUNK_SIZE = 5;

const styles = {
  header: {
    display: 'flex'
  },
  title: {
    display: 'flex',
    flexDirection: 'column'
  },
  progress: {
    margin: '5px 0 0 auto'
  }
};

const getAnswers = (answers, id) => answers.map(n => n.find(m => m.questionId === id));

const getPanel = (q, a, i) => {
  return q.type === 'text' ?
    (<TextAnswer
      key={q.id}
      index={i}
      question={q}
      answers={a}
    />) :
    q.type === 'scale' ?
      (<ScaleAnswer
        key={q.id}
        index={i}
        question={q}
        answers={a}
      />) :
    q.type === 'multiple' ?
      q.allowMultipleAnswers ?
        (<MultipleChoiceAnswer
          key={q.id}
          index={i}
          question={q}
          answers={a}
        />) :
        (<SingleChoiceAnswer
          key={q.id}
          index={i}
          question={q}
          answers={a}
        />) : null;
};

class Summary extends Component {
  state = {
    renderQuestions: [],
    iteration: 0,
    loading: false
  };

  getQuestions = () => {
    const { iteration } = this.state;
    const { questions } = this.props.survey;
    const renderQuestions = questions.slice(iteration * CHUNK_SIZE, iteration * CHUNK_SIZE + CHUNK_SIZE);
    this.setState(state => ({
      renderQuestions: [...state.renderQuestions, ...renderQuestions],
      iteration: state.iteration + 1
    }));
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.getQuestions();
    this.interval = setInterval(() => {
      this.getQuestions();
      if (this.state.renderQuestions.length >= this.props.survey.questions.length) {
        clearInterval(this.interval);
        this.setState({ loading: false });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { title, answers } = this.props.survey;
    const { classes } = this.props;
    const { renderQuestions, loading } = this.state;

    return (
      <>
        <CardContent className={classes.header}>
          <div className={classes.title}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1">{`${answers.length} responses`}</Typography>
          </div>
          {loading && <CircularProgress size={42} className={classes.progress} />}
        </CardContent>
        {renderQuestions.map((q, i) => {
          const a = getAnswers(answers, q.id);
          return getPanel(q, a, i + 1)
        })}
      </>
    );
  }
}

Summary.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isRequired: PropTypes.bool.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
      scale: PropTypes.object
    })
  )
};

export default withStyles(styles)(Summary);