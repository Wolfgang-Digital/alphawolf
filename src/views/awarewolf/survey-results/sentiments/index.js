import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WatsonData from './WatsonData';

class SentimentAnalysis extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const { survey: { questions, answers } } = this.props;
    const answerText = questions.filter(n => n.type === 'text')
      .map(q => {
        return {
          question: q.text,
          answers: answers.reduce((acc, curr) => {
            let txt = curr.find(a => a.questionId === q.id).text.trim();
            if (txt.length > 1) {
              if (txt.charAt(txt.length - 1) !== '.') txt += '. ';
              return acc + txt;
            }
            return acc;
          }, '')
        }
      });
    this.setState({ data: answerText });
  }

  render() {
    const { data } = this.state;
    const { user } = this.props;

    return (
      <>
        {
          data.map((d, i) => {
            return <WatsonData user={user} text={d} key={i} />
          })
        }
      </>
    )
  }
}

SentimentAnalysis.propTypes = {
  survey: PropTypes.object.isRequired
};

export default SentimentAnalysis;