import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { toCapitalize } from '../utils/HelperMethods';

const StyledTableCell = withStyles(() => ({
  head: {
    fontWeight: 'bold',
  },
}))(TableCell);

function TableView(props) {
  return (
    <>
      <Table aria-label="simple table">
        <TableHead classes={{ fontWeight: 'bold' }}>
          <TableRow>
            {props.data.header.map((value) => (
              <StyledTableCell>{value}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.row.map((row) => (
            <TableRow>
              {row.map((value) => (
                <StyledTableCell>
                  {typeof value === 'string' ? toCapitalize(value) : value}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

TableView.propTypes = {
  data: PropTypes.object.isRequired,
};
export default TableView;
