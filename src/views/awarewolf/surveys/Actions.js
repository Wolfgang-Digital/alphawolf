import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';
import { OpenInBrowser, BarChart } from '@material-ui/icons';

const Actions = props => {
  const { id, viewSurveyResults } = props;

  return (
    <>
      <Tooltip title="View results">
        <IconButton aria-label="Results" onClick={() => viewSurveyResults(id)}>
          <BarChart />
        </IconButton>
      </Tooltip>
      <Tooltip title="Open in Awarewolf">
        <IconButton aria-label="Open In App">
          <OpenInBrowser />
        </IconButton>
      </Tooltip>
    </>
  );
};

Actions.propTypes = {
  id: PropTypes.string.isRequired,
  viewSurveyResults: PropTypes.func.isRequired
};

export default Actions;