import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea, Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchBar from "material-ui-search-bar";
import store from "../store/index";

export default function SearchedCard() {
  const [items, setItems] = useState(this.props.data);
  const [allItems, setAllItems] = useState(this.props.data);
  const [searched, setSearched] = useState("");

  // React.useEffect(() => {
  //   console.log(this.props.data);
  //   console.log(items);
  // });
  const sortByPriceAsc = () => {
    let sortedDataAsc = this.state.item.sort((a, b) => {
      return parseInt(a.price) - parseInt(b.price);
    });
    this.setState({
      data: sortedDataAsc,
    });
  };

  const sortByPriceDsc = () => {
    let sortedDataDsc = this.state.item.sort((a, b) => {
      return parseInt(b.price) - parseInt(a.price);
    });
    this.setState({
      data: sortedDataDsc,
    });
  };

  const requestSearch = (searchedVal) => {
    const filteredItems = allItems.filter((item) => {
      return (
        item.collection
          .toString()
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        item.cardName
          .toString()
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        item.price
          .toString()
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        item.time
          .toString()
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        item.bid.toString().toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setItems(filteredItems);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  return (
    <>
      <SearchBar

        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch}
        placeholder="Search by ghost name"
      />

      <div>
        <Checkbox onChange={sortByPriceAsc} />
        <label>Low to high</label>
      </div>

      <div>
        <Checkbox onChange={sortByPriceDsc} />
        <label>High to low</label>
      </div>

      <div>
        <Box display="grid">
          <Grid container sx={{ width: "80%", margin: "auto" }} spacing={5}>
            {items.map((item, index) => (
              <Grid item xs={4}>
                <Card
                  sx={{
                    width: "100%",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  <CardActionArea
                    style={{ backgroundColor: "white", display: "block" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h7"
                      component="div"
                      style={{ backgroundColor: "white" }}
                    >
                      {item.collection}
                    </Typography>

                    <Typography variant="h6">{item.cardName}</Typography>
                    <Typography variant="body2">{item.price}</Typography>
                    <Typography variant="body2">{item.time}</Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
}
