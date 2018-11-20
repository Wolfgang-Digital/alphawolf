import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  Checkbox
} from '@material-ui/core';

class ResultsTableHead extends Component {
  createSortHandler = property => e => {
    this.props.onRequestSort(e, property);
  };

  render() {
    const { onSelectAllClick, numSelected, order, orderBy, rowCount, rows } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title={row.tooltip || 'Sort'}
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

ResultsTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      disablePadding: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelectAllClick: PropTypes.func.isRequired,

};

export default ResultsTableHead;