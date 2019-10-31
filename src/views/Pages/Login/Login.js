import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {loginAction} from '../../../redux/actions/login'
import { getCustomerId, getCustomerDetails } from "../../../services/webService";
import moment from "moment";

class Login extends Component {

  constructor(props){
    super(props)

    this.state={
      username: null
    }
  }

  login = () => {

    var username = this.state.username
      if (username !== "marytan" && username !== "limzeyang") {
        username = "prasannaghali";
      }
      var customerId, lastName, firstName, lastLogin;
      getCustomerId(username)
        .then(res => {
          customerId = res.data.customerId;
        })
        .catch(e => {
          console.log(e);
          customerId = 1;
        })
        .finally(() => {
          getCustomerDetails(customerId)
            .then(res => {
              lastName = res.data.lastName;
              firstName = res.data.firstName;
              lastLogin = moment(res.data.lastLogIn).format("YYYY-MM-DD");
            })
            .catch(e => {
              console.log(e);
              lastName = "Lim";
              firstName = "Ze Yang";
              lastLogin = "2019-01-27";
            }).finally(() => {
              const {loginAction} = this.props
              const obj = {
                lastName: lastName,
                firstName: firstName,
                lastLogin: lastLogin,
                customerId: customerId}
              loginAction(obj)
              window.location.hash = "/dashboard"
            })
        });


    

    
  }

  handleChange =e => {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" onChange={this.handleChange}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.login}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Contact Us</h2>
                      <p>If you have any problems related to your online banking account, please contact us by email or phone number: +65 9000 1000 </p>
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Contact Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      lastName: state.user.lastName,
      firstName: state.user.firstName,
      lastLogin: state.user.lastLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({loginAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
