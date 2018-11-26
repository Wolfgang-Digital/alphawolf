import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Checkbox,
  CircularProgress
} from '@material-ui/core';
import ResultsTableHead from './ResultsTableHead';
import ResultsTableToolbar from './ResultsTableToolbar';
import { format } from '../../utils';
import { parse as parseDate, format as formatDate } from 'date-fns';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  wrapper: {
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    margin: 'auto'
  },
  title: {
    maxWidth: 300
  }
});

class ResultsTable extends Component {
  state = {
    order: 'desc',
    orderBy: 'date',
    page: 0,
    rowsPerPage: 10,
    selected: []
  };

  handleRequestSort = (e, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleChangePage = (e, page) => this.setState({ page });

  handleChangeRowsPerPage = ({ target }) => this.setState({ rowsPerPage: target.value });

  handleSelectAllClick = e => {
    if (e.target.checked) {
      this.setState({ selected: this.props.data.map(n => n._id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (e, id) => {
    e.stopPropagation();
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) newSelected = newSelected.concat(selected, id);
    else if (selectedIndex === 0) newSelected = newSelected.concat(selected.slice(1));
    else if (selectedIndex === selected.length - 1) newSelected = newSelected.concat(selected.slice(0, -1));
    else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, data, rows, tableTitle, loading, isDeletable, actionBar: ActionBar, ...rest } = this.props;
    const { selected, order, orderBy, page, rowsPerPage } = this.state;

    if (loading) {
      return (
        <>
          <div className={classes.wrapper}>
            <CircularProgress size={52} className={classes.progress} />
          </div>
        </>
      )
    }

    return (
      <Paper className={classes.root}>
        <ResultsTableToolbar numSelected={selected.length} tableTitle={tableTitle} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <ResultsTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              rows={rows}
              isDeletable={isDeletable}
            />
            <TableBody>
              {format.stableSort(data, format.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n._id);
                  return (
                    <TableRow
                      hover
                      key={n._id}
                      role='checkbox'
                      tabIndex={-1}
                      selected={isSelected}
                    >
                      {isDeletable &&
                        <TableCell padding='checkbox'>
                          <Checkbox onClick={e => this.handleClick(e, n._id)} checked={isSelected} />
                        </TableCell>}
                      {rows.map((m, i) => (
                        <TableCell numeric={m.numeric} key={i} className={m.id === 'title' ? classes.title : null}>
                          {m.id === 'date' ? formatDate(parseDate(n[m.id]), 'DD.MM.YY') : n[m.id]}
                          {m.id === 'actions' && <ActionBar id={n._id} isPinned={n.isPinned} isResolved={n.isResolved} {...rest} />}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
        />
      </Paper>
    );
  }
}

ResultsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      disablePadding: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default withStyles(styles)(ResultsTable)