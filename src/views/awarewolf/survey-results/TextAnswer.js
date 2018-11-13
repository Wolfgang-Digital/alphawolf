import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const TextAnswer = props => {
  const { question, answers } = props;

  return (
    <>
      <Typography variant="h6">{question.text}</Typography>
      <Typography variant="subtitle1" color='textSecondary'>{`${answers.length} responses`}</Typography>
    </>
  )
}

TextAnswer.propTypes = {
  
};

export default TextAnswer;