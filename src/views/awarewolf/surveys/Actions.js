import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';
import { Delete, OpenInBrowser, BarChart } from '@material-ui/icons';

const Actions = props => {
  const { id } = props;
  console.log(props);
  return (
    <>
      <Tooltip title="Results">
        <IconButton aria-label="Results" onClick={() => console.log(id)}>
          <BarChart />
        </IconButton>
      </Tooltip>
      <Tooltip title="Open in Awarewolf">
        <IconButton aria-label="Open In App">
          <OpenInBrowser />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton aria-label="Delete">
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
};

Actions.propTypes = {
  
};

export default Actions;