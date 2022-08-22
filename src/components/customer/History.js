import React, { Component } from "react";
import "./History.scss";
import { CustomerDataServices } from "../../services/CustomerDataServices";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default class History extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      //
      PageNumber: 1,
      TotalPage: 0,
    };
  }

  componentWillMount() {
    console.log("History component will mount calling ... ");
    this.GetTicketHistory(this.state.PageNumber);
  }

  GetTicketHistory = (CurrentPageNumber) => {
    let data = {
      userID: localStorage.getItem("CustomerID"),
      pageNumber: CurrentPageNumber,
      numberOfRecordPerPage: 10,
    };
    CustomerDataServices.GetTicketHistory(data)
      .then((data) => {
        console.log("GetTicketHistory Data : ", data);
        this.setState({
          rows: data.data,
          TotalPage: data.totalPage,
        });
      })
      .catch((error) => {
        console.log("GetTicketHistory Error : ", error);
      });
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    this.GetTicketHistory(value);
  };

  render() {
    let state = this.state;
    let self = this;
    return (
      <div className="History-MainContainer">
        <div className="History-MainContainer-Header">Ticket History</div>
        <div className="History-MainContainer-Body">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow style={{ display: "flex" }}>
                  <TableCell style={{ fontSize: 16, flex: 0.2 }} align="left">
                    Id
                  </TableCell>
                  <TableCell style={{ fontSize: 16, flex: 5 }} align="left">
                    Summary
                  </TableCell>
                  <TableCell style={{ fontSize: 16, flex: 1 }} align="center">
                    Product Type&nbsp;
                  </TableCell>
                  <TableCell style={{ fontSize: 16, flex: 1 }} align="center">
                    Assigner&nbsp;
                  </TableCell>
                  <TableCell style={{ fontSize: 16, flex: 1 }} align="center">
                    Reporter&nbsp;
                  </TableCell>
                  <TableCell style={{ fontSize: 16, flex: 1 }} align="center">
                    Status&nbsp;
                  </TableCell>
                  <TableCell style={{ fontSize: 16, flex: 1 }} align="center">
                    Operation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.rows.map((row) => (
                  <TableRow key={row.name} style={{ display: "flex" }}>
                    <TableCell
                      align="left"
                      component="th"
                      scope="row"
                      style={{ flex: 0.2 }}
                    >
                      {row.ticketID}
                    </TableCell>
                    <TableCell align="left" style={{ flex: 5 }}>
                      {row.summary}
                    </TableCell>
                    <TableCell align="center" style={{ flex: 1 }}>
                      {row.planType}
                    </TableCell>
                    <TableCell align="center" style={{ flex: 1 }}>
                      {row.assigner}
                    </TableCell>
                    <TableCell align="center" style={{ flex: 1 }}>
                      {row.reportor}
                    </TableCell>
                    <TableCell align="center" style={{ flex: 1 }}>
                      {row.status}
                    </TableCell>
                    <TableCell align="center" style={{ flex: 1, padding: 0 }}>
                      <IconButton
                        variant="outlined"
                        color="primary"
                        size="medium"
                        onClick={() => {
                          self.handleEditTicket(row);
                        }}
                        // style={{ margin: '0 px 0 0' }}
                      >
                        <EditIcon size="medium" />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        style={{ color: "black" }}
                        size="medium"
                        onClick={() => {
                          self.handleDeleteTicket(row.ticketID);
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
        <div className="History-MainContainer-Footer">
          <Pagination
            count={this.state.TotalPage}
            Page={this.state.PageNumber}
            onChange={this.handlePaging}
            variant="outlined"
            shape="rounded"
            color="secondary"
          />
        </div>
      </div>
    );
  }
}
