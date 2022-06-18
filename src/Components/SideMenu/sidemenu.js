import "./sidemenu.scss";
import AllImages from "../AllImages";
import React, { useState } from "react";
let CurrentPath = window.location.pathname;
function SideMenu() {
  return (
    <div className="SideMenu">
      <center>
        <img className="logo" src={AllImages.white_logo} alt="logo" />
        <div className="profile">
          <strong>Manny Pena</strong>
          <div className="email">MannyPena@pena4.com</div>
          <center>
            <img className="user_logo" src={AllImages.user} alt="logo" />
          </center>
        </div>
      </center>
      <div className="menus">
        {Menu("DashBoard", [], AllImages.dashboard, "/")}
        {Menu(
          "RA Taskers",
          [
            { name: "Manage Taskers", url: "/ManageTaskers" },
            { name: "Profile Verification", url: "/ProfileVerfication" },
          ],
          AllImages.taskers
        )}
        {Menu(
          "RA Service Requesters",
          [],
          AllImages.services,
          "/RAServiceRequesters"
        )}
        {Menu("RA Bookings", [], AllImages.bookings, "/Bookings")}
        {Menu(
          "Service Catalogue",
          [
            {
              name: "Master Categories",
              url: "/MasterCategory",
            },
            { name: "Categories", url: "/Category" },
            { name: "Sub Categories", url: "/SubCategory" },
            {
              name: "Micro Categories",
              url: "/MicroCategory",
            },
          ],
          AllImages.menu,
          "#"
        )}
        {Menu(
          "Service Locations",
          [
            {
              name: "Manage Service Locations",
              url: "/ManageLocations",
            },
            { name: "Background Inclusion List", url: "/BackgroundInclusion" },
          ],
          AllImages.locationicon
        )}
        {Menu("Offers & Discounts", [], AllImages.discount, "/OfferDiscount")}
        {Menu(
          "Price and Subscription Plan",
          [],
          AllImages.price,
          "/PriceSubscriptionPlan"
        )}
        {Menu(
          "Admin Access Control",
          [
            { name: "Users", url: "/Users" },
            { name: "Roles & Privileges", url: "/RolesPriviliges" },
          ],
          AllImages.access
        )}
        {Menu(
          "Credit Configuration",
          [],
          AllImages.credit,
          "/CreditConfiguration"
        )}
        {Menu(
          "Notification Settings",
          [],
          AllImages.settings,
          "/Notifications"
        )}
        {Menu("Reports", [], AllImages.reports)}
      </div>
    </div>
  );
}
export default SideMenu;
function Menu(mainName, submenus, icons, url) {
  let Active = url === CurrentPath ? true : false;
  if (submenus.length !== 0) {
    submenus.map((item, i) => {
      if (item.url === CurrentPath) {
        Active = true;
      }
      return "";
    });
  }
  const [active, setActive] = useState(Active);
  return (
    <div className="MenuCard">
      <a href={url}>
        <div
          className={active === true ? "active MenuItems" : "MenuItems"}
          onClick={() => setActive(!active)}
        >
          <img className="menu_logo" src={icons} alt="" />
          <span className="item_name">{mainName}</span>
        </div>
      </a>
      {submenus.length !== 0 ? (
        active === false ? (
          <div></div>
        ) : (
          <div className="subMenuItems">
            {submenus.map((item, i) => {
              return (
                <div
                  key={i}
                  className={item.url === CurrentPath ? "active" : ""}
                >
                  <a href={item.url}>{item.name}</a>
                </div>
              );
            })}
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}
