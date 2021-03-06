import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { awarewolfAPI, constants } from '../../../../utils';

class WatsonData extends Component {
  state = {
    tone: null,
    language: null,
    loading: false,
    error: false
  };
  
  componentDidMount() {
    this.makeRequest('tone');
    this.makeRequest('language');
  }

  makeRequest = type => {
    const { user, text } = this.props;

    this.setState({ loading: true }, async () => {

      this.timer = setTimeout(() => {
        this.setState({ loading: false, error: true });
      }, constants.FETCH_TIMEOUT);

      const res = await awarewolfAPI.analyse({
        endpoint: type,
        text: text.answers,
        token: user.token
      });

      clearTimeout(this.timer);
      this.setState({ loading: false });

      if (res && res.data) {
        console.log(res.data);
        this.setState({ [type]: res.data });
      } else {
        this.setState({ error: true });
      }
    });
  };

  render() {
    const { tone, language } = this.state;
    const { text } = this.props;

    return (
      <>
        <p>{text.question}</p>
        {tone && tone.document_tone.tones.map((n, i) => {
          return <li key={i}>{`Tone: ${n.tone_name} ---> Score: ${n.score}`}</li>;
        })}

      </>
    );
  }
}

WatsonData.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string.isRequired
  }).isRequired,
  text: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.string.isRequired
  }).isRequired
};

export default WatsonData;