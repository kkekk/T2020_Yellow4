import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Card,
  CardBody,
  CardHeader,
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Col,
  Row,
  CardColumns,
  Container,
  Progress
} from "reactstrap";
import { Doughnut } from "react-chartjs-2";

import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

import GrabImg from "./img/grabimg.png";
import GojekImg from "./img/gojekimg.png";
import DBSLiveFresh from "./img/dbslivefresh.png";
import DBSWomanCard from "./img/dbswomancard.png";
import DBSLogo from "./img/dbslogo.png";
import DiningPromo from "./img/diningpromo.jpg";
import GojekPromo from "./img/gojekpromo.jpg";
import ShopBack from "./img/shopbackdeals.jpg";
import TuesDeals from "./img/tuesdaydeals.jpg";

import { connect } from "react-redux";

import {
  getDashboardData,
  getDepositAccounts
} from "../../services/webService";
import { summarizers } from "istanbul-lib-report";

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

const doughnutOption = {
  legend: {
    display: false
  }
};

const items = [
  {
    src: "Grab discount with PayLah!",
    altText: "Slide 1",
    caption: "Slide 1",
    img: GrabImg
  },
  {
    src: "GoJek voucher with DBS card!",
    altText: "Slide 2",
    caption: "Slide 2",
    img: GojekImg
  },
  {
    src: "Cashback with DBS new credit card!",
    altText: "Slide 3",
    caption: "Slide 3",
    img: DBSLogo
  }
];

// Doughnut Chart
const doughnut_inflow = {
  labels: ["ATM", "F&B", "Transfers", "Transport"],
  datasets: [
    {
      data: [300, 50, 100, 100],
      backgroundColor: ["#FF6384", "#ff7d98", "#ff96ac", "#ffb0c0"],
      hoverBackgroundColor: ["#FF6384", "#ff7d98", "#ff96ac", "#ffb0c0"]
    }
  ]
};

const doughnut_outflow = {
  labels: ["ATM", "F&B", "Transfers", "Transport"],
  datasets: [
    {
      data: [300, 50, 100, 100],
      backgroundColor: ["#FF6384", "#ff7d98", "#ff96ac", "#ffb0c0"],
      hoverBackgroundColor: ["#FF6384", "#ff7d98", "#ff96ac", "#ffb0c0"]
    }
  ]
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

    this.state = {
      activeIndex: 0 ,
      accountData: null,
      doughnut_inflow: null,
      fbRate: 0,
      transportationRate: 0,
      shoppingRate: 0,
      inflowTotal: 0,
      outflowTotal: 0
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  componentDidMount() {
    var accountList = [];
    getDepositAccounts(this.props.customerId)
      .then(res => {
        res.data.map(acc => {
          accountList.push(acc.accountId);
          return null;
        });
        console.log(accountList);
      })
      .catch(e => console.log(e))
      .finally(() => {
        getDashboardData(accountList)
          .then(res => {
            console.log(res.data);
            const debitData = res.data.debit;
            const doughnut_outflow = {
              labels: ["ATM", "F&B", "Transfers", "Transport"],
              datasets: [
                {
                  data: [
                    debitData.debit_tag_sum.ATM,
                    debitData.debit_tag_sum["F&B"],
                    debitData.debit_tag_sum.TRANSFER,
                    debitData.debit_tag_sum.TRANSPORT
                  ],
                  backgroundColor: ["#FF6384", "#ff7d98", "#ff96ac", "#ffb0c0"],
                  hoverBackgroundColor: [
                    "#FF6384",
                    "#ff7d98",
                    "#ff96ac",
                    "#ffb0c0"
                  ]
                }
              ]
            };

            var outFlowSum =
              debitData.debit_tag_sum.ATM +
              debitData.debit_tag_sum["F&B"] +
              debitData.debit_tag_sum.TRANSFER +
              debitData.debit_tag_sum.TRANSPORT;

            this.setState({
              accountData: res.data[10],
              doughnut_outflow: doughnut_outflow,
              fbRate: debitData.debit_tag_sum["F&B"] / 20,
              transportationRate: debitData.debit_tag_sum.TRANSPORT / 5,
              shoppingRate: 82,
              inflowTotal: res.data.credit.credit_tag_sum.TRANSFER,
              outflowTotal: outFlowSum
            });
          })
          .catch(e => console.log(e));
      });
  }

  render() {
    const { activeIndex } = this.state;

    const messages = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <Col sm="12" md={{ size: 6, offset: 4 }}>
            <img src={item.img} style={{ weight: "126px", height: "30px" }} />
            {item.src}
          </Col>
        </CarouselItem>
      );
    });

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="12">
            {/* <Card>
              <CardBody>
                <Carousel
                  activeIndex={this.state.activeIndex}
                  next={this.next}
                  previous={this.previous}
                  ride="carousel"
                >
                  {messages}
                </Carousel>

              </CardBody>
            </Card> */}
            <Card>
              <CardBody>
              <Carousel
                  activeIndex={this.state.activeIndex}
                  next={this.next}
                  previous={this.previous}
                  ride="carousel"
                >
                  {messages}
                </Carousel>
                <Row className="mt-5">
                  <Col xs="6" sm="4">
                    <h4> Outflow </h4>
                    <Col>
                      <div className="chart-wrapper">
                        <Doughnut
                          data={this.state.doughnut_outflow}
                          options={doughnutOption}
                        />
                      </div>
                    </Col>
                  </Col>

                  <Col xs="6" sm="4">
                    <h4> Budgeting Alerts</h4>
                    F&B
                    <Progress
                      color="success"
                      value={this.state.fbRate}
                      className="mb-3"
                    />
                    <br />
                    Transportation
                    <Progress
                      color="success"
                      value={this.state.transportationRate}
                      className="mb-3"
                    />
                    <br />
                    Shopping
                    <Progress
                      color="danger"
                      value={this.state.shoppingRate}
                      className="mb-3"
                    />
                  </Col>

                  <Col sm="4">
                    <h4> Quick Analysis </h4>
                    <p> Total In Flow : S${this.state.inflowTotal} </p>
                    <p> Total Out Flow: S${this.state.outflowTotal}</p>
                    <p>
                      {" "}
                      Net Flow for this Month:{" "}
                      S${this.state.inflowTotal - this.state.outflowTotal}{" "}
                    </p>
                  </Col>
                </Row>



                <h3> Get other deals with these! </h3>
                <Row>
                  <Col xs="6" sm="4">
                    <img
                      src={DBSLiveFresh}
                      style={{ width: "250px", height: "170px" }}
                    />
                  </Col>

                  <Col xs="6" sm="4">
                    <img
                      src={TuesDeals}
                      style={{ width: "350px", height: "170px" }}
                    />
                  </Col>

                  <Col sm="4">
                    <img
                      src={GojekPromo}
                      style={{ width: "350px", height: "170px" }}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customerId: state.user.customerId
  };
};

export default connect(mapStateToProps)(Dashboard);
