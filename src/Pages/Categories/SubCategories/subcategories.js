import List from "../../../Components/TableTemplate/List";
import { useEffect } from "react";
import ToggleButton from "../../../Components/ToggleButton/toggleButton";
import { useDispatch, useSelector } from "react-redux";
import { GET, AllApi } from "../../../API/api";
import { Loaders, CurrentID } from "../../../Redux/Reducers/reducers";
import OptionGenerate from "../../../Components/optionsGenerate";
import API from "../../../API/apiList";
const create = {
  name: "Sub Category",
  nameKey: "subcategoryname",
  fields: [
    {
      name: "Select Master Category",
      type: "selectbox",
      option: [],
    },
    {
      name: "Select Category",
      type: "selectbox",
      option: [],
    },
    { name: "Enter Sub Category", type: "text" },
    { name: "", type: "bgcheck" },
    { name: "", type: "button" },
  ],
  addon: [{ name: "enabled", value: true }],
  apiData: [
    { name: "masterCategory", type: "selectbox" },
    { name: "categoryid", type: "selectbox" },
    { name: "subcategoryname", type: "textbox" },
    { name: "bgcheck", type: "bgcheck" },
    { name: "Status", type: "button" },
  ],
  api: {
    create: API.SubCategories.create,
    edit: API.SubCategories.edit,
    delete: API.SubCategories.delete,
  },
};
const Data = {
  Header: "Service Sub Categories",
  name: "Sub Categories",
  nameKey: "subcategoryname",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Sub-Category", field: "subcategoryname" },
      { label: "Category", field: "Category_fetched" },
      { label: "Master Category", field: "masterCategory" },
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
function SubCategories() {
  const dispatch = useDispatch();
  const reducers = useSelector((state) => state.reduceR);
  let Load = reducers.loader.Loader;
  useEffect(async () => {
    dispatch(CurrentID("subcategoryid"));
    dispatch(Loaders({ Loader: true, Error: false }));
    await AllApi([
      GET(API.SubCategories.get),
      GET(API.MasterCategory.get),
      GET(API.Category.get),
    ]).then((response) => {
      Promise.all([
        OptionGenerate({
          data: {
            url: "nourl",
            id: "mastercategoryid",
            value: "mastercategoryname",
            options: response[1],
          },
        }),
        OptionGenerate({
          data: {
            url: "nourl",
            id: "categoryid",
            value: "categoryname",
            options: response[2],
          },
        }),
      ]).then((resolve) => {
        create.fields[0].option = resolve[0];
        create.fields[1].option = resolve[1];
      });
      Data.List.rows = response[0];
      let row = Data.List.rows;
      row.map((item) => {
        let category = create.fields[1].option.find((Item) => {
          return Item.id === item.categoryid;
        });
        if (category === undefined)
          category = { id: 777, value: "no category" };
        item["Category_fetched"] = category.value;
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
    });
  }, []);
  return <div>{Load === false ? <List data={Data} /> : ""}</div>;
}
export default SubCategories;
