import "./OfferandDiscounts.scss";
import MultiDataModal from "../../Components/mutliDataModal";
const Data = [
  {
    masterCategory: "Salon for men",
    category: [
      { name: "Hairstyle" },
      { name: "Massage" },
      { name: "Clean Shave" },
      { name: "Beard Grooming" },
      { name: "Face Care" },
      { name: "Hair Color" },
    ],
    subcategory: [
      { name: "Haircut" },
      { name: "Head Massage" },
      { name: "Face Massage" },
    ],
  },
];
var data;
export default function SelectedCategories() {
  return (
    <div className="SelectedCategories">
      <div className="Table Head">
        <div>Master Categories</div>
        <div>Categories</div>
        <div>SubCategories</div>
      </div>
      <div>
        {Data.map((item, i) => {
          return (
            <div key={"Row" + i} className="Table Row">
              <div>{item.masterCategory}</div>
              <ColumnData header={"Categories"} data={item.category} />
              <ColumnData header={"SubCategories"} data={item.subcategory} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
function ColumnData(props) {
  var item = props.data;
  var header = props.header;
  var data = item.map((item) => item.name);
  return (
    <div>
      {item.length > 3 ? (
        <MultiDataModal
          name={[item[0].name + ", ", item[1].name + ", ", item[2].name + ", "]}
          data={{
            header: header,
            Data: data,
          }}
        />
      ) : (
        <>
          {item.map((Item, i) => {
            return <span key={Item.name}>{Item.name},&nbsp;</span>;
          })}
        </>
      )}
    </div>
  );
}
