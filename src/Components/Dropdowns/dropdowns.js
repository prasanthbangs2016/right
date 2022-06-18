import { useDispatch } from "react-redux";
import { GetId } from "../../Redux/Reducers/dropdownValues";
import Multiselect from "multiselect-react-dropdown";
import API from "../../API/apiList";
import "./dropdowns.scss";
function State(props) {
  //console.log(props.options);
  return (
    <Generator
      data={{
        options: props.options,
        type: "stateId",
        url: API.State,
        id: "stateid",
        value: "statename",
        label: "Select State",
        DefaultValue: props.DefaultValue,
      }}
    />
  );
}
function County(props) {
  return (
    <Generator
      data={{
        options: props.options,
        type: "countyId",
        url: API.State,
        id: "countyid",
        value: "countyname",
        label: "Select County",
        DefaultValue: props.DefaultValue,
      }}
    />
  );
}
function City(props) {
  return (
    <Generator
      data={{
        options: props.options,
        type: "cityId",
        url: API.City,
        id: "cityid",
        value: "cityname",
        label: "Select Cities",
        Multi: "yes",
        DefaultValue: props.DefaultValue,
      }}
    />
  );
}
function MasterCategory() {
  return (
    <Generator
      data={{
        url: API.MasterCategory.get,
        id: "mastercategoryid",
        value: "mastercategoryname",
        label: "MasterCategory",
      }}
    />
  );
}
function Category() {
  return (
    <Generator
      data={{
        url: API.Category.get,
        id: "categoryid",
        value: "categoryname",
        label: "Category",
      }}
    />
  );
}
function SubCategory() {
  return (
    <Generator
      data={{
        url: "AdminSubcategories/GetAdminSubCategories",
        id: "subcategoryid",
        value: "subcategoryname",
        label: "Sub-Category",
      }}
    />
  );
}
function Generator(props) {
  var data = props.data;
  var Options = data.options;
  const dispatch = useDispatch();
  if (data.DefaultValue !== "") {
    var val = {
      type: data.type,
      id: data.Multi === "yes" ? data.DefaultValue.id : data.DefaultValue,
    };
    dispatch(GetId(val));
  }
  var getSelection = (event) => {
    var val = {
      type: data.type,
      id: event.target.value,
    };
    dispatch(GetId(val));
  };
  var Multival = (event) => {
    var multiID = event.map((item, i) => {
      return item.id;
    });
    var val = {
      type: data.type,
      id: multiID,
    };
    dispatch(GetId(val));
  };
  return (
    <div className="selectBox">
      <span className="sBox">
        <label>{data.label}</label>
        {data.Multi !== "yes" ? (
          <select
            className="sbox"
            onChange={getSelection}
            defaultValue={data.DefaultValue}
          >
            <option key={"selected"} value={"Selected"}>
              {data.label}
            </option>
            {Options !== false ? (
              Options.length !== undefined ? (
                Options.map((item, i) => {
                  return (
                    <option key={item[data.id]} value={item[data.id]}>
                      {item[data.value]}
                    </option>
                  );
                })
              ) : (
                <option key={"No Data"} value={"No Data"}>
                  No Data
                </option>
              )
            ) : (
              <option key={"loading"} value={"loading"}>
                Loading...
              </option>
            )}
            {/* {values !== false ? (
              values.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.value}
                  </option>
                );
              })
            ) : (
              <option value="loading">Loading...</option>
            )} */}
          </select>
        ) : (
          <Multiselect
            displayValue="name"
            showCheckbox
            selectedValues={data.DefaultValue !== "" ? [data.DefaultValue] : []}
            onSelect={Multival}
            //loading={values === false ? true : false}
            options={
              Options !== false
                ? Options.map((item) => {
                    return { name: item[data.value], id: item[data.id] };
                  })
                : [{ name: "Loading...", id: "Load" }]
            }
          />
          // <Multiselect
          //   displayValue="name"
          //   showCheckbox
          //   selectedValues={data.DefaultValue !== "" ? [data.DefaultValue] : []}
          //   onSelect={Multival}
          //   loading={values === false ? true : false}
          //   options={
          //     values !== false
          //       ? values.map((item) => {
          //           return { name: item.value, id: item.id };
          //         })
          //       : [{ name: "Loading...", id: "Load" }]
          //   }
          // />
        )}
      </span>
    </div>
  );
}

export { State, County, City, MasterCategory, Category, SubCategory };
