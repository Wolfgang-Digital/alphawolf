import React from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  wrapper: {
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    margin: 'auto'
  }
});

const PostTable = props => {
  const { posts, loading, classes } = props;

  return (
    <>
      {loading &&
        <div className={classes.wrapper}>
          <CircularProgress size={52} className={classes.progress} />
        </div>
      }
      {posts.map((n, i) => <li key={i}>{n.title}</li>)}
    </>
  );
};

PostTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostTable);