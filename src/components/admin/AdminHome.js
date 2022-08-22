import React, { Component } from "react";
import "./AdminHome.scss";
import { AdminDataServices } from "../../services/AdminDataServices";
import MaleBlackProfile from "./../../asserts/MaleBlackProfile.png";
import FemaleBlackProfile from "./../../asserts/FemaleBlackProfile.png";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

export default class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AdminID: 0,
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
      Position: "",
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
    this.GetAdminAddress();
  }

  GetAdminAddress = () => {
    AdminDataServices.GetAdminAddress()
      .then((data) => {
        console.log("GetAdminAddress Data : ", data);
        this.setState({ Message: data.message, OpenSnackBar: true });
        if (data.isSuccess) {
          this.setState({
            AdminID: data.data.userID,
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
            Position: data.data.position,
          });
        }
      })
      .catch((error) => {
        console.log("GetAdminAddress Error : ", error);
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
      userID: state.AdminID,
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
      position: state.Position,
    };
    AdminDataServices.UpdateAdminAddress(data)
      .then((data) => {
        // debugger;
        console.log("UpdateAdminAddress Data : ", data);
        this.setState({
          Message: data.message,
          OpenSnackBar: true,
        });
      })
      .then((error) => {
        // debugger;
        console.log("UpdateAdminAddress Error : ", error);
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
      <div className="Admin-Container">
        <div className="Admin-Container-Header">Admin Details</div>
        <div className="Admin-Container-Body">
          <div className="Admin-Container-Body-Box1">
            <div className="Admin-Container-Body-Box1-profile">
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
          <div className="Admin-Container-Body-Box2">
            <div>
              <TextField
                label="Admin ID"
                type="number"
                name="AdminID"
                style={{ margin: "0 20px 5px 0" }}
                value={state.AdminID}
              />
              <TextField
                label="First Name"
                type="text"
                style={{ margin: "0 20px 5px 0" }}
                name="FisrtName"
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
                label="Admin Position"
                type="text"
                style={{ margin: "0 20px 5px 0" }}
                name="Position"
                value={state.Position}
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
        <div className="Admin-Container-Footer">
          Loyality and consistency is our promises.
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
