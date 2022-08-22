import React, { Component } from "react";
import "./AdminDashboard.css";
import AdminHome from "./AdminHome.js";
import Packages from "./Packages";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Pagination from "@material-ui/lab/Pagination";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import PermScanWifiIcon from "@material-ui/icons/PermScanWifi";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FeedbackIcon from "@material-ui/icons/Feedback";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Switch from "@material-ui/core/Switch";
import FolderIcon from "@material-ui/icons/Folder";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GetAppIcon from "@material-ui/icons/GetApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Popover from "@material-ui/core/Popover";

//Table Library
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Popper from "@material-ui/core/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      Message: "",
      //
      NumberOfRecordPerPage: 6,
      //
      PageNumber: 1,
      JobPageNumber: 1,
      ApplicationPageNumber: 1,
      FeedbackPageNumber: 1,

      TotalPages: 0,
      TotalRecords: 0,

      open: false,
      MenuOpen: false,
      OpenLoader: false,
      OpenSnackBar: false,

      OpenHome: true,
      OpenPackages: false,
      OpenComplaint: false,
      OpenFeedBack: false,

      Update: false,

      OpenProfile: false,
      anchorEl: null,
    };
  }

  componentWillMount() {
    console.log("componentWillMount Calling....");

    this.setState({
      OpenHome: localStorage.getItem("AMenuHome") === "true" ? true : false,
      OpenPackages:
        localStorage.getItem("AMenuPackage") === "true" ? true : false,
      OpenComplaint:
        localStorage.getItem("AMenuComplaints") === "true" ? true : false,
      OpenFeedBack:
        localStorage.getItem("AMenuFeedback") === "true" ? true : false,
    });

    if (localStorage.getItem("AMenuHome") === "true") {
    } else if (localStorage.getItem("AMenuPackage") === "true") {
    } else if (localStorage.getItem("AMenuComplaints") === "true") {
    } else if (localStorage.getItem("AMenuFeedback") === "true") {
    }
  }

  handleMenuButton = (e) => {
    console.log("Handle Menu Button Calling ... ");
    this.setState({
      MenuOpen: !this.state.MenuOpen,
    });
  };

  handleOpen = async () => {
    console.log("Handle Open Calling ... ");

    await this.setState({
      //open: true,
      OpenHome: true,
      OpenComplaint: false,
    });
  };

  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      open: false,
      Update: false,
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

  handleOpenHome = (e) => {
    console.log("Handle Open Home Calling ... ");
    localStorage.setItem("AMenuHome", true);
    localStorage.setItem("AMenuPackage", false);
    localStorage.setItem("AMenuComplaints", false);
    localStorage.setItem("AMenuFeedback", false);
    this.setState({
      OpenHome: true,
      OpenPackages: false,
      OpenComplaint: false,
      OpenFeedBack: false,
    });
  };

  handlePackages = async () => {
    console.log("Handle Open Packages Calling...");
    localStorage.setItem("AMenuHome", false);
    localStorage.setItem("AMenuPackage", true);
    localStorage.setItem("AMenuComplaints", false);
    localStorage.setItem("AMenuFeedback", false);
    this.setState({
      OpenHome: false,
      OpenPackages: true,
      OpenComplaint: false,
      OpenFeedBack: false,
    });
  };

  handleComplaint = async () => {
    console.log("Handle Open Packages Calling...");
    localStorage.setItem("AMenuHome", false);
    localStorage.setItem("AMenuPackage", false);
    localStorage.setItem("AMenuComplaints", true);
    localStorage.setItem("AMenuFeedback", false);
    this.setState({
      OpenHome: false,
      OpenPackages: false,
      OpenComplaint: true,
      OpenFeedBack: false,
    });
  };

  handleFeedBackOpen = (e) => {
    console.log("Handle Open FeedBack Calling...");
    localStorage.setItem("AMenuHome", false);
    localStorage.setItem("AMenuPackage", false);
    localStorage.setItem("AMenuComplaints", false);
    localStorage.setItem("AMenuFeedback", true);
    this.setState({
      OpenHome: false,
      OpenPackages: false,
      OpenComplaint: false,
      OpenFeedBack: true,
    });
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

  handleActiveChange = (e) => {
    console.log(" Checked Status : ", e.target.checked);
    this.setState({ IsActive: e.target.checked });
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
  };

  handleField = (event) => {
    console.log("Selected Job Field : ", event.target.value);
    this.setState({ JobField: event.target.value });
  };

  SignOut = async () => {
    //
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("AdminID");
    localStorage.removeItem("AdminFullName");
    localStorage.removeItem("AdminEmail");
    //
    localStorage.removeItem("AMenuHome");
    localStorage.removeItem("AMenuPackage");
    localStorage.removeItem("AMenuComplaints");
    localStorage.removeItem("AMenuFeedback");
    //
    this.props.history.push("/");
  };

  handleOpenHomeBody = () => {
    let state = this.state;
    return (
      <div className="Admin-Home-Container">
        <div className="Admin-Home-SubContainer">
          <AdminHome />
        </div>
      </div>
    );
  };

  handleOpenPackagesBody = () => {
    let state = this.state;
    return (
      <div className="Admin-Packages-Container">
        <div className="Admin-Packages-SubContainer">
          <Packages />
        </div>
      </div>
    );
  };

  OpenComplaintBody = () => {
    let state = this.state;
    return <div className="Admin-Complaint-Container"></div>;
  };

  OpenFeedBackBody = () => {
    let state = this.state;
    return <div className="Admin-Feedback-Container"></div>;
  };

  render() {
    let state = this.state;
    let self = this;
    console.log("state : ", state);
    return (
      <div className="AdminDashboard-Container">
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
                  style={{ flex: 1, margin: "0 0 0 100px" }}
                >
                  Admin DashBoard
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
                                Admin ID : {localStorage.getItem("AdminID")}
                              </Typography>
                              <Typography style={{ padding: 5 }}>
                                {localStorage.getItem("AdminFullName")}
                              </Typography>
                              <Typography style={{ padding: 5 }}>
                                {localStorage.getItem("AdminEmail")}
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
                    <HomeIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Home</div>
                  ) : null}
                </div>
                <div
                  className={state.OpenPackages ? "NavButton1" : "NavButton2"}
                  onClick={this.handlePackages}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <ViewCarouselIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Packages</div>
                  ) : null}
                </div>

                <div
                  className={state.OpenComplaint ? "NavButton1" : "NavButton2"}
                  onClick={this.handleComplaint}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <ContactMailIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Complaints</div>
                  ) : null}
                </div>

                <div
                  className={state.OpenFeedBack ? "NavButton1" : "NavButton2"}
                  onClick={this.handleFeedBackOpen}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <FeedbackIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">FeedBack</div>
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
                      height:
                        state.OpenHome || state.OpenPackages ? "100%" : "92%",
                      width: "100%",
                    }}
                  >
                    {state.OpenHome
                      ? this.handleOpenHomeBody()
                      : state.OpenPackages
                      ? this.handleOpenPackagesBody()
                      : state.OpenComplaint
                      ? this.OpenComplaintBody()
                      : state.OpenFeedBack
                      ? this.OpenFeedBackBody()
                      : null}
                  </div>
                  {false ? (
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
                  ) : null}
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
