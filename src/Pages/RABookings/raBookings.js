import { useEffect } from "react";
import List from "../../Components/TableTemplate/List";
import "./raBookings.scss";
import { GrSchedule } from "react-icons/gr";
import { AiFillCloseCircle } from "react-icons/ai";
import Rescheduled from "./rescheduled";
import CommonModal from "../../Components/commonmodal";
import Details from "./details";
const create = "";
const Data = {
  Header: "Bookings",
  name: "Bookings",
  nameKey: "State",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Booking ID", field: "booking" },
      { label: "City", field: "city" },
      { label: "Master Category", field: "mcategory" },
      { label: "Category", field: "category" },
      { label: "Sub Category", field: "subcategory" },
      { label: "Booking Date", field: "bookingDate" },
      { label: "Tasker $Rev.", field: "Tasker" },
      { label: "RA $Rev.", field: "Rev" },
      { label: "Date of Appointment", field: "Appointment" },
      { label: "Status", field: "statuss" },
      { label: "Action", field: "actions" },
    ],
    rows: [
      {
        city: "Chicago",
        mcategory: "Hair",
        category: "Haircut",
        subcategory: "Trimming",
        bookingDate: "06-29-21",
        Tasker: "$36.30",
        Rev: "$3.30",
        Appointment: "07-01-21",
        statuss: "Accepted",
      },
    ],
  },
  filters: [
    {
      name: "Select by",
      option: ["Today", "This Week", "This Month", "This Year"],
    },
    { name: "From Date", type: "dateBox" },
    { name: "To Date", type: "dateBox" },
    { name: "State", option: ["New York", "Vermont"] },
    { name: "City", option: ["Los Angeles", "Chicago"] },
    { name: "Master Category", option: [] },
    { name: "Category", option: ["Hair", "Home Cleaning"] },
    { name: "SubCategory", option: ["Hair Color", "Hair Wash"] },
    {
      name: "Status",
      option: ["Accepted", "Cancelled", "Rescheduled", "Completed"],
    },
  ],
  create: create,
  add: false,
};
export default function Bookings() {
  useEffect(() => {
    Data.List.rows.map((item, i) => {
      item["booking"] = (
        <CommonModal
          data={{
            heading: <span className="ModalCell">RA2021-1001</span>,
            header: "Booking Details",
            body: <Details />,
            size: "lg",
          }}
        />
      );

      item["actions"] = (
        <span>
          <AiFillCloseCircle color="red" size={22} />
          <span style={{ marginLeft: "20px" }}></span>
          <CommonModal
            data={{
              heading: <GrSchedule color="black" size={18} />,
              header: "Booking Reschedule",
              body: <Rescheduled />,
              size: "",
            }}
          />
        </span>
      );
      return "";
    });
  }, []);
  return <List data={Data} />;
}
