import List from "../../Components/TableTemplate/List";
const create = {
  name: "RA Requesters",
  nameKey: "FirstName",
  fields: [
    { name: "First Name", type: "text" },
    { name: "Last Name", type: "text" },
    { name: "Email", type: "email" },
    { name: "Phone Number", type: "PhoneNumber" },
    {
      name: "City",
      type: "selectbox",
      option: [
        { id: "Shargon", value: "Shargon" },
        { id: "New York", value: "New York" },
      ],
    },
    { name: "Number of Requests", type: "number", disabled: "Edit" },
    {
      name: "Status",
      type: "selectbox",
      option: [
        { id: "active", value: "Active" },
        { id: "Inactive", value: "Inactive" },
      ],
    },
  ],
  apiData: [
    { name: "FirstName", type: "text" },
    { name: "LastName", type: "text" },
    { name: "email", type: "email" },
    { name: "PhoneNumber", type: "PhoneNumber" },
    { name: "city", type: "selectBox", option: [] },
    { name: "NumberofRequests", type: "number" },
    { name: "status", type: "selectBox" },
  ],
  addon: [{ name: "enabled", value: true }],
  api: {
    create: "",
    edit: "",
    delete: "",
  },
};
const Data = {
  Header: "RA Requesters",
  name: "RA Requesters",
  nameKey: "FirstName",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "First Name", field: "FirstName" },
      { label: "Last Name", field: "LastName" },
      { label: "Email", field: "email" },
      { label: "Phone Number", field: "PhoneNumber" },
      { label: "City", field: "city" },
      { label: "Number of Requests", field: "NumberofRequests" },
      { label: "RA Plus Membership", field: "Membership" },
      { label: "Status", field: "status" },
      { label: "Action", field: "action" },
    ],
    rows: [
      {
        FirstName: "Erika",
        LastName: "Alexander",
        email: "ErikaAlexander@gmail.com",
        PhoneNumber: "2674567789",
        city: "Shargon",
        NumberofRequests: "2",
        Membership: "YES",
        status: "Active",
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
    { name: "Country", option: ["USA", "Russia", "India"] },
    { name: "Region", option: ["All Cities"] },
    { name: "Master Category", option: ["Salon for Men"] },
    { name: "Category", option: ["HairCut", "Saloon"] },
    { name: "Subcategory", option: ["Hair Color", "Hair Wash"] },
  ],
  create: create,
  add: false,
};
export default function RAServiceRequesters() {
  return <List data={Data} />;
}
