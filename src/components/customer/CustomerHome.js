import React, { Component } from "react";
import "./CustomerHome.scss";
import { CustomerDataServices } from "../../services/CustomerDataServices";

import MaleBlackProfile from "./../../asserts/MaleBlackProfile.png";
import FemaleBlackProfile from "./../../asserts/FemaleBlackProfile.png";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

export default class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomerID: 0,
      FirstName: "",
      LastName: "",
      Address: "",
      City: "",
      State: "",
      ZipCode: "",
      HomePhone: "",
      PersonalNumber: "",
      Email: "",
      Gender: "male",
      DateOfBirth: "",
      Occupation: "",
      CompanyName: "",
      //
      FirstNameFlag: false,
      LastNameFlag: false,
      AddressFlag: false,
      CityFlag: false,
      StateFlag: false,
      ZipCodeFlag: false,
      HomePhoneFlag: false,
      PersonalNumberFlag: false,
      EmailFlag: false,
      DateOfBirthFlag: false,
      //
      Message: "",
      OpenSnackBar: false,
      OpenLoader: false,
    };
  }

  componentWillMount() {
    console.log("Component will mount calling ... ");
    this.GetCustomerAddress();
  }

  GetCustomerAddress = () => {
    CustomerDataServices.GetCustomerAddress()
      .then((data) => {
        console.log("GetCustomerAddress Data : ", data);
        this.setState({ Message: data.message, OpenSnackBar: true });
        if (data.isSuccess) {
          this.setState({
            CustomerID: data.data.userID,
            FirstName: data.data.firstName,
            LastName: data.data.lastName,
            Address: data.data.address,
            City: data.data.city,
            State: data.data.state,
            ZipCode: data.data.zipCode,
            HomePhone: data.data.homePhone,
            PersonalNumber: data.data.personalNumber,
            Email: data.data.email,
            Gender: data.data.gender,
            DateOfBirth: data.data.dob,
            Occupation: data.data.occupation,
            CompanyName: data.data.companyName,
          });
        }
      })
      .catch((error) => {
        console.log("GetCustomerAddress Error : ", error);
        this.setState({ Message: "Something Went Wrong", OpenSnackBar: true });
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  CheckValidity = () => {
    console.log("CheckValidity Calling....");
    let value = false;
    let state = this.state;
    this.setState({
      FirstNameFlag: false,
      LastNameFlag: false,
      AddressFlag: false,
      CityFlag: false,
      StateFlag: false,
      ZipCodeFlag: false,
      HomePhoneFlag: false,
      PersonalNumberFlag: false,
      EmailFlag: false,
      DateOfBirthFlag: false,
    });

    if (state.FirstName === "" || state.FirstName === null) {
      this.setState({ FirstNameFlag: true });
      value = true;
    }

    if (state.LastName === "" || state.LastName === null) {
      this.setState({ LastNameFlag: true });
      value = true;
    }

    if (state.Address === "" || state.Address === null) {
      this.setState({ AddressFlag: true });
      value = true;
    }

    if (state.City === "" || state.City === null) {
      this.setState({ CityFlag: true });
      value = true;
    }

    if (state.State === "" || state.State === null) {
      this.setState({ StateFlag: true });
      value = true;
    }

    if (state.ZipCode === "" || state.ZipCode === null) {
      this.setState({ ZipCodeFlag: true });
      value = true;
    }

    if (state.HomePhone === "" || state.HomePhone === null) {
      this.setState({ HomePhoneFlag: true });
      value = true;
    }

    if (state.PersonalNumber === "" || state.PersonalNumber === null) {
      this.setState({ PersonalNumberFlag: true });
      value = true;
    }

    if (state.Email === "" || state.Email === null) {
      this.setState({ EmailFlag: true });
      value = true;
    }

    if (state.DateOfBirth === "" || state.DateOfBirth === null) {
      this.setState({ DateOfBirthFlag: true });
      value = true;
    }

    return value;
  };

  handleInfoSubmit = async () => {
    console.log("handleInfoSubmit Calling .... ");
    if (await this.CheckValidity()) {
      this.setState({ Message: "Enter Required Filled", OpenSnackBar: true });
      return;
    }
    let state = this.state;
    let data = {
      userID: state.CustomerID,
      firstName: state.FirstName,
      lastName: state.LastName,
      address: state.Address,
      city: state.City,
      state: state.State,
      zipCode: state.ZipCode,
      homePhone: state.HomePhone,
      personalNumber: state.PersonalNumber,
      email: state.Email,
      gender: state.Gender,
      dob: state.DateOfBirth,
      occupation: state.Occupation,
      companyName: state.CompanyName,
    };
    CustomerDataServices.UpdateCustomerAddress(data)
      .then((data) => {
        // debugger;
        console.log("UpdateCustomerAddress Data : ", data);
        this.setState({
          Message: data.message,
          OpenSnackBar: true,
        });
      })
      .then((error) => {
        // debugger;
        console.log("UpdateCustomerAddress Error : ", error);
        // this.setState({
        //   Message: "Something Went Wrong",
        //   OpenSnackBar: true,
        // });
      });
  };

  render() {
    let state = this.state;
    console.log("State : ", state);
    return (
      <div className="Customer-Container">
        <div className="Customer-Container-Header">Customer Details</div>
        <div className="Customer-Container-Body">
          <div className="Customer-Container-Body-Box1">
            <div className="Customer-Container-Body-Box1-profile">
              <img
                src={MaleBlackProfile}
                alt="Product-Image"
                style={{ height: "70%", width: "100%" }}
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
                // onChange={handleCapture}
              />
              <label
                htmlFor="contained-button-file"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
          </div>
          <div className="Customer-Container-Body-Box2">
            <div>
              <TextField
                label="User ID"
                type="number"
                style={{ margin: "0 20px 5px 0" }}
                name="CustomerID"
                // error={state}
                value={state.CustomerID}
              />
              <TextField
                label="First Name"
                type="text"
                style={{ margin: "0 20px 5px 0" }}
                name="FirstName"
                value={state.FirstName}
              />
              <TextField
                label="Last Name"
                type="text"
                style={{ margin: "0 20px 5px 0" }}
                name="LastName"
                value={state.LastName}
              />
            </div>
            <TextField
              label="Address"
              type="text"
              fullWidth
              style={{ margin: "0 0 5px 0" }}
              name="Address"
              error={state.AddressFlag}
              value={state.Address}
              onChange={this.handleChange}
            />
            <div>
              <TextField
                label="City"
                type="text"
                style={{ margin: "0 20px 5px 0" }}
                name="City"
                error={state.CityFlag}
                value={state.City}
                onChange={this.handleChange}
              />
              <TextField
                label="State"
                type="text"
                style={{ margin: "0 20px 5px 0" }}
                name="State"
                error={state.StateFlag}
                value={state.State}
                onChange={this.handleChange}
              />
              <TextField
                label="Zip Code"
                type="number"
                style={{ margin: "0 20px 5px 0" }}
                name="ZipCode"
                error={state.ZipCodeFlag}
                value={state.ZipCode}
                onChange={this.handleChange}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Home Phone"
                type="number"
                style={{ margin: "0 20px 5px 0" }}
                name="HomePhone"
                error={state.HomePhoneFlag}
                value={state.HomePhone}
                onChange={this.handleChange}
              />
              <TextField
                label="Personal Number"
                type="number"
                style={{ margin: "0 20px 5px 0" }}
                name="PersonalNumber"
                error={state.PersonalNumberFlag}
                value={state.PersonalNumber}
                onChange={this.handleChange}
              />
              <TextField
                label="Email Address"
                type="email"
                style={{ margin: "0 20px 5px 0" }}
                name="Email"
                error={state.EmailFlag}
                value={state.Email}
                onChange={this.handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "20px 0 0 0",
              }}
            >
              DOB :
              <TextField
                type="date"
                style={{ margin: "0 20px 5px 10px" }}
                name="DateOfBirth"
                error={state.DateOfBirthFlag}
                value={state.DateOfBirth}
                onChange={this.handleChange}
              />
              Gender :
              <RadioGroup
                name="Gender"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "0 0 0 20px",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
                value={state.Gender}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </div>
            <div>
              <TextField
                label="Occupation"
                type="text"
                style={{ margin: "0 20px 5px 0" }}
                name="Occupation"
                // error={state}
                value={state.Occupation}
                onChange={this.handleChange}
              />
              <TextField
                label="Company Name"
                type="text"
                style={{ margin: "0 20px 5px 0" }}
                name="CompanyName"
                // error={state}
                value={state.CompanyName}
                onChange={this.handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "50px 0 0 0",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#21007F",
                  width: 100,
                  margin: "10px 0 0 0",
                  color: "white",
                }}
                onClick={() => {
                  this.handleInfoSubmit();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="Customer-Container-Footer">
          Contact Broadband Service Provider Customer Care Number Anytime At
          1234567890
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
