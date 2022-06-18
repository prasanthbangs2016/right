import { useEffect, useState } from "react";
import List from "../../Components/TableTemplate/List";
import CommonModal from "../../Components/commonmodal";
import LinkedServices from "./linkServices";
import SelectedCategories from "./selectCategories";
const create = {
  name: "Offer",
  nameKey: "Offer",
  fields: [
    {
      name: "Offer Name",
      type: "text",
    },
    {
      name: "Mode",
      type: "selectbox",
      option: [
        { id: "", value: "Coupon" },
        { id: "", value: "Voucher" },
        { id: "", value: "Referral Bonus" },
      ],
    },
    {
      name: "Offer type",
      type: "selectbox",
      option: [
        { id: "", value: "Flat" },
        { id: "", value: "Percentage" },
        { id: "", value: "Free Coins" },
      ],
    },
    { name: "Amount/Percentage/Coins", type: "text" },
    { name: "Start Date", type: "date" },
    { name: "End Date", type: "date" },
    { name: "Min. Purchase Amount", type: "text" },
    { name: "Max. Purchase Amount", type: "text" },
    { name: "Min. Quantity", type: "text" },
    {
      addon: "create",
      name: "Status",
      type: "selectbox",
      disabled: "Create",
      option: [{ id: "", value: "New" }],
    },
    {
      addon: "edit",
      name: "Status",
      type: "selectbox",
      option: [
        { id: "", value: "Active" },
        { id: "", value: "Deactivated" },
        { id: "", value: "Expired" },
      ],
    },
  ],
  apiData: [
    { name: "Offer", type: "selectbox" },
    { name: "mode", type: "selectbox" },
    { name: "Type", type: "selectbox" },
    { name: "amount", type: "textbox" },
    { name: "startDate", type: "textbox" },
    { name: "endDate", type: "textbox" },
    { name: "minpurchase", type: "textbox" },
    { name: "Maxpurchase", type: "textbox" },
    { name: "minQunatity", type: "textbox" },
    { name: "category", type: "selectbox" },
    { name: "Status", type: "selectbox" },
  ],
  api: {
    create: "",
    edit: "",
    delete: "",
  },
};
const Data = {
  Header: "Offers & Discounts",
  name: "Categories",
  nameKey: "categoryname",
  List: {
    columns: [
      { label: <input type="checkbox" />, field: "check" },
      { label: "S.No", field: "sno" },
      { label: "Offer Name", field: "Offer" },
      { label: "Mode", field: "mode" },
      { label: "Offer Type", field: "Type" },
      { label: "Amount/%", field: "amount" },
      { label: "Start Date", field: "startDate" },
      { label: "End Date", field: "endDate" },
      { label: "Min-Max Purchase Amount", field: "minmaxpurchase" },
      { label: "Min. Qunatity", field: "minQunatity" },
      { label: "Category", field: "Category" },
      { label: "Status", field: "Status" },
      { label: "Action", field: "action" },
    ],
    rows: [
      {
        Offer: "Diwali Offer",
        mode: "Coupon",
        Type: "Flat",
        amount: "10%",
        startDate: "07-01-2021",
        endDate: "07-04-2021",
        minpurchase: "$500",
        Maxpurchase: "$3000",
        minQunatity: "1",
        category: "null",
        Status: "New",
      },
      {
        Offer: "20% off",
        mode: "Vocher",
        Type: "Percentage",
        amount: "20%",
        startDate: "07-01-2021",
        endDate: "07-04-2021",
        minpurchase: "$500",
        Maxpurchase: "$3000",
        minQunatity: "1",
        category: "null",
        Status: "Active",
      },
    ],
  },
  filters: [],
  create: create,
};
export default function OfferDiscount() {
  const [Button, setButton] = useState(false);
  useEffect(() => {
    Data.List.rows.map((item, i) => {
      item["check"] = (
        <input type="checkbox" key={i} onClick={() => setButton(true)} />
      );
      item["minmaxpurchase"] = (
        <span>
          {item["minpurchase"]} - {item["Maxpurchase"]}
        </span>
      );
      item["status"] !== "New"
        ? (item["Category"] = (
            <CommonModal
              data={{
                header: "Diwali Offer - Selected Categories",
                body: <SelectedCategories />,
                heading: <span className="ModalCell">View</span>,
                size: "lg",
              }}
            />
          ))
        : (item["Category"] = "null");
    });
  }, []);
  return (
    <div>
      {Button == true ? (
        <CommonModal
          data={{
            size: "lg",
            header: 'Link "Offers & Discounts" to Services',
            body: <LinkedServices />,
            heading: (
              <input
                value="Link Services"
                type="button"
                style={{
                  padding: "5px 10px",
                  background: "orange",
                  color: "white",
                  borderRadius: "10px",
                  border: "none",
                }}
              />
            ),
          }}
        />
      ) : (
        ""
      )}
      <List data={Data} />
    </div>
  );
}
