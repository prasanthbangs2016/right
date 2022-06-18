import React from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MicroCategoryList from "../Pages/Categories/MicroCategories/microcategories";
import SubCategories from "../Pages/Categories/SubCategories/subcategories";
import Categories from "../Pages/Categories/Categories /categories";
import MasterCategories from "../Pages/Categories/MasterCategories/mastercategories";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageTaskers from "../Pages/RATaskers/manageTakers";
import ProfileVerfication from "../Pages/RATaskers/ProfileVerfication/profileVerfication";
import Users from "../Pages/AccessControl/users";
import RolesPriviliges from "../Pages/AccessControl/RolesPrivileges/rolesPrivileges";
import PriceSubscriptionPlan from "../Pages/PriceSubscriptionPlan/priceSubscriptionPlan";
import Notifications from "../Pages/Notifications/notifications";
import CreditConfiguration from "../Pages/creditConfiguration_denomination/creditConfiguration";
import Denominations from "../Pages/creditConfiguration_denomination/denominations";
import BackgroundInclusion from "../Pages/ServiceLocations/BackGroundInclusion/backgroundinclusion";
import RAServiceRequesters from "../Pages/RAServiceRequesters/raServiceRequesters";
import Bookings from "../Pages/RABookings/raBookings";
import Chat from "../Pages/RABookings/chat";
import OfferDiscount from "../Pages/OfferandDiscounts/offerdiscounts";
import ManageLocations from "../Pages/ServiceLocations/manageLocations/manageLocations"
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/OfferDiscount" exact element={<OfferDiscount />} />
        <Route path="/Chat" exact element={<Chat />} />
        <Route path="/Bookings" exact element={<Bookings />} />
        <Route path="/ManageLocations" exact element={<ManageLocations />} />
        <Route
          path="/RAServiceRequesters"
          exact
          element={<RAServiceRequesters />}
        />
        <Route
          path="/BackgroundInclusion"
          exact
          element={<BackgroundInclusion />}
        />
        <Route path="/RolesPriviliges" exact element={<RolesPriviliges />} />
        <Route
          path="/CreditConfiguration"
          exact
          element={<CreditConfiguration />}
        />
        <Route path="/Denominations" exact element={<Denominations />} />
        <Route path="/Notifications" exact element={<Notifications />} />
        <Route
          path="/PriceSubscriptionPlan"
          exact
          element={<PriceSubscriptionPlan />}
        />
        <Route path="/MicroCategory" exact element={<MicroCategoryList />} />
        <Route
          path="/ProfileVerfication"
          exact
          element={<ProfileVerfication />}
        />
        <Route path="/ManageTaskers" exact element={<ManageTaskers />} />
        <Route path="/SubCategory" exact element={<SubCategories />} />
        <Route path="/Category" exact element={<Categories />} />
        <Route path="/MasterCategory" exact element={<MasterCategories />} />
        <Route path="/Users" exact element={<Users />} />
      </Routes>
    </Router>
  );
}
export default Routing;
