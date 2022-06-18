import { useEffect } from "react";
import List from "../../Components/TableTemplate/List";
import ActionButtons from "../../Components/TableTemplate/actionButton";
const create = {
  name: "New Subscription Plan",
  nameKey: "SubscriptionType",
  fields: [
    { name: "Subscription Type", type: "selectbox", option: [] },
    {
      name: "Applicable To",
      type: "selectbox",
      option: [
        { id: "", value: "RA Tasker" },
        { id: "", value: "RA Service Requester" },
      ],
    },
    { name: "Duration", type: "selectbox", option: [] },
    { name: "Price", type: "text" },
    { name: "Start Date", type: "date" },
    { name: "End Date", type: "date" },
    {
      name: "Status",
      type: "selectbox",
      option: [
        { id: "Active", value: "Active" },
        { id: "InActive", value: "InActive" },
      ],
    },
    { name: "Plan Description", type: "textarea" },
  ],
  apiData: [
    { name: "SubscriptionType", type: "selectbox" },
    { name: "ApplicableTo", type: "selectbox" },
    { name: "Duration", type: "selectbox" },
    { name: "Price", type: "textbox" },
    { name: "StartDate", type: "textbox" },
    { name: "EndDate", type: "textbox" },
    { name: "Status", type: "selectbox" },
    { name: "PlanDescription", type: "textbox" },
  ],
  addon: [],
  api: {
    create: "",
    edit: "",
    delete: "",
  },
};
const Data = {
  Header: "Price & Subscription Plan",
  name: "Price & Subscription Plan",
  nameKey: "SubscriptionType",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Subscription Type", field: "SubscriptionType" },
      { label: "Plan Description", field: "PlanDescription" },
      { label: "Applicable To", field: "ApplicableTo" },
      { label: "Duration", field: "duration" },
      { label: "Price", field: "price" },
      { label: "Start Date", field: "startDate" },
      { label: "End Date", field: "endDate" },
      { label: "Status", field: "status" },
      { label: "Actions", field: "actions" },
    ],
    rows: [
      {
        SubscriptionType: "RA Promote",
        PlanDescription: "Priority lead allocation",
        ApplicableTo: "RA Tasker",
        Duration: ["1 month", "6 Months", "12 Months"],
        Price: ["$4", "$15", "$30"],
        StartDate: ["2021-12-14", "2021-12-14", "2021-12-14"],
        EndDate: ["2021-12-14", "2021-12-14", "2021-12-14"],
        Status: ["Active", "Active", "Active"],
      },
    ],
  },
  filters: [
    { name: "Select by", option: ["This Week", "This Month", "This Year"] },
    { name: "From Date", type: "dateBox" },
    { name: "To Date", type: "dateBox" },
    { name: "Country", option: ["USA", "Russia", "India"] },
    { name: "Region", option: ["All Cities"] },
    { name: "Category", option: ["HairCut", "Saloon"] },
    { name: "Sub Category", option: ["Hair Color", "Hair Wash"] },
    { name: "Status", option: ["Accepted", "Rejected"] },
  ],
  create: create,
};
export default function PriceSubscriptionPlan() {
  useEffect(() => {
    let row = Data.List.rows;
    row.map((item, i) => {
      item["duration"] = item.Duration.map((item) => {
        return <div>{item}</div>;
      });
      item["price"] = item.Price.map((item) => {
        return <div>{item}</div>;
      });
      item["startDate"] = item.StartDate.map((item) => {
        return <div>{item}</div>;
      });
      item["endDate"] = item.EndDate.map((item) => {
        return <div>{item}</div>;
      });
      item["status"] = item.Status.map((item) => {
        return <div>{item}</div>;
      });
      item["actions"] = item.Duration.map((Item, i) => {
        return (
          <div style={{ marginBottom: "5px" }}>
            <ActionButtons
              data={create}
              key={i}
              nameKey={Data.nameKey}
              rowValues={{
                SubscriptionType: item.SubscriptionType,
                PlanDescription: item.PlanDescription,
                ApplicableTo: item.ApplicableTo,
                Duration: item.Duration[i],
                Price: item.Price[i],
                StartDate: item.StartDate[i],
                EndDate: item.EndDate[i],
                Status: item.Status[i],
              }}
            />
          </div>
        );
      });
    });
  });
  return <List data={Data} />;
}
