import { Headers } from "../../Redux/Reducers/reducers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MDBDataTable } from "mdbreact";
import {
  MasterCategory,
  Category,
  SubCategory,
} from "../../Components/Dropdowns/dropdowns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
  LabelList,
} from "recharts";
import "./Dashboard.scss";
const INPROGRESS = "red";
const recent = {
  columns: [
    { label: "S.No", field: "sno" },
    { label: "Date & Time", field: "dateTime" },
    { label: "Ticket ID", field: "tickedID" },
    { label: "Customer Details", field: "customerDetails" },
    { label: "Master Category", field: "mastercategory" },
    { label: "Status", field: "status" },
  ],
  rows: [
    {
      sno: "1",
      dateTime: "22-06-2021 10:20 am",
      tickedID: "010022 2696",
      customerDetails: "Joe 717-123-567",
      mastercategory: "Hair Cutting",
      Status: "INPROGRESS",
    },
    {
      sno: "2",
      dateTime: "20-06-2021 10:20 am",
      tickedID: "010022 2697",
      customerDetails: "Biden 718-123-567",
      mastercategory: "Hair Trim",
      Status: "NEW",
    },
    {
      sno: "3",
      dateTime: "22-06-2021 10:30 am",
      tickedID: "010022 3696",
      customerDetails: "Max 717-123-537",
      mastercategory: "Massage",
      Status: "COMPLETED",
    },
    {
      sno: "4",
      dateTime: "22-06-2021 10:20 am",
      tickedID: "010022 2696",
      customerDetails: "Mark 717-123-557",
      mastercategory: "Carpenter",
      Status: "CANCELLED",
    },
  ],
};
const pending = {
  columns: [
    { label: "S.No", field: "sno" },
    { label: "Date & Time", field: "dateTime" },
    { label: "Ticket ID", field: "tickedID" },
    { label: "Customer Details", field: "customerDetails" },
    { label: "Master Category", field: "mastercategory" },
  ],
  rows: [
    {
      sno: "1",
      dateTime: "22-06-2021 10:20 am",
      tickedID: "010022 2696",
      customerDetails: "Joe 717-123-567",
      mastercategory: "Hair Cutting",
    },
  ],
};
const data = [
  { month: "JAN", No_users: 0, users: 3 },
  { month: "FEB", No_users: 1, users: 4 },
  { month: "MAR", No_users: 2, users: 5 },
  { month: "APR", No_users: 3, users: 6 },
  { month: "MAY", No_users: 4, users: 7 },
  { month: "JUNE", No_users: 5, users: 3 },
  { month: "JULY", No_users: 6, users: 9 },
  { month: "AUG", No_users: 7, users: 10 },
  { month: "SEPT", No_users: 8, users: 11 },
  { month: "OCT", No_users: 9, users: 10 },
  { month: "NOV", No_users: 10, users: 11 },
  { month: "DEC", No_users: 11, users: 12 },
];
const cardData = [
  { color: "orange", value: 120, name: "New Requests" },
  { color: "blue", value: 162, name: "Requests in progress" },
  { color: "green", value: 204, name: "Requests Completed" },
  { color: "red", value: 18, name: "Requests Cancelled" },
  { color: "lightblue", value: 316, name: "RA Taskers" },
  { color: "brown", value: 298, name: "RA Requesters" },
  { color: "blue", value: 402, name: "Active Users" },
  { color: "cyan", value: 24578, name: "Revenue Earned", cost: "$24,587" },
];
export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Headers("DashBoard"));
    recent.rows.map((item, i) => {
      item["status"] = (
        <span key={i} className={"status " + item.Status}>
          {item.Status}
        </span>
      );
    });
  });
  return (
    <div className="dashboard">
      <div className="neo">
        <div className="activeUsers">
          <span>
            <div>ACTIVE USERS</div>
            <div className="subname">Unique users by month</div>
          </span>
          <span className="mapFilters">
            <FilterBoxs
              data={{
                heading: "Select by",
                type: "selectBox",
                option: ["Today", "This Week", "This Month", "This Quarter"],
              }}
            />
            <FilterBoxs data={{ heading: "From Date", type: "date" }} />
            <FilterBoxs data={{ heading: "To Date", type: "date" }} />
            <FilterBoxs
              data={{
                heading: "Country",
                type: "selectBox",
                option: ["USA", "Albania", "Algeria"],
              }}
            />
            <FilterBoxs
              data={{
                heading: "Region",
                type: "selectBox",
                option: ["Maine", "Vermont", "New Hampshire"],
              }}
            />
          </span>
        </div>
        <div className="graph">
          <LineChart width={1000} height={200} data={data} syncId="test">
            <CartesianGrid stroke="grey" fill="white" />
            <XAxis dataKey="month" height={50}>
              <Label value="Month" position="insideBottom" />
            </XAxis>
            <YAxis type="number" dataKey="No_users" width={50}>
              <Label value="Users" position="insideLeft" angle={90} />
            </YAxis>
            <Tooltip trigger="click" />
            <Line
              key="uv"
              type="monotone"
              dataKey="users"
              stroke="blue"
              strokeDasharray="1 1"
            >
              <LabelList position="bottom" offset={10} dataKey="name" />
            </Line>
          </LineChart>
        </div>
      </div>
      <div className="neo">
        <div>
          <div className="mapFilters">
            <FilterBoxs
              data={{
                heading: "Select by",
                type: "selectBox",
                option: ["Today", "This Week", "This Month", "This Quarter"],
              }}
            />
            <FilterBoxs data={{ heading: "From Date", type: "date" }} />
            <FilterBoxs data={{ heading: "To Date", type: "date" }} />
            <FilterBoxs
              data={{
                heading: "Country",
                type: "selectBox",
                option: ["USA", "Albania", "Algeria"],
              }}
            />
            <FilterBoxs
              data={{
                heading: "Region",
                type: "selectBox",
                option: ["Maine", "Vermont", "New Hampshire"],
              }}
            />
            {/* <MasterCategory />
            <Category />
            <SubCategory /> */}
          </div>
        </div>
        <div className="boxCard">
          {cardData.map((item, i) => {
            return <Cards data={item} key={i} />;
          })}
        </div>
      </div>
      <div className="requests">
        <div className="neo">
          <center>
            <h4>Recent Requests</h4>
          </center>
          <MDBDataTable small data={recent} responsive />
        </div>
        <div className="neo">
          <center>
            <h4>Pending Requests</h4>
          </center>
          <MDBDataTable small data={pending} responsive />
        </div>
      </div>
    </div>
  );
}
function FilterBoxs(props) {
  return (
    <div className="filterBox">
      <label>{props.data.heading}</label>
      {props.data.type === "selectBox" ? (
        <select className="box">
          {props.data.option.map((item, i) => {
            return <option key={i}>{item}</option>;
          })}
        </select>
      ) : (
        <input className="box" type={props.data.type} />
      )}
    </div>
  );
}
function Cards(props) {
  return (
    <div className="card">
      <span className="values" style={{ color: props.data.color }}>
        {props.data.cost ? props.data.cost : props.data.value}
      </span>
      <span>{props.data.name}</span>
    </div>
  );
}
