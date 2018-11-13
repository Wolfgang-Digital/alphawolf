import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, Typography, Divider, ListItem, CardContent } from '@material-ui/core';

const styles = theme => ({
  header: {
    padding: 8 * 3
  }
});

const Summary = ({ survey, classes }) => {
  const { title, questions, answers } = survey;

  return (
    <>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{`${answers.length} responses`}</Typography>
      </CardContent>
      <Divider />
      <List>
      {questions.map(q => {
        return <ListItem key={q.id}>{q.text}</ListItem>
      })}
      </List>
    </>
  );
};

Summary.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default withStyles(styles)(Summary);