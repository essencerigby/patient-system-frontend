import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SortDropdown from './TableSort';

/**
 * StyledTableCell is a custom-styled TableCell component.
 * Applies specific styles to table head and body cells.
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#8ca0c7',
    borderBottom: '1px solid #000000',
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: '1px solid #000000',
    borderRight: '1px solid #000000',
    fontSize: 14,
    textAlign: 'center',
    '&:first-of-type': {
      borderLeft: '1px solid #000000'
    }
  }
}));

/**
 * Creates a row object from the given columns and values.
 *
 * @param {Array} columns - The columns for the row.
 * @param {Array} values - The values for the row.
 * @returns {Object} A row object with column IDs as keys and values as corresponding values.
 */
export function createRow(columns, values) {
  const row = {};
  columns.forEach((column, index) => {
    row[column.id] = values[index];
  });
  return row;
}

/**
 * StickyHeadTable component renders a table with sticky headers and sorting capabilities.
 *
 * @component
 * @example
 * const columns = [
 *   { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
 *   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100, align: 'center' },
 * ];
 * const rows = [
 *   createRow(columns, ['India', 'IN']),
 *   createRow(columns, ['China', 'CN']),
 * ];
 * return <StickyHeadTable columns={columns} rows={rows} />;
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.columns - The columns to be displayed in the table.
 * @param {Array} props.rows - The rows to be displayed in the table.
 *
 * @returns {JSX.Element} A React component that renders a table with sticky headers and sorting.
 */
export default function StickyHeadTable({ columns, rows }) {
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });

  // Separate empty and non-empty rows
  const emptyRows = rows.filter((row) => Object.values(row).every((value) => value === ''));
  const nonEmptyRows = rows.filter((row) => !Object.values(row).every((value) => value === ''));

  // Sort the non-empty rows
  const sortedNonEmptyRows = [...nonEmptyRows].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Combine sorted non-empty rows with empty rows
  const sortedData = [...sortedNonEmptyRows, ...emptyRows];

  /**
   * Requests sorting by a specific key and direction.
   *
   * @param {string} key - The key to sort by.
   * @param {string} direction - The direction to sort ('asc' or 'desc').
   */
  const requestSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  return (
    <Paper sx={{ padding: 0, overflow: 'hidden', overflowX: 'auto' }}>
      <TableContainer sx={{ maxHeight: '650px', overflowY: 'auto' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead style={{ textAlign: 'center' }}>
            <TableRow>
              {columns.map((column) => (
                // eslint-disable-next-line max-len
                <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{column.label}</span>
                    <SortDropdown onSort={(order) => requestSort(column.id, order)} />
                  </div>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow
                hover
                tabIndex={-1}
                key={row.address || `emptyRow${index}`}
                style={{ borderBottom: index === rows.length - 1 ? 'none' : '1px solid #000000', height: '50px' }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
