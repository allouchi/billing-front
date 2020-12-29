import React, { FC } from "react";
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CompanyItem from "./CompanyItem";
import Company from "../../../domains/Company";


const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

interface CompanyListProps {
  items: Company[];
}

const CompanyList: FC<CompanyListProps> = ({ items }) => { 
  const classes = useStyles();
  
  return (
  <div className={classes.table}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table" size='small'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="left">Raison sociale</StyledTableCell>
            <StyledTableCell align="left">Siret</StyledTableCell>
            <StyledTableCell align="left">RCS</StyledTableCell>
            <StyledTableCell align="left">TVA Name</StyledTableCell>
            <StyledTableCell align="left">Code APE</StyledTableCell>
            <StyledTableCell></StyledTableCell>           
          </TableRow>
        </TableHead>        
        <TableBody>    
          {items &&
            items.map((Company: Company, index: number) => (
              <StyledTableRow key={index}> 
                <CompanyItem key={index} item={Company} />
              </StyledTableRow>
            ))}
      </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
};

export default CompanyList;
