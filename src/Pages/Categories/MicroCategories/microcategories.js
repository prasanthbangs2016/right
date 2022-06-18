import List from "../../../Components/TableTemplate/List";
import { useEffect } from "react";
import ToggleButton from "../../../Components/ToggleButton/toggleButton";
import { useDispatch, useSelector } from "react-redux";
import { GET, AllApi } from "../../../API/api";
import { Loaders, CurrentID } from "../../../Redux/Reducers/reducers";
import OptionGenerate from "../../../Components/optionsGenerate";
import API from "../../../API/apiList";
const create = {
  name: "Micro Category",
  nameKey: "microcategoryname",
  fields: [
    {
      name: "Sub Category",
      type: "selectbox",
      option: [],
    },
    { name: "Microcategory Name", type: "text" },
    { name: "Price", type: "number" },
    {
      name: "Trending Service",
      type: "selectbox",
      option: [
        { id: "yes", value: "Yes" },
        { id: "no", value: "No" },
      ],
    },
    { name: "Offer Price Display", type: "file" },
    { name: "Best Deal Display", type: "file" },
    { name: "", type: "bgcheck" },
  ],
  addon: [{ name: "enabled", value: true }],
  apiData: [
    { name: "subcategoryid", type: "selectbox" },
    { name: "microcategoryname", type: "textbox" },
    { name: "baseprice", type: "number" },
    { name: "Trending Service", type: "text" },
    { name: "imgpath", type: "upload" },
    { name: "imgpaths", type: "upload" },
    { name: "bgcheck", type: "bgcheck" },
  ],
  api: {
    create: API.MicroCategories.create,
    edit: API.MicroCategories.edit,
    delete: API.MicroCategories.delete,
  },
};
const Data = {
  name: "Micro Categories",
  Header: "Service Micro Categories",
  nameKey: "microcategoryname",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Micro-Category", field: "microcategoryname" },
      { label: "Sub-Category", field: "subCategory_fetched" },
      { label: "Category", field: "category" },
      { label: "Master Category", field: "MasterCategory" },
      { label: "Price", field: "baseprice" },
      { label: "#Tasks", field: "Tasks" },
      { label: "$Rev", field: "rev" },
      { label: "1st Task (Date)", field: "firstdate" },
      { label: "Last Task(Date)", field: "LastTask" },
      { label: "#Rank", field: "rank" },
      { label: "BG Check", field: "b_bgcheck" },
      { label: "Action", field: "action" },
    ],
    rows: [],
  },
  filters: [],
  create: create,
};
function MicroCategories() {
  const dispatch = useDispatch();
  const reducers = useSelector((state) => state.reduceR);
  let Load = reducers.loader.Loader;
  useEffect(async () => {
    dispatch(CurrentID("microcategoryid"));
    dispatch(Loaders({ Loader: true, Error: false }));
    await AllApi([
      GET(API.MicroCategories.get),
      GET(API.SubCategories.get),
    ]).then((response) => {
      Promise.resolve(
        OptionGenerate({
          data: {
            url: "nourl",
            id: "subcategoryid",
            value: "subcategoryname",
            options: response[1],
          },
        })
      ).then((resolve) => (create.fields[0].option = resolve));
      Data.List.rows = response[0];
      let row = Data.List.rows;
      row.map((item) => {
        let subcategory = create.fields[0].option.find((Item) => {
          return Item.id === item.subcategoryid;
        });
        if (subcategory === undefined)
          subcategory = { id: 777, value: "no sub category" };
        item["subCategory_fetched"] = subcategory.value;
        item["imgpath"] = "Image";
        item["imgpaths"] = "Image";
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
export default MicroCategories;
