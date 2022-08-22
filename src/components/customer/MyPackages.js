import React, { Component } from "react";
import "./Upgrade.scss";
import { CustomerDataServices } from "../../services/CustomerDataServices";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export default class MyPackages extends Component {
  constructor() {
    super();
    this.state = {
      List: [],
      PageNumber: 1,
      TotalPages: 0,
      ProductType: "all",
      //
      OpenLoader: false,
      OpenSnackBar: false,
      Message: "",
    };
  }

  componentWillMount() {
    console.log("MyPackages Component will mount calling ...");
    this.GetPurchaseProduct(this.state.PageNumber);
  }

  GetPurchaseProduct = (CurrentPage) => {
    let data = {
      pageNumber: CurrentPage,
      numberOfRecordPerPage: 5,
      userID: localStorage.getItem("CustomerID"),
      productType: this.state.ProductType,
    };
    CustomerDataServices.GetPurchaseProduct(data)
      .then((data) => {
        console.log("GetPurchaseProduct Data : ", data);
        this.setState({
          List: data.data,
          TotalPages: data.totalPage,
        });
      })
      .catch((error) => {
        console.log("GetPurchaseProduct Error : ", error);
        this.setState({
          List: data.data,
          TotalPages: data.totalPage,
        });
      });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  render() {
    let state = this.state;
    return (
      <div className="MyPackages-MainContainer">
        <div className="MyPackages-SubContainer">
          <div className="Upgrade-Container-Header">
            <div className="Upgrade-Container-Header-Part1">
              {localStorage.getItem("CustomerFullName")} Account
            </div>
            <div className="Upgrade-Container-Header-Part2">
              <FormControl variant="outlined" className="" size="small">
                {/* <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel> */}
                <Select
                  native
                  name="ProductType"
                  value={state.ProductType}
                  onChange={this.handleChange}
                  // label="Age"
                  // inputProps={{
                  //   name: "age",
                  //   id: "outlined-age-native-simple",
                  // }}
                >
                  {/* <option aria-label="None" value="all" /> */}
                  <option defaultValue value="all">
                    All
                  </option>
                  <option value="plans">Plan</option>
                  <option value="device">Device</option>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="Upgrade-Container-Body">
            {Array.isArray(state.List) && state.List.length > 0
              ? state.List.map((row) => (
                  <Paper className="Upgrade-Container-SubBody" elevation={2}>
                    <img
                      src={row.productImageUrl}
                      alt=""
                      className="Upgrade-Container-Body-Image"
                    />
                    <div className="Upgrade-Container-Body-Body">
                      <Typography className="Upgrade-Container-Body-Body-ProductName">
                        {row.productName}
                      </Typography>
                      <Typography className="Upgrade-Container-Body-Body-ProductPrice">
                        &#8377;{row.productPrice}
                      </Typography>
                      <div style={{ display: "flex" }}>
                        <Typography className="Upgrade-Container-Body-Body-ProductType">
                          Type :&nbsp;
                          {row.productType}
                        </Typography>
                        {/* <div className="Upgrade-Container-Body-Body-ProductButton"></div> */}
                        {/* <Button
                          variant="contained"
                          color="primary"
                          className="Upgrade-Container-Body-Body-ProductButton"
                          onClick={() => {
                            this.handleOpenetail(row);
                          }}
                        >
                          Upgrade
                        </Button> */}
                      </div>
                    </div>
                  </Paper>
                ))
              : null}
          </div>
          <div className="Upgrade-Container-Footer">
            <Pagination
              count={this.state.TotalPages}
              Page={this.state.PageNumber}
              onChange={this.handlePaging}
              variant="outlined"
              shape="rounded"
              color="secondary"
            />
          </div>
        </div>

        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
          onClick={() => {
            this.setState({ OpenLoader: false });
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={state.OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={state.Message}
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={this.handleSnackBarClose}
              >
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleSnackBarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}
