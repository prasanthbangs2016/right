import { useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import "./serviceslist.scss";
import { State, County, City } from "../../../Components/Dropdowns/dropdowns";
import { useSelector, useDispatch } from "react-redux";
import { Loaders } from "../../../Redux/Reducers/reducers";
import { GET, POST, AllApi } from "../../../API/api";
import store from "../../../Redux/store";
import APIS from "../../../API/apiList";
import Message from "../../../Components/TableTemplate/message";
import CommonModal from "../../../Components/commonmodal";
var API = [];
export default function ServicesList(props) {
  let maxradius = 25,
    minradius = 7;
  let RowData = props.value;
  let Stateid = RowData === undefined ? "" : RowData.stateid;
  let Countyid = RowData === undefined ? "" : RowData.countyid;
  let Citys =
    RowData === undefined ? "" : { name: RowData.cites, id: RowData.cityid };
  const dispatch = useDispatch();
  const reducers = useSelector((state) => state.reduceR);
  const [modal, setModal] = useState(false);
  let Load = reducers.loader.Loader;
  const [all, setAll] = useState(false);
  let filters = props.filter;
  const [api, setApi] = useState({ key: "created", api: API });
  function CheckingValue(value, event, type) {
    if (type === "mastercategoryname") {
      API.map((element, i) => {
        if (element.mastercategoryname === value) {
          element.checked = event;
          if (event === false) setAll(false);
          element.categoryLists.map((item) => {
            item.checked = event;
            item.subCategoryLists.map((item) => (item.checked = event));
            return "";
          });
        }
        return "";
      });
    } else if (type === "categoryLists") {
      API.map((element) => {
        var len = 0;
        element.categoryLists.map((item) => {
          if (item.categoryname === value) {
            item.checked = event;
            item.subCategoryLists.map((Item, i) => {
              Item.checked = event;
              console.log(Item.subcategoryname);
              return "";
            });
          }
          if (event === false) {
            element.checked = false;
            setAll(false);
          }
          if (item.checked === true) {
            len = len + 1;
            console.log(item.categoryname);
            if (len === element.categoryLists.length) {
              element.checked = true;
            }
          }
          return "";
        });
        return "";
      });
    } else if (type === "Subcategory") {
      API.map((element, i) => {
        var Len = 0;
        element.categoryLists.map((Item, j) => {
          var len = 0;
          Item.subCategoryLists.map((item, k) => {
            if (item.subcategoryname === value) {
              item.checked = event;
            }
            if (event === false) {
              element.categoryLists[j].checked = false;
              element.checked = false;
              setAll(false);
            }
            if (item.checked === true) {
              len = len + 1;
              if (len === Item.subCategoryLists.length) {
                element.categoryLists[j].checked = true;
              }
            }
            return "";
          });
          if (Item.checked === true) {
            Len = Len + 1;
            if (Len === element.categoryLists.length) {
              element.checked = true;
            }
          }
          return "";
        });
        return "";
      });
    }
    var len = 0;
    API.map((element) => {
      //console.log("Entered");
      //console.log(element.checked);
      if (element.checked === true) {
        len = len + 1;
        if (len === API.length) {
          console.log("All checked");
          setAll(true);
        }
      }
      return "";
    });
    setApi({ key: "updated", api: API });
  }
  function SelectAll(event) {
    API.map((element) => {
      element.checked = event;
      element.categoryLists.map((Item) => {
        Item.checked = event;
        Item.subCategoryLists.map((item) => {
          item.checked = event;
        });
      });
    });
  }
  const callback = (value, event, type) => CheckingValue(value, event, type);
  let Submitted = async () => {
    const data = store.getState().getDropDownValues;
    var SubCategoryList = [];
    API.map((item) => {
      item.categoryLists.map((Item) => {
        Item.subCategoryLists.map((ITEM) => {
          if (ITEM["checked"] === true) {
            return SubCategoryList.push(ITEM.subcategoryid);
          }
        });
      });
    });
    console.log(SubCategoryList);
    var Data = {
      stateid: data.stateId,
      cityid: data.cityId,
      countyid: data.countyId,
      subcategoryid: SubCategoryList,
      minradius: minradius,
      maxradius: maxradius,
    };
    console.log(Data);
    dispatch(Loaders({ Loader: true, Error: false }));
    await POST(APIS.LocationCategories.create, Data).then((response) => {
      console.log(response);
      dispatch(Loaders({ Loader: false, Error: false }));
      if (response.status === 200) {
        console.log("sucess");
        setModal(
          <CommonModal
            data={{
              heading: "",
              header: "",
              open: true,
              body: (
                <Message
                  data={{
                    content: "Service Location Created Succesfully",
                    title: "",
                  }}
                />
              ),
              size: "lg",
            }}
          />
        );
      }
      if (response.status === 500) {
        console.log("fail");
        setModal(
          <CommonModal
            data={{
              heading: "",
              header: "",
              open: true,
              body: (
                <Message
                  data={{ content: "Something went wrong", title: "" }}
                />
              ),
              size: "lg",
            }}
          />
        );
      }
    });
  };
  let [States, SetState] = useState([]);
  let [Countys, SetCounty] = useState([]);
  let [Cities, SetCitys] = useState([]);
  let StateID = useSelector((state) => state.getDropDownValues.stateId);
  let CountyID = useSelector((state) => state.getDropDownValues.countyId);
  let CityID = useSelector((state) => state.getDropDownValues.cityId);
  console.log(StateID, CountyID, CityID);
  useEffect(() => {
    dispatch(Loaders({ Loader: true, Error: false }));
    async function FetchData() {
      await AllApi([GET(APIS.BGCheck.get), GET(APIS.State)]).then(
        (response) => {
          //console.log(response);
          SetState(response[1]);
          API = response[0].map((item) => {
            item["checked"] = false;
            item.categoryLists.map((Item) => {
              Item["checked"] = false;
              Item.subCategoryLists.map((ITEM) => {
                ITEM["checked"] =
                  RowData !== undefined
                    ? ITEM.subcategoryname === RowData.subcategory
                      ? true
                      : false
                    : false;
              });
            });
            return item;
          });
          dispatch(Loaders({ Loader: false, Error: false }));
        }
      );
    }
    FetchData();
    return () => SetState([]);
  }, []);
  useEffect(() => {
    console.log("County");
    GET(APIS.counties.Getcountybasedonstate + StateID).then((r) => {
      SetCounty(r);
      console.log(r);
    });
    return () => SetCounty([]);
  }, [StateID]);
  useEffect(() => {
    GET(APIS.City.Getcitiesbasedoncounty + CountyID).then((r) => {
      SetCitys(r);
      console.log(r);
    });
    return () => SetCitys([]);
  }, [CountyID]);
  return (
    <div>
      {modal}
      {Load === false ? (
        <div className="serviceslist">
          {filters === true ? (
            <div className="filters">
              <State DefaultValue={Stateid} options={States} />
              <County DefaultValue={Countyid} options={Countys} />
              <City DefaultValue={Citys} options={Cities} />
            </div>
          ) : (
            <div></div>
          )}
          <div
            className="services"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label style={{ width: "100%" }}>Select Master Category</label>
            <div
              className="ServiceCollpasible"
              style={{ maxWidth: "100%", width: "-webkit-fill-available" }}
            >
              <div className="Collpasible">
                <span>
                  <input
                    type="checkbox"
                    checked={all}
                    onChange={(event) => {
                      SelectAll(event.target.checked);
                      setAll(event.target.checked);
                    }}
                  />
                  Select All
                </span>
              </div>
            </div>
            <div
              style={{
                maxWidth: "100%",
                width: "-webkit-fill-available",
                height: props.nosubmitButton !== "yes" ? "50vh" : "",
                overflowY: "scroll",
              }}
            >
              {API.map((item, i) => {
                let list = item.categoryLists.map((item, i) => {
                  let lists = item.subCategoryLists.map((item, i) => {
                    return (
                      <div className="" key={i}>
                        <input
                          type="checkbox"
                          onChange={(event) =>
                            CheckingValue(
                              item.subcategoryname,
                              event.target.checked,
                              "Subcategory"
                            )
                          }
                          checked={item.checked}
                        />
                        {item.subcategoryname}
                      </div>
                    );
                  });
                  return (
                    <span key={i}>
                      <ServiceCollpasible
                        state={
                          RowData === undefined
                            ? false
                            : item.categoryname === RowData.catecory
                            ? true
                            : false
                        }
                        defaultChecked={item.checked}
                        callback={callback}
                        key={item.categoryname + i}
                        name={item.categoryname}
                        list={lists}
                        menu={"Select Sub Category"}
                        class={"l"}
                        type={"categoryLists"}
                      />
                    </span>
                  );
                });
                return (
                  <ServiceCollpasible
                    state={
                      RowData === undefined
                        ? false
                        : item.mastercategoryname === RowData.mastercategory
                        ? true
                        : false
                    }
                    defaultChecked={item.checked}
                    callback={callback}
                    key={item.mastercategoryname + i}
                    name={item.mastercategoryname}
                    list={list}
                    menu={"Select Category"}
                    type={"mastercategoryname"}
                  />
                );
              })}
            </div>
          </div>
          {props.nosubmitButton === "yes" ? (
            ""
          ) : (
            <div className="ManageLocations">
              <span className="configure">
                <span className="Box">
                  <span className="box">
                    <label>Minimum Radius (in miles)</label>
                    <input
                      type="text"
                      className="box"
                      defaultValue={7}
                      onChange={(event) => {
                        minradius = event.target.value;
                      }}
                    />
                  </span>
                  <span className="box">
                    <label>Maximum Radius (in miles)</label>
                    <input
                      type="text"
                      className="box"
                      defaultValue={25}
                      onChange={(event) => {
                        maxradius = event.target.value;
                      }}
                    />
                  </span>
                </span>
              </span>
              <br />
              <div className="ModalButton">
                <center>
                  <input
                    type="submit"
                    className="button"
                    onClick={Submitted}
                    value={"SUBMIT"}
                    style={{
                      backgroundColor: "#4285f4",
                      padding: "5px 15px 5px 15px",
                    }}
                  />
                  <input
                    type="button"
                    className="button"
                    value="CANCEL"
                    onClick={() => props.callback(false)}
                    style={{
                      backgroundColor: "grey",
                      padding: "5px 15px 5px 15px",
                    }}
                  />
                </center>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
function ServiceCollpasible(props) {
  let name = props.name;
  let list = props.list;
  let Checked = props.defaultChecked;
  let state = props.state;
  const [collapse, setCollapse] = useState(state);
  return (
    <div
      className="ServiceCollpasible"
      style={{ maxWidth: "100%", width: "-webkit-fill-available" }}
    >
      <div className="Collpasible">
        <span>
          <input
            type="checkbox"
            checked={Checked}
            onChange={(event) =>
              props.callback(name, event.target.checked, props.type)
            }
          />
          {name}
        </span>
        <span
          onClick={() => setCollapse(!collapse)}
          aria-controls="data"
          aria-expanded={collapse}
        >
          {!collapse ? (
            <IoIosArrowForward size={20} />
          ) : (
            <IoIosArrowDown size={20} />
          )}
        </span>
      </div>
      <Collapse in={collapse}>
        <div className="collapse_items back">
          <div style={{ background: "#8080804d" }}>
            <strong style={{ width: "100%", marginLeft: "10px" }}>
              {props.menu}
            </strong>
            {/* <div style={{ width: "100%", marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={Checked}
                onChange={(event) =>
                  props.callback(name, event.target.checked, props.type)
                }
              />
              &nbsp;Select All
            </div> */}
          </div>
          <span className={props.class === "l" ? "item" : ""}>{list}</span>
        </div>
      </Collapse>
    </div>
  );
}
