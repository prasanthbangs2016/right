import { useEffect, useState } from "react";
import List from "../../../Components/TableTemplate/List";
import CommonModal from "../../../Components/commonmodal";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Loaders, CurrentID } from "../../../Redux/Reducers/reducers";
import { GET } from "../../../API/api";
import ServicesList from "./serviceslist";
import { Modal } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import API from "../../../API/apiList";
import "./serviceslist.scss";
const create = {
  name: "Service Location",
  nameKey: "State",
  fields: [
    {
      name: "Select State",
      disabled: "Edit",
      type: "selectbox",
      option: [
        { id: "Alabama", value: "Alabama" },
        { id: "Maine", value: "Maine" },
      ],
    },
    {
      name: "Select County",
      disabled: "Edit",
      type: "selectbox",
      option: [
        { id: "Autaunga", value: "Autaunga" },
        { id: "Oxford", value: "Oxford" },
      ],
    },
    {
      name: "Select City",
      type: "multiBox",
      option: [
        { id: "PortLand", value: "PortLand" },
        { id: "Texas", value: "Texas" },
        { id: "NewYork", value: "New York" },
      ],
    },
    {
      name: "Select Service Category",
      type: "multiBox",
      option: [
        { id: "Haircut", value: "Haircut" },
        { id: "Cut", value: "Cut" },
        { id: "Trim", value: "Trim" },
      ],
    },
    {
      name: "Minimum Radius (in miles)",
      type: "number",
    },
    {
      name: "Maximum Radius (in miles)",
      type: "number",
    },
  ],
  apiData: [
    {
      name: "State",
      type: "selectbox",
    },
    {
      name: "County",
      type: "selectbox",
    },
    {
      name: "City",
      type: "multiBox",
    },
    {
      name: "Category",
      type: "multiBox",
    },
    {
      name: "minRadius",
      type: "number",
    },
    {
      name: "maxRadius",
      type: "number",
    },
  ],
  api: {
    create: "",
    edit: "",
    delete: API.LocationCategories.delete,
  },
};
const Data = {
  Header: "Manage Locations",
  name: "Manage Locations",
  nameKey: "states",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "State", field: "states" },
      { label: "County", field: "countyname" },
      { label: "City", field: "cites" },
      { label: "Min-Max Radius(in miles)", field: "minmaxRadius" },
      { label: "Master Category", field: "mastercategory" },
      { label: "Category", field: "catecory" },
      { label: "Sub-Category", field: "subcategory" },
      { label: "Tasks Total", field: "TasksTotal" },
      { label: "Tasks w/i 90 Days", field: "Tasks" },
      { label: "Tasks this week", field: "Tasksthisweek" },
      { label: "Action", field: "action" },
      { label: "", field: "Edit" },
    ],
    rows: [],
  },
  filters: [
    { name: "Select by", option: ["This Week", "This Month", "This Year"] },
    { name: "From Date", type: "dateBox" },
    { name: "To Date", type: "dateBox" },
    { name: "State", option: ["USA", "Russia", "India"] },
    { name: "County", option: ["All Cities"] },
    { name: "City", option: ["New York", "New Jersey"] },
    { name: "Master Category", option: ["Hair Color", "Hair Wash"] },
  ],
  create: create,
  add: false,
};
export default function ManageLocations() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({ state: false, value: "" });
  dispatch(CurrentID("id"));
  const reducers = useSelector((state) => state.reduceR);
  let Load = reducers.loader.Loader;
  let callback = () => {
    setModal({ state: false, value: modal.value });
  };
  useEffect(() => {
    dispatch(Loaders({ Loader: true, Error: false }));
    async function FetchData() {
      await GET(API.LocationCategories.get).then((response) => {
        Data.List.rows = response;
        let row = Data.List.rows;
        row.map((item, i) => {
          item["minmaxRadius"] = item["minradius"] + "-" + item["maxradius"];
          item["TasksTotal"] = "625";
          item["Tasks"] = "156";
          item["Tasksthisweek"] = "15";
          item["Edit"] = (
            <FaEdit
              key={"edit" + i}
              color="black"
              size={18}
              style={{ marginRight: "10px" }}
              onClick={() => setModal({ state: true, value: item })}
            />
          );
          return "";
        });
        dispatch(Loaders({ Loader: false, Error: false }));
      });
    }
    FetchData();
    return () => setModal({ state: false, value: "" });
  }, []);
  return (
    <div className="ManageLocations">
      <Modal
        backdrop={"static"}
        show={modal.state}
        onHide={() => setModal({ state: false, value: "" })}
        size={"lg"}
      >
        <Modal.Header>
          Edit Service Location
          <span onClick={() => setModal({ state: false, value: modal.value })}>
            <GrClose />
          </span>
        </Modal.Header>
        <Modal.Body>
          <ServicesList filter={true} value={modal.value} callback={callback} />
        </Modal.Body>
      </Modal>
      <CommonModal
        data={{
          heading: (
            <input className="addNew" value={"Add New"} type={"button"} />
          ),
          header: "Add New Service Location",
          body: <ServicesList filter={true} />,
          size: "lg",
        }}
      />
      {Load === false ? (
        <List data={Data} actionED={{ edit: true, delete: false }} />
      ) : (
        ""
      )}
      <div className="configure">
        <h5>Configure Default Service Radius</h5>
        <span className="Box">
          <span className="box">
            <label>Minimum Radius (in miles)</label>
            <input type="text" className="box" />
          </span>
          <span className="box">
            <label>Maximum Radius (in miles)</label>
            <input type="text" className="box" />
          </span>
        </span>
        <input type="submit" className="button" value="Save" />
      </div>
    </div>
  );
}
