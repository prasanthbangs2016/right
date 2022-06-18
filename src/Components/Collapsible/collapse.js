import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import "./collapse.scss";
function Collapser(props) {
  let Data = props.data;
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="collapser">
      <div
        onClick={() => setCollapse(!collapse)}
        aria-controls="data"
        aria-expanded={collapse}
        className="header"
      >
        {Data.items[0]}
        {!collapse ? (
          <IoIosArrowForward size={20} />
        ) : (
          <IoIosArrowDown size={20} />
        )}
      </div>
      <Collapse in={collapse}>
        <div className="collapse_items" id="data">
          {Data.items.map((item, i) => {
            return i != 0 ? (
              <span className="item" key={i}>
                <span>{item}</span>
              </span>
            ) : (
              ""
            );
          })}
        </div>
      </Collapse>
    </div>
  );
}
export default Collapser;
