import List from "../../../Components/TableTemplate/List";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToggleButton from "../../../Components/ToggleButton/toggleButton";
import { GET, UrlImage } from "../../../API/api";
import { Loaders, CurrentID } from "../../../Redux/Reducers/reducers";
import MultiDataModal from "../../../Components/mutliDataModal";
import API from "../../../API/apiList";
const create = {
  name: "Master Category",
  nameKey: "mastercategoryname",
  fields: [
    { name: "Enter Master Category Name", type: "text" },
    { name: "Master Category Icon", type: "file" },
    { name: "", type: "bgcheck" },
  ],
  apiData: [
    { name: "mastercategoryname", type: "textbox" },
    { name: "imgpath", type: "upload" },
    { name: "bgcheck", type: "bgcheck" },
  ],
  addon: [{ name: "enabled", value: true }],
  api: {
    create: API.MasterCategory.create,
    edit: API.MasterCategory.edit,
    delete: API.MasterCategory.delete,
  },
};
const Data = {
  Header: "Service Master Categories",
  name: "Master Categories",
  nameKey: "mastercategoryname",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Master Category Icon", field: "b_imgpath" },
      { label: "Master Category", field: "mastercategoryname" },
      { label: "Categories", field: "categoriesList" },
      {
        label: "Desired Admin Hourly Rate",
        field: "DesiredAdminHourlyRate",
      },
      { label: "#Tasks", field: "task" },
      { label: "$Rev", field: "rev" },
      { label: "1st Task (Date)", field: "1stTask" },
      { label: "Last Task", field: "lastTask" },
      { label: "#Rank", field: "rank" },
      { label: "BG Check", field: "b_bgcheck" },
      //{ label: "Status", field: "b_status" },
      { label: "Action", field: "action" },
    ],
    rows: [],
  },
  filters: [],
  create: create,
};
export default function MasterCategories() {
  const dispatch = useDispatch();
  const reducers = useSelector((state) => state.reduceR);
  let Load = reducers.loader.Loader;
  useEffect(() => {
    dispatch(CurrentID("mastercategoryid"));
    dispatch(Loaders({ Loader: true, Error: false }));
    async function FetchData() {
      await GET(API.MasterCategory.getNested).then((response) => {
        Data.List.rows = response;
        let row = Data.List.rows;
        row.map((item, i) => {
          item["b_imgpath"] = UrlImage(item.imgpath);
          item["b_status"] = (
            <ToggleButton data={{ state: item.enabled, disabled: true }} />
          );
          item["b_bgcheck"] = (
            <ToggleButton data={{ state: item.enabled, disabled: true }} />
          );
          item["DesiredAdminHourlyRate"] = "$22";
          item["task"] = "168";
          item["rev"] = "$1628";
          item["1stTask"] = "2-17-2021";
          item["lastTask"] = "7-12-2021";
          item["rank"] = "$1628";

          var categoriesList = item.adminCategories.map((item) => {
            return item.categoryname;
          });
          if (categoriesList.length === 0) {
            item["categoriesList"] = "No Categories";
          } else {
            item["categoriesList"] =
              categoriesList.length > 3 ? (
                <MultiDataModal
                  key={i}
                  name={
                    item.adminCategories[0].categoryname +
                    ", " +
                    item.adminCategories[1].categoryname +
                    ", " +
                    item.adminCategories[2].categoryname
                  }
                  data={{
                    Data: categoriesList,
                    header: "Categories",
                  }}
                />
              ) : (
                item.adminCategories.map((item) => {
                  return item.categoryname + ", ";
                })
              );
          }
          return "";
        });
        dispatch(Loaders({ Loader: false, Error: false }));
      });
    }
    FetchData();
  }, []);
  return <div>{Load === false ? <List data={Data} /> : ""}</div>;
}
