import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  Table,
  Button
} from "reactstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import {
  getDepositAccounts,
  getCreditAccounts,
  getDepositAccountBalance,
  getCreditAccountBalance,
  getTransactions
} from "../../services/webService";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 1,
      accountType: window.location.hash.toString().includes("deposit")
        ? "DEPOSIT"
        : "CREDIT",
      accounts: [],
      selectedAccountId: null,
      accountBalance: null,
      startDate: this.defaultStartDate(),
      endDate: this.defaultEndDate(),
      transactions: []
    };
  }

  searchRecord = accountId => {
    getTransactions(
      accountId,
      moment(this.state.startDate).format("MM-DD-YYYY"),
      moment(this.state.endDate).format("MM-DD-YYYY")
    )
      .then(res => {
        this.setState({
          transactions: res.data.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        });
      })
      .catch(e => console.log(e));
  };

  handleAccountClick = acc => {
    this.setState({
      selectedAccountId: acc.accountId
    });
    if (this.state.accountType === "DEPOSIT") {
      getDepositAccountBalance(acc.accountId)
        .then(res => {
          console.log(res.data);
          this.setState({
            accountBalance: res.data
          });
        })
        .catch(e => console.log(e));
    } else {
      getCreditAccountBalance(acc.accountId)
        .then(res => {
          console.log(res.data);
          this.setState({
            accountBalance: res.data
          });
        })
        .catch(e => console.log(e));
    }

    this.searchRecord(acc.accountId);
  };

  handleDateChange = state => date => {
    this.setState({
      [state]: date
    });
  };

  defaultStartDate() {
    var d = new Date();
    d.setFullYear(2018);
    d.setDate(1);
    return d;
  }

  defaultEndDate() {
    var d = new Date();
    d.setFullYear(2018);
    return d;
  }

  componentDidMount() {
    if (this.state.accountType === "DEPOSIT") {
      getDepositAccounts(this.state.customerId)
        .then(res => {
          console.log(res.data);
          this.setState({
            accounts: res.data
          });
        })
        .catch(e => console.log(e));
    } else {
      getCreditAccounts(1)
        .then(res => {
          console.log(res.data);
          this.setState({
            accounts: res.data
          });
        })
        .catch(e => console.log(e));
    }
  }

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <h2>Transaction - {this.state.accountType}</h2>

            {this.state.accounts.length > 0 ? (
              <div>
                <Row className="mt-5">
                  <Col sm="12" md="4">
                    <ListGroup>
                      {this.state.accounts.map(acc => {
                        return (
                          <ListGroupItem
                            key={acc.accountId}
                            active={
                              this.state.selectedAccountId === acc.accountId
                            }
                            onClick={() => this.handleAccountClick(acc)}
                          >
                            {acc.type} - {acc.displayName} - {acc.accountNumber}
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  </Col>
                  <Col sm="12" md="8">
                    {this.state.selectedAccountId ? (
                      <div>
                        <p>
                          Balance:{" "}
                          {this.state.accountBalance &&
                            this.state.accountBalance.currency}
                          {this.state.accountBalance &&
                            this.state.accountBalance.availableBalance}
                        </p>
                        <Form inline>
                          <FormGroup className="pr-1">
                            <Label>Start Date:</Label>
                          </FormGroup>
                          <FormGroup className="pr-1">
                            <DatePicker
                              className="form-control"
                              placeholderText="MM-DD-YYYY"
                              dateFormat="MM-dd-yyyy"
                              selected={this.state.startDate}
                              onChange={this.handleDateChange("startDate")}
                            />
                          </FormGroup>
                          <FormGroup className="pr-1">
                            <Label>End Date:</Label>
                          </FormGroup>
                          <FormGroup className="pr-1">
                            <DatePicker
                              className="form-control"
                              placeholderText="MM-DD-YYYY"
                              dateFormat="MM-dd-yyyy"
                              selected={this.state.endDate}
                              onChange={this.handleDateChange("endDate")}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Button
                              outline
                              size="md"
                              color="primary"
                              onClick={() =>
                                this.searchRecord(this.state.selectedAccountId)
                              }
                            >
                              Search
                            </Button>
                          </FormGroup>
                        </Form>

                        <Table className="mt-3">
                          <thead>
                            <tr>
                              <th style={{ width: "16vw" }}>Time</th>
                              <th style={{ width: "16vw" }}>Tag</th>
                              <th style={{ width: "16vw" }}>Amount</th>
                              {/* <th>Reference</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.transactions.map((record, index) => (
                              <tr key={index}>
                                <td style={{ width: "16vw" }}>
                                  {moment(record.date).format(
                                    "MM-DD-YYYY hh:mm"
                                  )}
                                </td>
                                <td style={{ width: "16vw" }}>{record.tag}</td>
                                <td style={{ width: "16vw" }}>
                                  {record.type === "CREDIT" ? "+" : "-"}
                                  {record.amount}
                                </td>
                                {/* <td>{record.referenceNumber}</td> */}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    ) : (
                      <div>
                        <p>no account is selected.</p>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            ) : (
              <p>no accounts found</p>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Transaction;
