import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';
import { OpenInBrowser, Lock, PriorityHigh } from '@material-ui/icons';

const Actions = props => {
  const { id, openInApp, pinPost, resolvePost, isPinned, isResolved } = props;

  return (
    <>
     <Tooltip title={isResolved ? 'Re-open post' : 'Resolve post'} color={isResolved ? 'secondary' : 'default'}>
        <IconButton aria-label="Resolve" onClick={() => resolvePost(id)}>
          <Lock />
        </IconButton>
      </Tooltip>
      <Tooltip title={isPinned ? 'Unpin post' : 'Pin post'} color={isPinned ? 'secondary' : 'default'}>
        <IconButton aria-label="Results" onClick={() => pinPost(id)}>
          <PriorityHigh />
        </IconButton>
      </Tooltip>
      <Tooltip title="Open in Awarewolf">
        <IconButton aria-label="Open In App" onClick={() => openInApp(id)}>
          <OpenInBrowser />
        </IconButton>
      </Tooltip>
    </>
  );
};

Actions.propTypes = {
  id: PropTypes.string.isRequired,
  openInApp: PropTypes.func.isRequired
};

export default Actions;