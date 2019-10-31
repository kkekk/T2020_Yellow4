import React, { Component } from "react";
import { Card, CardBody, Col, Row, ListGroup, ListGroupItem } from "reactstrap";

import {
  getDepositAccounts,
  getCreditAccounts,
  getDepositAccountBalance,
  getCreditAccountBalance
} from "../../services/webService";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 1,
      depositAccounts: [],
      creditAccounts: [],
      selectedAccount: null
    };
  }

  handleAccountClick = e =>{
    console.log(e.target.key)
  }

  componentDidMount() {
    getDepositAccounts(this.state.customerId)
      .then(res => {
        console.log(res.data);
        this.setState({
          depositAccounts: res.data
        });
      })
      .catch(e => console.log(e));

    getCreditAccounts(1)
      .then(res => {
        console.log(res.data);
        this.setState({
          creditAccounts: res.data
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <h2>Transaction</h2>
            <Row>
              <Col sm="12" md="4">
                <ListGroup>
                  {this.state.depositAccounts.map(acc => {
                    return (
                      <ListGroupItem key={acc.accountId} onClick={this.handleAccountClick}>
                        D:{acc.type} - {acc.displayName} - {acc.accountNumber}
                      </ListGroupItem>
                    );
                  })}
                  {this.state.creditAccounts.map(acc => {
                    return (
                      <ListGroupItem key={acc.accountId} onClick={this.handleAccountClick}>
                        C: {acc.type} - {acc.displayName} - {acc.accountNumber}
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </Col>
              <Col sm="12" md="8">
                <p>details</p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Transaction;
