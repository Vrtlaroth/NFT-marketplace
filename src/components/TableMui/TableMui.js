import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchBar from "material-ui-search-bar";
import TablePagination from "@material-ui/core/TablePagination";
import "./TableMui.scss";

function createData(name, price, collection, bid, time) {
  return { name, price, collection, bid, time };
}

const rows = [
  createData("The First Game", "0.25 HBARS", "Official Game_NFT 1", "0.9"),
  createData("Nintendo", "50 HBARS", "Official Game_NFT 2", "0.4"),
  createData("Sega", "0.10 HBARS", "Official Game_NFT 3", "0.2"),
  createData("Sega", "0.15 HBARS", "Official Game_NFT 4", "0.9"),
  createData("PS4", "30 HBARS", "Official Game_NFT 5", "0.1"),
  createData("Gameboy", "15 HBARS", "Official Game_NFT 6", "0.8"),
  createData("The Last Game", "25 HBARS", "Official Game_NFT 7", "0.2"),
  createData("The Last Game", "0.18 HBARS", "Official Game_NFT 8", "0.5"),
];

export default function Tablemui() {
  const [items, setItems] = useState(rows);
  const [searched, setSearched] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const requestSearch = (searchedVal) => {
    const filteredItems = rows.filter((item) => {
      return (
        item.name
          .toString()
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        item.price
          .toString()
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        item.collection
          .toString()
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        item.bid.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.time.toString().toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setItems(filteredItems);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div className="table">
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch}
        placeholder="filter"
        className="table__filter"
      />

      <TableContainer className="table__container" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="table__head">
              <TableCell>Num.</TableCell>
              <TableCell>(name)</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Soul Power</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow
                  key={rows.name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell className="table__text" component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell className="table__text">{item.price}</TableCell>
                  <TableCell className="table__text">
                    {item.collection}
                  </TableCell>
                  <TableCell className="table__text">{item.bid}</TableCell>
                  <TableCell className="table__text">{item.time}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 4, 8, 12]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
