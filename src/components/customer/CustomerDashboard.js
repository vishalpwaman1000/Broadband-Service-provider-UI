import React, { Component } from "react";
import "./CustomerDashboard.css";
import History from "./History";
import { CustomerDataServices } from "../../services/CustomerDataServices";
import CustomerHome from "./CustomerHome.js";
import Upgrade from "./Upgrade";
import MyPackages from "./MyPackages";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Pagination from "@material-ui/lab/Pagination";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import HistoryIcon from "@material-ui/icons/History";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PermScanWifiIcon from "@material-ui/icons/PermScanWifi";
import BugReportIcon from "@material-ui/icons/BugReport";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//Table Library
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
//
import Popper from "@material-ui/core/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";

export default class CustomerDashboard extends Component {
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
      PlanType: "device",
      RaiseType: "issue",
      Summary: "",
      Description: "",
      //
      PlanTypeFlag: false,
      RaiseTypeFlag: false,
      SummaryFlag: false,
      DescriptionFlag: false,
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
      //
      NumberOfRecordPerPage: 6,
      //
      PageNumber: 1,
      //
      TotalPages: 0,
      TotalRecords: 0,

      open: false,
      MenuOpen: false,
      OpenLoader: false,
      OpenSnackBar: false,
      OpenTicket: false,

