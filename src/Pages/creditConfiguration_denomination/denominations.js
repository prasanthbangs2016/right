import List from "../../Components/TableTemplate/List";
import Ratings from "../../Components/Ratings/ratings";
const create = {
  name: "Denomination",
  nameKey: "Denomination",
  fields: [
    { name: "Denomination", type: "text" },
    {
      name: "Status",
      type: "selectbox",
      option: [
        { id: "active", value: "Active" },
        { id: "inactive", value: "InActive" },
      ],
    },
  ],
  apiData: [
    { name: "Denomination", type: "textbox" },
    { name: "b_status", type: "selectbox" },
  ],
  addon: [{ name: "enabled", value: true }],
  api: {
    create: "",
    edit: "",
    delete: "",
  },
};
const Data = {
  Header: "Credit Configuration and Denomination",
  name: "Denominations",
  nameKey: "Denomination",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Denomination", field: "Denomination" },
      { label: "Status", field: "b_status" },
      { label: "Actions", field: "action" },
    ],
    rows: [
      {
        Denomination: "$50",
        b_status: "Active",
      },
    ],
  },
  filters: [],
  create: create,
};
export default function Denominations() {
  return (
    <div>
      <List data={Data} />
      {/* <Ratings
        data={{
          ratings: [
            { type: "Communication", rating: 4 },
            { type: "Quality of Service", rating: 4.5 },
            { type: "Speed of Service", rating: 3 },
            { type: "Behaviour", rating: 4 },
            { type: "Overall Experience", rating: 4 },
          ],
          type: "tasker",
          color: "red",
          name: { image: "user", name: "Manny Pena", profession: "CEO" },
        }}
      />
      <Ratings
        data={{
          ratings: [
            { type: "Ease to locate Customer Address", rating: 4 },
            { type: "Communication", rating: 4.5 },
            { type: "Behaviour", rating: 3 },
            { type: "Overall Customer Service Experience", rating: 4 },
          ],
          type: "customer",
          color: "green",
          name: { image: "", name: "Manny Pena", profession: "" },
        }}
      /> */}
    </div>
  );
}
