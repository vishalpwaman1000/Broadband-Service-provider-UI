import React, { Component } from "react";
import { CustomerDataServices } from "../../services/CustomerDataServices";
import "./Upgrade.scss";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export default class Upgrade extends Component {
  constructor() {
    super();
    this.state = {
      List: [],
      PageNumber: 1,
      TotalPages: 0,
      ProductType: "all",
      OpenPackage: false,
      //
      ProductID: 0,
      ProductName: "",
      ProductDescription: "",
      ProductPrice: "",
      ProductTypes: "",
      ProductImageUrl: "",
      IsActive: false,
      //
      OpenLoader: false,
      OpenSnackBar: false,
      Message: "",
    };
  }

  componentWillMount() {
    console.log("Upgrade Component Will Mount Calling...");
    this.GetAllPackages(this.state.PageNumber, this.state.ProductType);
  }

  GetAllPackages = (CurrentPage, ProductType) => {
    let data = {
      pageNumber: CurrentPage,
      numberOfRecordPerPage: 5,
      type: ProductType,
    };
    //
    CustomerDataServices.GetAllPackages(data)
      .then((data) => {
        console.log("GetAllPackages Data : ", data);
        this.setState({
          List: data.data,
          TotalPages: data.totalPage,
        });
      })
      .catch((error) => {
        console.log("GetAllPackages Error : ", error);
      });
  };

  PurchaseProduct = () => {
    this.setState({ OpenLoader: true });
    let data = {
      userID: localStorage.getItem("CustomerID"),
      productID: this.state.ProductID,
      productType: this.state.ProductTypes,
    };

    CustomerDataServices.PurchaseProduct(data)
      .then((data) => {
        console.log("PurchaseProduct Data : ", data);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: true,
          Message: data.message,
        });
        this.handleClose();
      })
      .catch((error) => {
        console.log("PurchaseProduct Error : ", error);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: true,
          Message: "Something went wrong",
        });
        this.handleClose();
      });
  };

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      console.log("name : ", event.target.name, " Value : ", event.target.value)
    );
    this.GetAllPackages(this.state.PageNumber, event.target.value);
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    this.GetAllPackages(value, this.state.ProductType);
  };

  handleOpenetail = (data) => {
    this.setState({
      OpenPackage: true,
      ProductID: data.productID,
      ProductName: data.productName,
      ProductDescription: data.productDescription,
      ProductPrice: data.productPrice,
      ProductTypes: data.productType,
      ProductImageUrl: data.productImageUrl,
      IsActive: data.isActive,
    });
  };

  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      OpenPackage: false,
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
      <div className="Upgrade-Container">
        <div className="Upgrade-SubContainer">
          <div className="Upgrade-Container-Header">
            <div className="Upgrade-Container-Header-Part1">
              Broadband Products
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
                        <Button
                          variant="contained"
                          color="primary"
                          className="Upgrade-Container-Body-Body-ProductButton"
                          onClick={() => {
                            this.handleOpenetail(row);
                          }}
                        >
                          Upgrade
                        </Button>
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

        <Modal
          open={this.state.OpenPackage}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="Model-Open-Package"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Fade in={this.state.OpenPackage}>
            <div className="Model-Open-Package-Sub">
              <div className="Model-Open-Package-Sub-Header">
                Package Detail
              </div>
              <div className="Model-Open-Package-Sub-Body">
                <div className="Model-Open-Package-Sub-Body-Title">
                  {state.ProductName}
                </div>
                <div className="Model-Open-Package-Sub-Body-Price">
                  {state.ProductPrice}&nbsp;&#8377;
                </div>
                <div className="Model-Open-Package-Sub-Body-Description">
                  {state.ProductDescription}
                </div>
                <div className="Model-Open-Package-Sub-Body-Image">
                  <img
                    src={state.ProductImageUrl}
                    alt="ProductImageUrl"
                    className="Model-Open-Package-Sub-Body-Image"
                  />
                </div>
                <div className="Model-Open-Package-Sub-Body-Type">
                  Type : {state.ProductTypes}
                </div>
                <div className="Model-Open-Package-Sub-Body-Operation">
                  <Button
                    variant="contained"
                    className="Button"
                    onClick={() => {
                      this.handleClose();
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className="Button"
                    style={{ background: "black" }}
                    onClick={() => {
                      this.PurchaseProduct();
                    }}
                  >
                    Purchase
                  </Button>
                </div>
              </div>
              <div className="Model-Open-Package-Sub-Footer"></div>
            </div>
          </Fade>
        </Modal>

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
