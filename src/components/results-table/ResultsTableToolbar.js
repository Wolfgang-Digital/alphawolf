import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Toolbar,
  Tooltip,
  Typography,
  IconButton 
} from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Delete, FilterList } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

const ResultsTableToolbar = props => {
  const { numSelected, classes, tableTitle } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              { tableTitle }
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <Delete />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterList />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

ResultsTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  tableTitle: PropTypes.string.isRequired
};

export default withStyles(styles)(ResultsTableToolbar);