      OpenHome: true,
      OpenUpgrade: false,
      OpenHistory: false,
      OpenMyPackages: false,
    };
  }

  componentWillMount() {
    console.log("Component will mount calling ... ");

    this.setState({
      OpenHome: localStorage.getItem("CMenuHome") === "true" ? true : false,
      OpenUpgrade:
        localStorage.getItem("CMenuUpgrade") === "true" ? true : false,
      OpenHistory:
        localStorage.getItem("CMenuHistory") === "true" ? true : false,
      OpenMyPackages:
        localStorage.getItem("CMenuMyPackages") === "true" ? true : false,
    });

    if (localStorage.getItem("CMenuHome") === "true") {
    } else if (localStorage.getItem("CMenuUpgrade") === "true") {
    } else if (localStorage.getItem("CMenuMyPackages") === "true") {
    } else if (localStorage.getItem("CMenuHistory") === "true") {
    }
  }

  CreateTicketValidity = () => {
    console.log("CreateTicketValidity Calling...");
    let state = this.state;
    let Value = false;
    this.setState({
      PlanTypeFlag: false,
      RaiseTypeFlag: false,
      SummaryFlag: false,
      DescriptionFlag: false,
    });

    if (state.Summary === "") {
      this.setState({ SummaryFlag: true });
      Value = true;
    }

    if (state.Description === "") {
      this.setState({ DescriptionFlag: true });
      Value = true;
    }

    return Value;
  };

  handleCreateTicket = () => {
    console.log("handleCreateTicket Calling...");
    if (this.CreateTicketValidity()) {
      this.setState({
        OpenSnackBar: true,
        Message: "Please Fill Required Field",
      });
      return;
    }

    this.setState({ OpenLoader: true });
    let data = {
      userID: localStorage.getItem("CustomerID"),
      reportor: localStorage.getItem("CustomerFullName"),
      planType: this.state.PlanType,
      raiseType: this.state.RaiseType,
      summary: this.state.Summary,
      description: this.state.Description,
    };
    CustomerDataServices.CreateTicket(data)
      .then((data) => {
        console.log("handleCreateTicket Data : ", data);
        this.setState({
          OpenTicket: false,
          OpenLoader: false,
          OpenSnackBar: true,
          Message: data.message,
        });
      })
      .catch((error) => {
        console.log("handleCreateTicket Error : ", error);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: true,
          Message: "Something Went Wrong",
        });
      });
  };

  handleMenuButton = (e) => {
    console.log("Handle Menu Button Calling ... ");
    this.setState({
      MenuOpen: !this.state.MenuOpen,
    });
  };

  handleOpenHome = async () => {
    console.log("Handle Open Home Calling ... ");
    localStorage.setItem("CMenuHome", true);
    localStorage.setItem("CMenuUpgrade", false);
    localStorage.setItem("CMenuMyPackages", false);
    localStorage.setItem("CMenuHistory", false);
    await this.setState({
      OpenHome: true,
      OpenUpgrade: false,
      OpenHistory: false,
      OpenMyPackages: false,
    });
  };

  handleOpenUpgrade = async () => {
    console.log("Handle Open Home Calling ... ");
    localStorage.setItem("CMenuHome", false);
    localStorage.setItem("CMenuUpgrade", true);
    localStorage.setItem("CMenuMyPackages", false);
    localStorage.setItem("CMenuHistory", false);
    await this.setState({
      OpenHome: false,
      OpenUpgrade: true,
      OpenHistory: false,
      OpenMyPackages: false,
    });
  };

  handleOpenMyPackages = async () => {
    console.log("Handle Open Home Calling ... ");
    localStorage.setItem("CMenuHome", false);
    localStorage.setItem("CMenuUpgrade", false);
    localStorage.setItem("CMenuMyPackages", true);
    localStorage.setItem("CMenuHistory", false);
    await this.setState({
      OpenHome: false,
      OpenUpgrade: false,
      OpenHistory: false,
      OpenMyPackages: true,
    });
  };

  handleOpenHistory = async () => {
    console.log("Handle Open Home Calling ... ");
    localStorage.setItem("CMenuHome", false);
    localStorage.setItem("CMenuUpgrade", false);
    localStorage.setItem("CMenuMyPackages", false);
    localStorage.setItem("CMenuHistory", true);
    await this.setState({
      OpenHome: false,
      OpenUpgrade: false,
      OpenHistory: true,
      OpenMyPackages: false,
    });
  };

  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      open: false,
    });
  };

  handleClose1 = () => {
    this.setState({
      open: false,
    });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handleRadioChange = (event) => {
    console.log("Handle Redio Change Calling...");
    this.setState({ ProjectStatus: event.target.value });
  };

  handleChanges = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
  };

  handleField = (event) => {
    console.log("Selected Job Field : ", event.target.value);
    this.setState({ JobField: event.target.value });
  };

  handleClose = () => {
    this.setState({ OpenTicket: false });
  };

  SignOut = async () => {
    //
    localStorage.removeItem("CustomerToken");
    localStorage.removeItem("CustomerID");
    localStorage.removeItem("CustomerFullName");
    localStorage.removeItem("CustomerEmail");
    //
    localStorage.removeItem("CMenuHome");
    localStorage.removeItem("CMenuUpgrade");
    localStorage.removeItem("CMenuMyPackages");
    localStorage.removeItem("CMenuHistory");
    //
    this.props.history.push("/");
  };

  handleOpenTicketModel = () => {
    this.setState({ OpenTicket: true });
  };

  handleOpenHomeBody = () => {
    let state = this.state;
    return (
      <div className="Customer-Home-Container">
        <div className="Customer-Home-SubContainer">
          <CustomerHome />
        </div>
      </div>
    );
  };

  handleOpenUpgradeBody = () => {
    let state = this.state;
    return (
      <div className="Customer-Upgrade-Container">
        <div className="Customer-Upgrade-SubContainer">
          <Upgrade />
        </div>
      </div>
    );
  };

  handleOpenHistoryBody = () => {
    let state = this.state;
    return (
      <div className="Customer-History-Container">
        <History />
      </div>
    );
  };

  handleOpenMyPackagesBody = () => {
    let state = this.state;
    return (
      <div className="Customer-MyPackages-Container">
        <MyPackages />
      </div>
    );
  };

  render() {
    let state = this.state;
    let self = this;
    console.log("state : ", state);
    return (
      <div className="CustomerDashboard-Container">
        <div className="Sub-Container">
          <div className="Header">
            <AppBar position="static" style={{ backgroundColor: "#2929CC" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  className=""
                  color="inherit"
                  onClick={this.handleMenuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  style={{ flex: 1.5, margin: "0 0 0 100px" }}
                >
                  Customer DashBoard
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    flexGrow: 3,
                    display: "flex",
                    padding: "5px 0 0 190px",
                    boxSizing: "border-box",
                  }}
                >
                  Broadband Service Provider &nbsp;
                  <div style={{ margin: "3px 0 0 0" }}>
                    <PermScanWifiIcon />
                  </div>
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "0 50px 0 0", backgroundColor: "red" }}
                  onClick={() => {
                    this.handleOpenTicketModel();
                  }}
                >
                  <BugReportIcon />
                  &nbsp; Raise Ticket
                </Button>
                <PopupState variant="popper" popupId="demo-popup-popper">
                  {(popupState) => (
                    <div>
                      <IconButton
                        edge="start"
                        color="inherit"
                        {...bindToggle(popupState)}
                      >
                        <AccountCircleIcon fontSize="large" />
                      </IconButton>

                      <Popper
                        {...bindPopper(popupState)}
                        transition
                        style={{ zIndex: 1234 }}
                      >
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper
                              style={{
                                padding: 15,
                                width: "fit-content",
                                height: 200,
                                textAlign: "center",
                                fontFamily: "Roboto",
                                backgroundColor: "#202020",
                                color: "white",
                              }}
                            >
                              <IconButton edge="start" color="inherit">
                                <AccountBoxIcon fontSize="large" />
                              </IconButton>
                              <Typography style={{ padding: 5 }}>
                                User ID : {localStorage.getItem("CustomerID")}
                              </Typography>
                              <Typography style={{ padding: 5 }}>
                                {localStorage.getItem("CustomerFullName")}
                              </Typography>
                              <Typography style={{ padding: 5 }}>
                                {localStorage.getItem("CustomerEmail")}
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  this.SignOut();
                                }}
                              >
                                <IconButton edge="start" color="inherit">
                                  <ExitToAppIcon fontSize="small" />
                                </IconButton>
                                <div>Sign Out</div>
                              </div>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </div>
                  )}
                </PopupState>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body">
              <div className={state.MenuOpen ? "SubBody11" : "SubBody12"}>
                <div
                  className={state.OpenHome ? "NavButton1" : "NavButton2"}
                  onClick={this.handleOpenHome}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <VisibilityIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Home</div>
                  ) : null}
                </div>

                <div
                  className={state.OpenUpgrade ? "NavButton1" : "NavButton2"}
                  onClick={this.handleOpenUpgrade}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <FiberNewIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Upgrade</div>
                  ) : null}
                </div>

                <div
                  className={state.OpenMyPackages ? "NavButton1" : "NavButton2"}
                  onClick={this.handleOpenMyPackages}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <AccessibilityIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">My Packages</div>
                  ) : null}
                </div>

                <div
                  className={state.OpenHistory ? "NavButton1" : "NavButton2"}
                  onClick={this.handleOpenHistory}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HistoryIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">History</div>
                  ) : null}
                </div>
              </div>
              <div className={state.MenuOpen ? "SubBody21" : "SubBody22"}>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      // height: state.OpenHome ? "100%" : "92%",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {state.OpenHome
                      ? this.handleOpenHomeBody()
                      : state.OpenUpgrade
                      ? this.handleOpenUpgradeBody()
                      : state.OpenHistory
                      ? this.handleOpenHistoryBody()
                      : state.OpenMyPackages
                      ? this.handleOpenMyPackagesBody()
                      : null}
                  </div>
                  {/* {!state.OpenHome ? (
                    <div
                      style={{
                        width: "100%",
                        height: "8%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Pagination
                        count={this.state.TotalPages}
                        Page={this.state.PageNumber}
                        onChange={this.handlePaging}
                        variant="outlined"
                        shape="rounded"
                        color="secondary"
                      />
                    </div>
                  ) : null} */}
                </div>

                <Modal
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  open={this.state.open}
                  onClose={this.handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={this.state.open}>
                    <div
                      style={{
                        backgroundColor: "white",
                        boxShadow: "5",
                        padding: "2px 4px 3px",
                        width: "1000px",
                        height: "630px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Roboto",
                          fontWeight: 500,
                          fontSize: 20,
                          color: "red",
                          margin: "0 0 20px 0",
                        }}
                      >
                        Application ID : {state.ApplicationID}
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>
                          <div className="Input-Field">
                            <div className="Text">Job ID</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.JobID}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Job Name</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.JobName}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Name</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Name}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Contact</div>

                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Contact}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">EmailID</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.EmailID}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Address</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Address}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Work Experience</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.WorkExperience}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Date Of Birth</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.DateOfBirth}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Passing Year</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.PassingYear}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">PinCode</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Pincode}
                            </div>
                          </div>
                        </div>
                        <div>
                          {/* <div
                              className="Input-Field"
                              style={{ margin: "46px 0" }}
                            ></div> */}
                          <div className="Input-Field">
                            <div className="Text">10th Percentage</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Percentage10}%
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">12th Percentage</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Percentage12}%
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Grad. Aggregation</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.GradAggregation}%
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">College Name</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.CollegeName}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Degree</div>

                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Degree}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Current Status</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.CurrentStatus}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Skill</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Skill}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Age</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Age}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Gender</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Gender}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Stream</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.StreamName}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="Input-Field"
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          component="span"
                          style={{ margin: "10px 10px 0 0" }}
                          onClick={() => {
                            this.handleDeleteApplication(state.ApplicationID);
                          }}
                        >
                          Reject Application
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ margin: "10px 0 0 10px" }}
                          onClick={this.handleClose1}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Fade>
                </Modal>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={this.state.OpenTicket}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="Model-Create-Ticket"
        >
          <Fade in={this.state.OpenTicket}>
            <div className="Model-Create-Ticket-Main">
              <div className="Model-Create-Ticket-Header">
                <div className="Model-Create-Ticket-Header-Text">
                  Create Ticket
                </div>
              </div>
              <div className="Model-Create-Ticket-Body">
                <InputLabel required>Plan Type</InputLabel>
                <FormControl
                  variant="filled"
                  className="Model-Create-Ticket-Body-PlanType"
                  size="small"
                  name="PlanType"
                  style={{ margin: "5px 0 20px 0" }}
                >
                  <Select
                    native
                    name="PlanType"
                    value={state.PlanType}
                    onChange={this.handleChanges}
                  >
                    <option value="device">Device</option>
                    <option value="plan">Plans</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
                <InputLabel required>Raise Type</InputLabel>
                <FormControl
                  variant="filled"
                  size="small"
                  name="RaiseType"
                  className="Model-Create-Ticket-Body-IssueType"
                  style={{ margin: "5px 0 20px 0" }}
                >
                  <Select
                    native
                    name="RaiseType"
                    value={state.RaiseType}
                    onChange={this.handleChanges}
                  >
                    <option value="issue">Issue</option>
                    <option value="improvement">Improvement</option>
                    <option value="changerequest">Change Request</option>
                  </Select>
                </FormControl>
                <div className="Line"></div>
                <InputLabel required>Summary</InputLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  name="Summary"
                  className="Model-Create-Ticket-Body-Summary"
                  style={{ margin: "5px 0 20px 0" }}
                  error={state.SummaryFlag}
                  value={state.Summary}
                  onChange={this.handleChanges}
                />
                <InputLabel required>Description</InputLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  name="Description"
                  className="Model-Create-Ticket-Body-Summary"
                  style={{ margin: "5px 0 0 0" }}
                  multiline
                  rows={5}
                  error={state.DescriptionFlag}
                  value={state.Description}
                  onChange={this.handleChanges}
                />
              </div>
              <div className="Model-Create-Ticket-Footer">
                <Button
                  variant="contained"
                  style={{ margin: "10px" }}
                  onClick={() => {
                    this.handleClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.handleCreateTicket();
                  }}
                >
                  Create
                </Button>
              </div>
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
