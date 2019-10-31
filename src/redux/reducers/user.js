import { getCustomerId, getCustomerDetails } from "../../services/webService";
import moment from "moment";

const initialState = {
  login: false,
  lastName: "xu",
  firstName: "jinzheng",
  lastLogin: "2019-10-01",
  customerId: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        login: true,
        lastName: action.obj.lastName,
        firstName: action.obj.firstName,
        lastLogin: action.obj.lastLogin,
        customerId: action.obj.customerId
      };

    case "LOGOUT":
      console.log("reducer logout!");
      return {
        ...state,
        login: false
      };
    default:
      console.log("reducer default");
      return {
        ...state
      };
  }
};

export default user;
