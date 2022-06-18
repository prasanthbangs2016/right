import List from "../../../Components/TableTemplate/List";
import { useEffect } from "react";
import ToggleButton from "../../../Components/ToggleButton/toggleButton";
import { useDispatch, useSelector } from "react-redux";
import { GET, AllApi } from "../../../API/api";
import { Loaders, CurrentID } from "../../../Redux/Reducers/reducers";
import OptionGenerate from "../../../Components/optionsGenerate";
import API from "../../../API/apiList";
const create = {
  name: "Category",
  nameKey: "categoryname",
  fields: [
    {
      name: "Select Master Category",
      type: "selectbox",
      option: [],
    },
    { name: "Enter Category", type: "text" },
    { name: "", type: "bgcheck" },
    { name: "", type: "button" },
  ],
  apiData: [
    { name: "mastercategoryid", type: "selectbox" },
    { name: "categoryname", type: "textbox" },
    { name: "bgcheck", type: "bgcheck" },
    { name: "Status", type: "button" },
  ],
  addon: [{ name: "enabled", value: true }],
  api: {
    create: API.Category.create,
    edit: API.Category.edit,
    delete: API.Category.delete,
  },
};
const Data = {
  Header: "Service Categories",
  name: "Categories",
  nameKey: "categoryname",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Category", field: "categoryname" },
      { label: "Master Category", field: "masterCategory_fetched" },
      { label: "#Tasks", field: "task" },
      { label: "Task Within 90 Days", field: "TaskWithin" },
      { label: "BG Check", field: "b_bgcheck" },
      { label: "Status", field: "b_status" },
      { label: "Action", field: "action" },
    ],
    rows: [],
  },
  filters: [],
  create: create,
};
function Categories() {
  const dispatch = useDispatch();
  const reducers = useSelector((state) => state.reduceR);
  let Load = reducers.loader.Loader;
  useEffect(async () => {
    dispatch(CurrentID("categoryid"));
    dispatch(Loaders({ Loader: true, Error: false }));
    await AllApi([GET(API.Category.get), GET(API.MasterCategory.get)]).then(
      (response) => {
        Promise.resolve(
          OptionGenerate({
            data: {
              url: "nourl",
              id: "mastercategoryid",
              value: "mastercategoryname",
              options: response[1],
            },
          })
        ).then((resolve) => (create.fields[0].option = resolve));
        Data.List.rows = response[0];
        let row = Data.List.rows;
        row.map((item) => {
          let mastercategory = create.fields[0].option.find((Item) => {
            return Item.id === item.mastercategoryid;
          });
          if (mastercategory === undefined)
            mastercategory = { id: 777, value: "no master category" };
          item["masterCategory_fetched"] = mastercategory.value;
          item["task"] = "168";
          item["TaskWithin"] = "54";
          item["b_status"] = (
            <ToggleButton data={{ state: item.enabled, disabled: true }} />
          );
          item["b_bgcheck"] = (
            <ToggleButton data={{ state: item.enabled, disabled: true }} />
          );
          return "";
        });
        dispatch(Loaders({ Loader: false, Error: false }));
      }
    );
  }, []);
  return <div>{Load === false ? <List data={Data} /> : ""}</div>;
}
export default Categories;
