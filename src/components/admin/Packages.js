import React, { Component } from "react";
import "./Packages.scss";
import { AdminDataServices } from "../../services/AdminDataServices";
import Default from "./../../asserts/Default.png";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Pagination from "@material-ui/lab/Pagination";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ReactFileReader from "react-file-reader";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

export default class Packages extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      //
      PageNumber: 1,
      TotalPages: 0,

      Image: Default,
      File: new FormData(),
      FileName: "",
      FileExist: false,
      //
      ProductID: 0,
      ProductName: "",
      ProductPrice: "",
      ProductType: "",
      ProductDescription: "",
      PublicID: "",
      PlanType: "all",
      //
      ProductImageFlag: false,
      ProductNameFlag: false,
      ProductPriceFlag: false,
      ProductTypeFlag: false,
      ProductDescriptionFlag: false,
      //
      OpenSnackBar: false,
      Message: "",
      OpenLoader: false,
      Update: false,
    };
  }

  componentWillMount() {
    console.log("Package componentWillMount Calling ....");
    this.GetAllProduct(this.state.PageNumber, this.state.PlanType);
  }

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handleCapture = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ Image: reader.result });
    };
    reader.readAsDataURL(event.target.files[0]);
    this.setState({ File: event.target.files[0] });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );
  };

  CheckValidity = () => {
    console.log("Check Validity Calling....");
    let State = this.state;
    let Value = false;
    this.setState({
      ProductNameFlag: false,
      ProductPriceFlag: false,
      ProductTypeFlag: false,
      ProductDescriptionFlag: false,
      ProductImageFlag: false,
    });

    if (State.ProductName === "") {
      this.setState({ ProductNameFlag: true });
      Value = true;
    }

    if (State.ProductPrice === "") {
      this.setState({ ProductPriceFlag: true });
      Value = true;
    }

    if (State.ProductType === "") {
      this.setState({ ProductTypeFlag: true });
      Value = true;
    }

    if (State.Image === Default) {
      this.setState({ ProductImageFlag: true });
      Value = true;
    }

    return Value;
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    this.GetAllProduct(value, this.state.PlanType);
  };

  handleAddProduct = async (e) => {
    e.preventDefault();
    console.log("handle Add Product Calling ....");
    if (await this.CheckValidity()) {
      this.setState({ Message: "Enter Required Filled", OpenSnackBar: true });
      return;
    }
    // debugger;
    this.setState({ OpenLoader: true });

    let Data = this.state;
    const data1 = new FormData();

    data1.append("ProductName", Data.ProductName);
    data1.append("ProductType", Data.ProductType);
    data1.append("ProductPrice", Data.ProductPrice);
    data1.append("ProductDescription", Data.ProductDescription);
    data1.append("File", Data.File);
    data1.append("ImageUrl", Data.Image);
    if (Data.Update) {
      data1.append("ProductID", Data.ProductID);
      data1.append("PublicID", Data.PublicID);
    }

    {
      Data.Update
        ? await AdminDataServices.UpdateProduct(data1)
            .then((data) => {
              console.log("Data : ", data);
              this.setState({
                OpenLoader: false,
                OpenSnackBar: true,
                Message: "Update Product Successfully",
                ProductName: "",
                ProductPrice: "",
                ProductType: "",
                ProductDescription: "",
                Image: Default,
                File: new FormData(),
                Update: false,
              });
              this.GetAllProduct(this.state.PageNumber, this.state.PlanType);
            })
            .catch((error) => {
              console.log("Error : ", error);
              this.setState({
                OpenLoader: false,
                OpenSnackBar: true,
                Message: "Something Went Wrong",
              });
              this.GetAllProduct(this.state.PageNumber, this.state.PlanType);
            })
        : await AdminDataServices.AddProduct(data1)
            .then((data) => {
              console.log("Data : ", data);
              this.setState({
                OpenLoader: false,
                OpenSnackBar: true,
                Message: "Add Product Successfully",
                ProductName: "",
                ProductPrice: "",
                ProductType: "",
                ProductDescription: "",
                Image: Default,
                File: new FormData(),
                Update: false,
              });
              this.GetAllProduct(this.state.PageNumber, this.state.PlanType);
            })
            .catch((error) => {
              console.log("Error : ", error);
              this.setState({
                OpenLoader: false,
                OpenSnackBar: true,
                Message: "Something Went Wrong",
              });
              this.GetAllProduct(this.state.PageNumber, this.state.PlanType);
            });
    }
  };

  GetAllProduct = (CurrentPageNumber, PlanType) => {
    const data = {
      pageNumber: CurrentPageNumber,
      numberOfRecordPerPage: 6,
      type: PlanType,
    };

    AdminDataServices.GetAllProduct(data)
      .then((data) => {
        console.log("Data : ", data);
        if (data.data.data === null && this.state.PageNumber > 2) {
          this.setState({ PageNumber: CurrentPageNumber - 1 });
          this.GetAllProduct(CurrentPageNumber - 1, PlanType);
        }
        this.setState({
          OpenLoader: false,
          // OpenSnackBar: true,
          rows: data.data,
          // Message: data.message,
          TotalPages: data.totalPage,
        });
      })
      .catch((error) => {
        console.log("Error : ", error);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: true,
          Message: "Something Went Wrong",
        });
      });
  };

  handleCopyData = (data) => {
    console.log("handleCopyData Calling...");
    this.setState({
      Update: true,
      ProductID: data.productID,
      ProductName: data.productName,
      ProductPrice: data.productPrice,
      ProductType: data.productType,
      ProductDescription: data.productDescription,
      Image: data.productImageUrl,
      PublicID: data.publicID,
    });
  };

  handleDeleteProduct = (ProductID) => {
    let data = {
      productID: ProductID,
    };
    AdminDataServices.DeleteProduct(data)
      .then((data) => {
        // debugger;
        console.log("handle Delete Product Data : ", data);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: true,
          Message: data.message,
        });
        this.GetAllProduct(this.state.PageNumber, this.state.PlanType);
      })
      .catch((error) => {
        console.log("handle Delete Product Error : ", error);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: true,
          Message: "Something Went Wrong",
        });
      });
  };

  render() {
    let state = this.state;
    let self = this;
    console.log("State : ", state);
    return (
      <div className="Packages-Container">
        <div className="Admin-Packages-Header">
          New Package Management
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Product"
              classes={{
                root: "inputRoot",
                input: "inputInput",
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </div>
        <div className="Admin-Packages-Body">
          <div className="Admin-Packages-Body-Box1">
            <div className="Admin-Packages-Body-Box1-Sub1">
              <div
                className="Admin-Packages-Body-Box1-Sub1-Image"
                htmlFor="contained-button-file"
                style={{
                  border: state.ProductImageFlag ? "0.5px solid red" : "",
                }}
              >
                <img
                  src={state.Image}
                  alt="Product-Image"
                  // className="Admin-Packages-Body-Box1-Sub1-Image"
                  style={{ height: "80%", width: "80%" }}
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={this.handleCapture}
                />
                <label
                  htmlFor="contained-button-file"
                  // style={{ margin: "10px 0 0 0" }}
                >
                  <IconButton
                    variant="contained"
                    color="primary"
                    component="span"
                    size="small"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              <div className="Admin-Packages-Body-Box1-Sub1-Type">
                <TextField
                  label="Product Name"
                  type="text"
                  name="ProductName"
                  style={{ margin: "0 10px 5px 0", width: "250px" }}
                  size="small"
                  error={state.ProductNameFlag}
                  value={state.ProductName}
                  onChange={this.handleChange}
                />
                <TextField
                  label="Price"
                  name="ProductPrice"
                  type="number"
                  style={{ margin: "0 10px 5px 0", width: "250px" }}
                  size="small"
                  error={state.ProductPriceFlag}
                  value={state.ProductPrice}
                  onChange={this.handleChange}
                />
                <FormControl
                  className=""
                  style={{ margin: "10px 10px 5px 0", width: "250px" }}
                >
                  <Select
                    name="ProductType"
                    value={state.ProductType}
                    onChange={this.handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    error={state.ProductTypeFlag}
                  >
                    <MenuItem value="" disabled></MenuItem>
                    <MenuItem value="Device">Device</MenuItem>
                    <MenuItem value="Plans">Plans</MenuItem>
                  </Select>
                  <FormHelperText>Placeholder</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="Admin-Packages-Body-Box1-Sub2">
              <TextField
                style={{ margin: "20px 0 0 0", width: "100%" }}
                id="outlined-multiline-static"
                label="Product Description"
                multiline
                rows={4}
                name="ProductDescription"
                variant="outlined"
                value={state.ProductDescription}
                onChange={this.handleChange}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "10px 0 0 0",
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#06C400", color: "white" }}
                  onClick={this.handleAddProduct}
                >
                  {state.Update ? <>Update</> : <>Add</>} Product
                </Button>
              </div>
            </div>
          </div>
          <div className="Admin-Packages-Body-Box2">
            <div className="Admin-Packages-Body-Box2-Header">
              <RadioGroup
                name="sort"
                // value={value}
                // onChange={handleChange}
              >
                <FormControlLabel
                  value="asc"
                  control={<Radio style={{ color: "white" }} />}
                  label="Asc"
                />
                <FormControlLabel
                  value="desc"
                  control={<Radio style={{ color: "white" }} />}
                  label="Desc"
                />
              </RadioGroup>
            </div>
            <div className="Admin-Packages-Body-Box2-Body">
              <TableContainer component={Paper}>
                <Table className="" aria-label="simple table">
                  <TableHead style={{ width: "100%" }}>
                    <TableRow style={{ flex: 8 }}>
                      <TableCell align="center" style={{ flex: 1 }}>
                        ID
                      </TableCell>
                      <TableCell align="center" style={{ flex: 4 }}>
                        Product Name
                      </TableCell>
                      <TableCell align="center" style={{ flex: 1 }}>
                        Price
                      </TableCell>
                      <TableCell align="center" style={{ flex: 3 }}>
                        Type
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ flex: 0.5 }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(state.rows) &&
                      state.rows.length > 0 &&
                      state.rows.map((row) => (
                        <TableRow key={row.id} style={{ flex: 8 }}>
                          <TableCell
                            //   component="th"
                            align="center"
                            scope="row"
                            style={{ flex: 1, padding: "0px", height: 20 }}
                          >
                            {row.productID}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ flex: 4, padding: "0px", height: 20 }}
                          >
                            {row.productName}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ flex: 1, padding: "0px", height: 20 }}
                          >
                            {row.productPrice}&nbsp;&#8377;
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ flex: 3, padding: "0px", height: 20 }}
                          >
                            {row.productType}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ flex: 0.5, padding: "0px", height: 20 }}
                          >
                            <IconButton
                              variant="outlined"
                              color="primary"
                              size="medium"
                              onClick={() => {
                                self.handleCopyData(row);
                              }}
                              // style={{ margin: '0 px 0 0' }}
                            >
                              <EditIcon size="medium" />
                            </IconButton>
                            <IconButton
                              variant="outlined"
                              style={{ color: "black" }}
                              onClick={() => {
                                self.handleDeleteProduct(row.productID);
                              }}
                            >
                              <DeleteIcon size="medium" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="Admin-Packages-Body-Box2-Footer">
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
        </div>
        <div className="Admin-Packages-Footer"></div>
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
